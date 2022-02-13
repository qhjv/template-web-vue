import topWarehouseService from "@/services/topWarehouse.service";

const topWareHouseModule = {
  namespaced: true,
  state: {
    topProductList: [],
  },
  getters: {},
  mutations: {
    setTopProduct(state, products) {
      state.topProductList = products;
    },
  },
  actions: {
    async getTopProduct({ commit }) {
      try {
        let result = await topWarehouseService.getTopProduct();
        let products = result?.data?.data.products || [];
        if (products) {
          commit("setTopProduct", products);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default topWareHouseModule;
