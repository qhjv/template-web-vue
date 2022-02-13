/* eslint-disable */
import axios from "axios";

import BaseService from "./base.service";

class ProductService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  browseProductByName(term, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/product/product/search?term=${term}`;

    let data = JSON.stringify({ term });
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      data,
      cancelToken,
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

export default ProductService;
