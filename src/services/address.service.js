/* eslint-disable */
import BaseService from "./base.service";
import axios from "axios";
import { get } from "lodash";

// Database
import wardDatabase from "@/database/ward.database";
import { ADDRESS_TYPE } from "@/contants";
import provinceDatabase from "@/database/province.database";
import districtDatabase from "@/database/district.database";

// Util
import convertDistrictToOption from "@/utils/convertDistrictToOption";
import convertWardToOption from "@/utils/convertWardToOption";

class AddressService extends BaseService {
  instance = axios.create();
  baseUrl = null;

  constructor(baseUrl, instance) {
    super();
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : this.getBaseUrl("");
  }

  async browseProvinceListWithCache() {
    const cached = await provinceDatabase.get();

    const callAPI = async () => {
      const response = await this.browseAddressList();
      if (response.success) {
        provinceDatabase.add(response.data);
        return response.data;
      }
      return [];
    };

    if (cached.length === 0) {
      return await callAPI();
    }
    return cached;
  }

  async browseDistrictListWithCache(parentId) {
    const cached = await districtDatabase.get(parentId);

    const callAPI = async (type) => {
      const response = await this.browseAddressList(
        parentId,
        ADDRESS_TYPE.DISTRICT
      );

      if (response.success) {
        if (type === "update") {
          districtDatabase.put({
            province_id: Number(parentId),
            districts: response.data,
            created_time: Date.now(),
          });
        } else {
          districtDatabase.add({
            province_id: Number(parentId),
            districts: response.data,
            created_time: Date.now(),
          });
        }
        return response.data;
      }
      return [];
    };

    // TODO NamVH: Cache tạm 7 ngày. quá 7 ngày thì cập nhật lại.
    if (!(cached || {}).districts) {
      return convertDistrictToOption(await callAPI());
    } else if (
      cached &&
      (cached.created_time || 0) + 7 * 24 * 60 * 60 * 1000 < Date.now()
    ) {
      return convertDistrictToOption(await callAPI("update"));
    }
    return convertDistrictToOption(cached.districts);
  }

  async browseWardListWithCache(parentId) {
    const cached = await wardDatabase.get(parentId);

    const callAPI = async (type) => {
      const response = await this.browseAddressList(
        parentId,
        ADDRESS_TYPE.WARD
      );

      if (response.success) {
        if (type === "update") {
          wardDatabase.put({
            district_id: Number(parentId),
            wards: response.data,
            created_time: Date.now(),
          });
        } else {
          wardDatabase.add({
            district_id: Number(parentId),
            wards: response.data,
            created_time: Date.now(),
          });
        }
        return response.data;
      }
      return [];
    };

    // TODO NamVH: Cache tạm 7 ngày. quá 7 ngày thì cập nhật lại.
    if (!(cached || {}).wards) {
      return convertWardToOption(await callAPI());
    } else if (
      cached &&
      (cached.created_time || 0) + 7 * 24 * 60 * 60 * 1000 < Date.now()
    ) {
      return convertWardToOption(await callAPI("update"));
    }
    return convertWardToOption(cached.wards);
  }

  browseAddressList(parentId, type, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/address/list`;

    if (parentId) {
      url_ += `?parentId=${parentId}`;
    }
    if (type) {
      url_ += `&type=${type}`;
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
  browseHamletAddress(parentId, isPick = false, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/address/hamlet`;

    if (parentId) {
      url_ += `?parentId=${parentId}`;
    }
    if (isPick) {
      url_ += `&is_pick=${isPick}`;
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
  browseNearOffice(params, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/address/get-near-offices`;

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

  browseSuggestAddress(params, cancelToken) {
    let url_ = this.baseUrl + `/api/v1/address/suggest`;

    // let data = JSON.stringify({ search });

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

  browseParseAddress(params) {
    let url_ = this.baseUrl + `/api/v1/address/parse-address`;

    const options = {
      method: "GET",
      url: url_,
      headers: {
        Accept: "application/json",
        "Shop-Code": this.getShopCode(),
        Authorization: `Bearer ${localStorage.getItem("token_ecom")}`,
      },
      params,
    };

    return this.instance
      .request(options)
      .catch((_error) => {
        return _error;
      })
      .then((_response) => {
        const address = _response?.data?.data;
        const customerSpecificId =
          get(address, "special.id") || get(address, "other.id");
        if (address) {
          _response.data = {
            customer_province_id: get(address, "province.id"),
            customer_province: get(address, "province.name"),
            customer_district_id: get(address, "district.id"),
            customer_district: get(address, "district.name"),
            customer_district_type: get(address, "district.type"),
            customer_street_id: get(address, "street.id"),
            customer_street: get(address, "street.name"),
            customer_ward_id: get(address, "ward.id"),
            customer_ward: get(address, "ward.name"),
            customer_specific_id: customerSpecificId,
            customer_specific:
              customerSpecificId === -1
                ? "Khác"
                : get(address, "special.name") || get(address, "other.name"),
            customer_corner_id: get(address, "corner.id") || null,
            customer_corner: get(address, "corner.name") || null,
            customer_corner_lat: get(address, "corner.lat") || null,
            customer_corner_lng: get(address, "corner.lng") || null,
          };
        }
        return _response;
      });
  }
}

export default AddressService;
