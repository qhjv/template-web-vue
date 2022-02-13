/* eslint-disable */
import BaseService from "./base.service";
import axios from "axios";

class ThunderService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  /**
   * Gửi yêu cầu hủy.
   * @returns promise - Hủy đơn hàng.
   * */
  browseCancelOrder(orderId) {
    let url_ = this.baseUrl + `/api/v1/package/cancel/${orderId}`;
    let data = JSON.stringify({});
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

export default ThunderService;
