/* eslint-disable */
import axios from "axios";
import BaseService from "./base.service";

class MyShopService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  /**
   * Lấy danh sách ca giao tính từ thời điểm hiện tại call API.
   * */
  browseGetRouter(data) {
    let url_ = this.baseUrl + `/api/v1/services/gmap/route`;

    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      data,
    };

    return this.instance
      .request(options)
      .catch((_error) => {
        return _error;
      })
      .then((_response) => {
        return _response.data;
      });
  }
}

export default MyShopService;
