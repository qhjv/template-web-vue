/* eslint-disable */
import BaseService from "./base.service";
import axios from "axios";

class MyShopService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  /**
   * Lấy thông tin của shop
   * @returns promise - Thông tin chi tiết của shop.
   * */
  browseInfoShop(access_token) {
    let url_ = this.baseUrl + `/api/v1/shop/info`;
    let data = JSON.stringify({});
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: access_token
          ? `Bearer ${access_token}`
          : this.getAccessToken(),
        chatToken: localStorage.getItem("token_gchat"),
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

  /**
   * Tìm kiếm sản phẩm theo tên.
   * @param {any} requestParam term => tên mong muốn tìm kiếm
   * @returns promise - Danh sách product
   * */
  browseListProduct(requestParam) {
    let url_ = this.baseUrl + `/api/v1/product/product/search`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      params: requestParam,
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

  // TODO NamVH: Cần xem xét lại việc cần thiết callAPI này không ? do thông tin này đã có trong API lấy thông tin của shop.
  /**
   * Lấy danh sách ca giao tính từ thời điểm hiện tại call API.
   * @returns promise - Danh sách PickAddress
   * */
  browsePickAddress(cancelToken) {
    let url_ = this.baseUrl + `/api/v1/shop/pick-addresses`;

    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
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

  /**
   * Lấy danh sách ca giao tính từ thời điểm hiện tại call API.
   * @returns promise - Danh sách PickAddress
   * */
  browsePickTimes(params) {
    let url_ = this.baseUrl + `/api/v1/package/pick-time`;

    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      params,
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

  // TODO NamVH: Cập nhật mô tả.
  /**
   * ?.
   * */
  browseHamletAddress(parentId, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/address/hamlet`;

    if (parentId) {
      url_ += `?parentId=${parentId}`;
    }

    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
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

  /**
   * CheckCapacityBBS và Lấy danh sách pickTime
   * @param {any} params
   * @returns promise - Danh sách pickTime
   * */
  browseCheckCapacityBBS(params) {
    let url_ = this.baseUrl + `/api/v1/package/bbs/capacity`;

    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      data: params,
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

  async browserGetProducts(params = {}) {
    const url = this.baseUrl + "/api/v1/product/products/list";

    const options = {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      params,
    };

    const response = await this.instance.request(options);

    return response?.data || {};
  }

  async getAchievements(params = {}) {
    const url = this.baseUrl + "/api/v1/shop/award/get";

    const options = {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      params,
    };

    const response = await this.instance.request(options);

    return response?.data || {};
  }

  async getProfile(params = {}) {
    const url = this.baseUrl + "/api/v1/shop/statistic";

    const options = {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      params,
    };

    const response = await this.instance.request(options);

    return response?.data || {};
  }

  async updateProfile(data = {}) {
    const url = this.baseUrl + "/api/v1/shop/update-profile";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }

  async resendOTP(data = {}) {
    const url = this.baseUrl + "/api/v1/shop/resend-confirm-otp";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }

  async confirmOtp(data = {}) {
    const url = this.baseUrl + "/api/v1/shop/confirm-otp";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }

  async updateAvatar(data) {
    const url = this.baseUrl + "/api/v1/shop/update-avatar";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }

  getShopConfig() {
    let url_ = this.baseUrl + `/api/v1/shop/config`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
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

  setShopConfig(params) {
    let url_ = this.baseUrl + `/api/v1/shop/config`;

    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      data: params,
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

  async getBankList(params = {}) {
    const url = this.baseUrl + "/api/v1/shop/list-banks";

    const options = {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      params,
    };

    const response = await this.instance.request(options);

    return response;
  }

  async updateVatInfo(data = {}) {
    const url = this.baseUrl + "/api/v1/shop/update-vat";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }

  async updateConfigInfo(data = {}) {
    const url = this.baseUrl + "/api/v1/shop/save-config";

    const options = {
      method: "POST",
      url,
      headers: {
        Accept: "application/json",
        Authorization: this.getAccessToken(),
      },
      data,
    };

    const response = await this.instance.request(options);

    return response;
  }
}

export default MyShopService;
