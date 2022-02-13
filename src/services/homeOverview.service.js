import BaseService from "./base.service";
import axios from "axios";
class OverviewService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }
  browseDashboard(payload, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/dashboard?range=${payload.range}`;

    let data = JSON.stringify({ payload });
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
  browseFinanceLineChart(payload, cancelToken) {
    let url_ =
      this.baseUrl + `/api/v1/dashboard/cash-flow-trend?range=${payload.range}`;

    let data = JSON.stringify({ payload });
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
  browseLineChart(payload, cancelToken) {
    let url_ =
      this.baseUrl + `/api/v1/dashboard/cash-flow-trend?range=${payload.range}`;

    let data = JSON.stringify({ payload });
    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: `Bearer ${localStorage.getItem("token_ecom")}`,
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
export default OverviewService;
