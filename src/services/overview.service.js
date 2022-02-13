import http from "../utils/http";

const overviewService = {
  getTopProduct: async (params) => {
    return await http.get("/dashboard/top-product", { params });
  },

  getTopArea: async (params) => {
    return await http.get("/dashboard/top-area", { params });
  },

  getReturnPackage: async (params) => {
    return await http.get("/dashboard/return-package", { params });
  },
};

export default overviewService;
