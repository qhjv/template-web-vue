import overviewService from "@/services/overview.service";
import moment from "moment";

const orderModule = {
  namespaced: true,
  state: {
    topProducts: {
      top_selling: [],
      return_rate: [],
    },
    topAreas: {
      top_selling: [],
      return_rate: [],
    },
    query: {
      range: "7_day_before",
      type: "top_selling",
    },
    from: moment().subtract(7, "day").startOf("day"),
    to: moment().endOf("day"),
    returnPackageData: {
      current: {
        total_packages: 0,
        return_rate: 0,
      },
      past: {
        total_packages: 0,
        return_rate: 0,
      },
      change: {
        return_rate: "",
        total_packages: "",
      },
    },
  },
  getters: {
    getDataForPieChart: (state) => {
      const total_packages = state.returnPackageData.current.total_packages;
      const packageData = state.returnPackageData.current;
      if (total_packages && packageData) {
        const shop_cancel = packageData.shop_cancel
          ? (
              (packageData.shop_cancel.count_packages / total_packages) *
              100
            ).toFixed(1)
          : 0;
        const cannot_contact = packageData.cannot_contact
          ? (
              (packageData.cannot_contact.count_packages / total_packages) *
              100
            ).toFixed(1)
          : 0;
        const other_reasons = packageData.other_reasons
          ? (
              (packageData.other_reasons.count_packages / total_packages) *
              100
            ).toFixed(1)
          : 1;
        const data = [
          Number(shop_cancel),
          Number(cannot_contact),
          Number(
            (
              100 -
              Number(shop_cancel) -
              Number(cannot_contact) -
              Number(other_reasons)
            ).toFixed(1)
          ),
          Number(other_reasons),
        ];
        return data;
      }
      return [0, 0, 0, 1];
    },
    getCustomerRejectData: (state) => (type) => {
      const packageData = state.returnPackageData[type];
      let rejectData = {};
      const defaultData = {
        count_packages: 0,
        count_products: 0,
        total_COD: 0,
      };
      if (packageData.customer_reject !== undefined) {
        rejectData.incorrect_product = packageData.customer_reject
          .incorrect_product
          ? packageData.customer_reject.incorrect_product
          : defaultData;
        rejectData.not_view_or_try = packageData.customer_reject.not_view_or_try
          ? packageData.customer_reject.not_view_or_try
          : defaultData;
        rejectData.miss_product = packageData.customer_reject.miss_product
          ? packageData.customer_reject.miss_product
          : defaultData;
        rejectData.break_product = packageData.customer_reject.break_product
          ? packageData.customer_reject.break_product
          : defaultData;
        rejectData.other_reasons = packageData.customer_reject.other_reasons
          ? packageData.customer_reject.other_reasons
          : defaultData;
        return rejectData;
      } else {
        rejectData.incorrect_product = defaultData;
        rejectData.not_view_or_try = defaultData;
        rejectData.miss_product = defaultData;
        rejectData.break_product = defaultData;
        rejectData.other_reasons = defaultData;
      }
      return rejectData;
    },
  },
  mutations: {
    setTopProduct(state, payload) {
      state.topProducts = payload;
    },
    setTopArea(state, payload) {
      state.topAreas = payload;
    },
    setReturnPackageData(state, payload) {
      state.returnPackageData = payload;
    },
    setQuery(state, { range = "", type = "" }) {
      if (range) {
        state.query.range = range;
      }
      if (type) {
        state.query.type = type;
      }
    },
    setDateTimeFilter(state, { from = "", to = "" }) {
      if (from) {
        state.from = from;
      }
      if (to) {
        state.to = to;
      }
    },
  },
  actions: {
    async getTopProduct({ state, commit }, payload) {
      try {
        const query = payload || state.query;
        const response = await overviewService.getTopProduct(query);
        if (response.data.success) {
          // console.log(response.data.data);
          let transformData = response.data.data;
          for (let key in transformData) {
            transformData[key].map((item) => {
              for (let key in item) {
                if (
                  key === "female" ||
                  key === "bad_report_public" ||
                  key === "good_report" ||
                  key === "is_blue" ||
                  key === "is_purple" ||
                  key === "male" ||
                  key === "total" ||
                  key === "total_return" ||
                  key === "total_success"
                ) {
                  let arr = Number(item[key]);
                  item[key] = arr;
                }
              }
            });
          }
          commit("setTopProduct", transformData);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getTopArea({ state, commit }, payload) {
      try {
        const query = payload || state.query;
        const response = await overviewService.getTopArea(query);
        if (response.data.success) {
          let transformData = response.data.data;
          for (let key in transformData) {
            transformData[key].map((item) => {
              for (let key in item) {
                if (
                  key === "female" ||
                  key === "bad_report_public" ||
                  key === "good_report" ||
                  key === "is_blue" ||
                  key === "is_purple" ||
                  key === "male" ||
                  key === "total" ||
                  key === "total_return" ||
                  key === "total_success"
                ) {
                  let arr = Number(item[key]);
                  item[key] = arr;
                }
              }
            });
          }
          commit("setTopArea", response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async getReturnPackageData({ state, commit }, payload) {
      try {
        const query = payload || state.query;
        const response = await overviewService.getReturnPackage(query);
        if (response.data.success) {
          commit("setReturnPackageData", response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default orderModule;
