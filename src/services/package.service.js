/* eslint-disable */
import axios from "axios";
import { forEach } from "lodash";

// Service
import BaseService from "./base.service";

// databases
// import orderExcelDatabase from "@/database/orderExcel.database";

class PackageService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  updatePackageCreated(param, orderId) {
    let url_ = this.baseUrl + `/api/v1/package/update/${orderId}`;

    let data = JSON.stringify(param);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  createPackage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/create`;

    let data = JSON.stringify(payload);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  savePackages(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/add/multiple`;
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      data: payload,
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

  savePackageFromDraft(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft/add/multiple`;
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      data: payload,
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

  getDraftSession(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/order-batchs`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      params: payload,
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

  getDraftDetailPackage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft/list-detail`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      params: payload,
      cancelToken,
    };

    return this.instance
      .request(options)
      .catch((_error) => {
        return _error;
      })
      .then((_response) => {
        const result = [];
        const data = _response?.data?.data || [];
        const listIds = payload.draft_ids.split(",");
        forEach(listIds, (item) => {
          result.push(data.find((x) => `${x.id}` === `${item}`));
        });

        _response.data = { ..._response.data, data: result };

        return _response.data;
      });
  }

  removeDraftPackage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft/delete`;
    let data = JSON.stringify(payload);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  // updateDraftPackage(payload, cancelToken) {
  //   let url_ =
  //     this.baseUrl + `/api/v1/package/draft/update/${payload.package_draft_id}`;
  //   const options = {
  //     method: "POST",
  //     url: url_,
  //     headers: {
  //       Accept: "application/json",
  //       "Shop-Code": this.getShopCode(),
  //       "Content-Type": "application/json",
  //       Authorization: this.getAccessToken(),
  //     },
  //     data: { package: payload.package },
  //     cancelToken,
  //   };
  //
  //   return this.instance
  //     .request(options)
  //     .catch((_error) => {
  //       return _error;
  //     })
  //     .then((_response) => {
  //       return {
  //         ..._response.data,
  //         orderId: payload.orderId,
  //         draftId: payload.package_draft_id,
  //       };
  //     });
  // }

  saveDraftPackage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft`;
    let data = JSON.stringify(payload);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  getDraftPackage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft/list`;
    let data = JSON.stringify(payload);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  checkDraftPackage(params, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/draft-status`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  printfDraftPackage(data) {
    let url_ = this.baseUrl + `/api/v1/package/print-draft`;
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  uploadImage(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/services/images/upload`;
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      data: payload,
      cancelToken,
    };

    return this.instance
      .request(options)
      .catch((_error) => {
        return _error.response;
      })
      .then((_response) => {
        return _response.data;
      });
  }

  uploadFilesToGs(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/service/images/upload-gs`;
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      data: payload,
      cancelToken,
    };

    return this.instance
      .request(options)
      .catch((_error) => {
        return _error.response;
      })
      .then((_response) => {
        return _response.data;
      });
  }

  getTransportMethod(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/get-transport`;
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
        Authorization: this.getAccessToken(),
      },
      params: payload,
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

  calculateShipFee(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/fee`;

    let data = JSON.stringify(payload);
    const options = {
      method: "POST",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        "Content-Type": "application/json",
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

  browseDeliverTime(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/deliver-time`;

    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: this.getAccessToken(),
      },
      params: payload,
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

  browsePackageLabel(cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/label`;

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

  browsePackageNote(cancelToken) {
    let url_ = this.baseUrl + `/api/v1/package/default-note`;

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

  async browserSaveToIndexDB(data) {
    const cached = await orderExcelDatabase.get();

    let result = null;

    // Check, Nếu đã có cache thì put, chưa có thì add.
    if (cached) {
      result = await orderExcelDatabase.put(JSON.parse(JSON.stringify(data)));
    } else {
      result = await orderExcelDatabase.add(JSON.parse(JSON.stringify(data)));
    }

    return result;
  }
  // async browserGetOrderExcel() {
  //   return await orderExcelDatabase.get();
  // }
}

export default PackageService;
