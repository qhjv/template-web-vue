import http from "../utils/http";

const wareHouseService = {
  getTopProduct: async () => {
    return await http.get("/product/products/statistic");
  },
};

export default wareHouseService;
