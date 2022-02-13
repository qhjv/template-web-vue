/* eslint-disable */
import BaseService from "./base.service";
import data from "./dataFake/customer.json";
import axios from "axios";

class CustomerService extends BaseService {
  instance = null;
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  getList() {
    return new Promise((resolve) => {
      const dataOption = data.listCustomer;
      resolve(dataOption);
    });
  }

  async browseChannelListCampaign(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async mergePackageDraft(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async savePackageDraftTemp(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async manualPrintComments(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browsePackagesChannel(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browseCommentToPrint(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browseListChannel(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async getColorChannel(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async uploadDraftOrderToGhtk(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async uploadDraftTempOrderToGhtk(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browseListProduct(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async parseAddress(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async readCustomerInfoByPhone(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browseListHub(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async browsePickTimes(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async checkXFastAvailableCapacity(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async checkAvailableTimes(token, data, transformFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async getBookingXfast(token, data, transformFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async confirmBookingXfast(token, data, transformFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async deleteBookingXfast(token, data, transformFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async readScenario(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async printOrder(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async printChannelComment(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async saveListOrder(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async getCustomerColorByPhone(params) {
    let url_ = this.baseUrl + `/api/v1/customer/tel-report`;

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
        let results = _response?.data?.data;

        results = results.map((item) => {
          item.colors = {
            badReportPublic: item.badReportPublic,
            isBadReport: item.isBadReport,
            isBlue: item.isBlue,
            isGoodReport: item.isGoodReport,
            isPurple: item.isPurple,
            isRed: item.isRed,
            isSuperred: item.isSuperred,
            isYellow: item.isYellow,
          };

          delete item.isBadReport;
          delete item.badReportPublic;
          delete item.isBlue;
          delete item.isGoodReport;
          delete item.isPurple;
          delete item.isRed;
          delete item.isSuperred;
          delete item.isYellow;

          return item;
        });

        _response.data.data = results;

        return _response.data;
      });
  }

  // TODO NamVH: move server to package.
  async checkDuplicateOrderByPhone(data) {
    let url_ = this.baseUrl + `/api/v1/package/check-duplicate`;

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

  async saveLogOrder(token, data, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async getListReport(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async searchProduct(params) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  async getCountCustomer(token, params, transFormDataFunc) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  browseCustomerByPhone(customerTel, cancelToken) {
    const url_ = this.baseUrl + "/api/v1/address/get-customer-address";
    const params = { term: customerTel };
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      params,
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

export default CustomerService;
