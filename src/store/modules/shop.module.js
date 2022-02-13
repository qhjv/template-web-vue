// Chứa các state của shop.

import common from "@/utils/common";
import services from "@/services";
import { isEmptyObject } from "@/utils";

const shopModule = {
  namespaced: true,
  state: {
    Shop: {},
    PickAddress: {},
    ListPickAddress: [],
    Config: {},
    ShopsService: {},
    ShopStaff: {},
    VAT: {},
    ShopNote: [],
    IdentityCard: {},
    RegistrationLicense: {},
    loadingFullInfo: false,
    allPickAddressList: [],
    allStaffList: [],
    returnPackageConfig: {},
  },
  mutations: {
    setFullInfoShop(state, payload) {
      state.Shop = payload.Shop;
      state.PickAddress = payload.PickAddress;
      state.Config = payload.Config;
      state.ShopsService = payload.ShopsService;
      state.ShopStaff = payload.ShopStaff;
      state.VAT = payload.VAT;
      state.ShopNote = payload.ShopNote;
      state.IdentityCard = payload.IdentityCard;
      state.RegistrationLicense = payload.RegistrationLicense;

      let converted = common.convertLabelValueDataSource({
        dataSource: payload.PickAddress,
        labelName: "fullname",
        valueName: "id",
        labelConvert: (item) => {
          let result = "";
          if (item.first_address) {
            result += item.first_address;
          }
          if (item.hamlet || item.street) {
            result += `,${item.street || item.hamlet}`;
          }
          if (item.ward) {
            result += `,${item.ward}`;
          }
          if (item.district) {
            result += `,${item.district}`;
          }
          if (item.province) {
            result += `,${item.province}`;
          }
          return result;
        },
      });
      state.ListPickAddress = converted;
    },
    setLoadingFullInfo(state, payload) {
      state.loadingFullInfo = payload;
    },
    updateBasicShopInfo(state, payload) {
      state.Shop = {
        ...state.Shop,
        ...payload,
      };
    },
    setFullStaffList(state, payload) {
      state.allStaffList = payload;
    },
    setCheckReceiveSms(state, payload) {
      state.Shop.receive_sms_cod = payload;
    },
    setCheckSubcribeReport(state, payload) {
      state.Shop.subcribe_report = payload;
    },

    setFullPickAddressList(state, payload) {
      state.allPickAddressList = payload;
    },

    removePickAddress(state, pickAddressId) {
      state.allPickAddressList = state.allPickAddressList.filter(
        (item) => item.value !== pickAddressId
      );
    },
    addPickAddress(state, payload) {
      state.allPickAddressList = [...state.allPickAddressList, payload];
    },
    updateVatShopInfo(state, payload) {
      state.VAT = {
        ...state.VAT,
        ...payload,
      };
    },
    updateConfigShopInfo(state, payload) {
      state.Config = {
        ...state.Config,
        ...payload,
      };
    },
    setReturnPackageConfig(state, config) {
      state.returnPackageConfig = config;
    },
  },
  actions: {
    async getFullInfoShop({ commit }) {
      let res = await services.$shop.browseInfoShop();
      if (res && res.success) {
        console.log(res.data);
        const data = res.data;
        // Update Shop_code and Shop_type
        localStorage.setItem("shop_code", data.Shop?.code);
        localStorage.setItem("shop_token", data.Shop?.token);
        localStorage.setItem("shop_type", data.Shop?.shop_type);
      }
      commit("setFullInfoShop", res.data);
    },

    async getShopConfig({ commit }) {
      try {
        const response = await services.$shop.getShopConfig();
        if (response.success) {
          this.return_package = response.data.policy.return_package;
          commit("setReturnPackageConfig", response.data.policy.return_package);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  getters: {
    role: (state) => state.ShopStaff.role,
    notDeliverOptionTag: (state) => {
      if (isEmptyObject(state.returnPackageConfig)) {
        return 0;
      }
      if (state.returnPackageConfig.not_receive_return_package) {
        return 16;
      }
      if (state.returnPackageConfig.not_auto_store_return_immediately) {
        return 15;
      }
      if (state.returnPackageConfig.auto_store_package.is_selected) {
        return 14;
      }
      return 0;
    },
  },
};

export default shopModule;
