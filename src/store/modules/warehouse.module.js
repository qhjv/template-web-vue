import warehouseService from "@/services/warehouse.service";
import { message } from "ant-design-vue";
const warehouseModule = {
  namespaced: true,
  state: {
    total: 0,
    productCategories: [],
    productList: {
      products: [],
      paging: {
        total: 1,
      },
    },
    topProductList: [],
    productCharacteristics: [],
  },
  getters: {},
  mutations: {
    setProduct(state, data) {
      state.productList.products = data.products;
      state.productList.paging = data.paging;
    },
    setProductCategories(state, productCategories) {
      state.productCategories = productCategories;
    },
    setProductCharacteristics(state, characteristics) {
      state.productCharacteristics = characteristics;
    },
    addProductCharacteristic(state, characteristic) {
      state.productCharacteristics.push(characteristic);
    },
    updateProductCharacteristic(state, characteristic) {
      // set lại giá trị cho cái biến ở dưới
      // state.productCharacteristics =
      console.log(characteristic);
    },
    deleteProductCharacteristic(state, data) {
      state.productCharacteristics = state.productCharacteristics.filter(
        (pro) => {
          return pro.id !== data.id;
        }
      );
    },
    setTopProduct(state, products) {
      state.topProductList = products;
    },
  },
  actions: {
    async getProduct({ commit }, payload) {
      try {
        let result = await warehouseService.getProduct(payload);
        let products = result?.data?.data.products || [];
        let paging = result?.data?.data.paging || {};
        if (products) {
          commit("setProduct", { paging, products });
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getProductCategories({ commit }) {
      try {
        let result = await warehouseService.getProductCategories();
        let categories = result?.data?.data || [];
        if (categories) {
          commit("setProductCategories", categories);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getProductCharacteristics({ commit }) {
      try {
        let result = await warehouseService.getProductCharacteristic();
        let characteristics = result?.data?.data || [];
        if (result.data.success) {
          commit("setProductCharacteristics", characteristics);
        } else {
          message.error(
            result?.data.message || "Đã có lỗi xảy ra, vui lòng thử lại "
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async updateProductCharacteristics({ commit }, payload) {
      try {
        let result = await warehouseService.updateProductCharacteristic(
          payload
        );
        if (result.data.success) {
          commit("updateProductCharacteristic", payload);
          message.success(result?.data.message || "Sửa thành công ");
        } else {
          message.error(
            result?.data.message || "Đã có lỗi xảy ra, vui lòng thử lại "
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addProductCharacteristics({ commit }, payload) {
      try {
        let result = await warehouseService.addProductCharacteristic(payload);
        let characteristics = result?.data?.data || [];
        if (result.data.success) {
          commit("addProductCharacteristic", characteristics);
          message.success(result?.data.message || "Thêm thành công ");
        } else {
          message.error(
            result?.data.message || "Đã có lỗi xảy ra, vui lòng thử lại "
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async deleteProductCharacteristics({ commit }, payload) {
      try {
        let result = await warehouseService.deleteProductCharacteristic(
          payload
        );
        if (result.data.success) {
          commit("deleteProductCharacteristic", payload);
          message.success(result?.data.message || "Xóa thành công ");
        } else {
          message.error(
            result?.data.message || "Đã có lỗi xảy ra, vui lòng thử lại "
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getTopProduct({ commit }, payload) {
      try {
        let result = await warehouseService.getTopProduct(payload);
        let products = result?.data?.data || [];
        if (products) {
          commit("setTopProduct", products);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default warehouseModule;
