import { formatDateTimeRequest } from "@/utils/date";
import http from "../utils/http";

const wareHouseService = {
  getProduct: async (params) => {
    params = {
      ...params,
      page: params.page - 1,
    };
    if (params.from_date && params.to_date) {
      params = {
        ...params,
        from_date: params.from_date.format("X"),
        to_date: params.to_date.format("X"),
      };
    }
    return await http.get("/product/products/statistic", { params });
  },
  getProductCategories: async () => {
    return await http.get("/product/products/categories");
  },
  getProductCharacteristic: async () => {
    return await http.get("/product/characteristics/list");
  },
  addProductCharacteristic: async (params) => {
    return await http.post("/product/characteristics/add", params);
  },
  updateProductCharacteristic: async (params) => {
    return await http.post(
      `/product/characteristics/update/${params.id}`,
      params
    );
  },
  deleteProductCharacteristic: async (params) => {
    return await http.post(
      `/product/characteristics/delete/${params.id}`,
      params
    );
  },
  deleteProduct: async (id) => {
    return await http.post(`/product/products/delete/${id}`);
  },
  uploadImageCs: async (params) => {
    return await http.post("/service/images/upload-gs", { params });
  },
  async getDashboard(params = {}) {
    const response = await http.get(`/product/dashboard`, { params });
    return response;
  },
  async getMetricExportHistory(params = {}) {
    const _params = {
      type: "summary",
      sub_type: "picked",
      from_date: params.from_date
        ? formatDateTimeRequest(params.from_date, true)
        : formatDateTimeRequest(new Date("1970-01-01").getTime(), true),
      to_date: params.to_date
        ? formatDateTimeRequest(params.to_date, true)
        : formatDateTimeRequest(new Date().getTime(), true),
    };

    const response = await http.get(`/package/session-export-package`, {
      params: _params,
    });

    return response;
  },
  getTopProduct: async (params) => {
    return await http.get("/product/products/statistic", { params });
  },
};

export default wareHouseService;
