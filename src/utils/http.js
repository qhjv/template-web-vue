import axios from "axios";
import { BASE_URL } from "@/contants";

const axiosApiInstance = axios.create({
  baseURL: BASE_URL + "/api/v1",
});

axiosApiInstance.defaults.timeout = 60000;

axiosApiInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      authorization: `Bearer ${localStorage.getItem("token_ecom")}`,
      "Content-Type": "application/json",
      "Shop-Code": localStorage.getItem("shop_code") || "",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosApiInstance;
