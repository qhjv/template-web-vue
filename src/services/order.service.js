import http from "../utils/http";
import moment from "moment";
import { formatDateTimeRequest } from "../utils/date";

const MAX_PER_PAGE = 25;

const orderService = {
  getAll: async (_params = {}) => {
    const dateFields = ["audited_from", "audited_to"];
    const arrayFields = [
      "package_status_id",
      "pick_address_id",
      "package_properties",
      "package_label",
      "wait_print",
      "is_freeship",
    ];
    const booleanFields = ["wait_print", "is_freeship"];

    const params = {
      page: _params.page ? _params.page : undefined,
      limit: _params.limit || 25,
      customer_info: _params.customer_info,
      customer_created_from: formatDateTimeRequest(
        _params.customer_created_from ||
          moment().startOf("month").startOf("day")
      ),
      customer_created_to: formatDateTimeRequest(
        _params.customer_created_to || moment().endOf("month").endOf("day")
      ),
      quick_type: _params.quick_type ? _params.quick_type : undefined,
      packageId: _params.packageId ? _params.packageId : undefined,
    };

    for (const field of dateFields) {
      params[field] = _params[field]
        ? formatDateTimeRequest(_params[field])
        : undefined;
    }

    for (const field of arrayFields) {
      params[field] = _params[field]
        ? _params[field].map((v) => Number(v))
        : undefined;

      if (params[field] && params[field].length === 0) {
        delete params[field];
      }
    }

    for (const field of booleanFields) {
      if (params[field]) {
        if (params[field].includes(0) && params[field].includes(1)) {
          delete params[field];
        } else {
          params[field] = params[field][0];
        }
      }
    }

    if (_params.packageId) {
      if (!_params.customer_created_from) {
        params.customer_created_from = formatDateTimeRequest(
          moment().startOf("day").subtract(3, "month")
        );
      }
      if (!_params.customer_created_to) {
        params.customer_created_to = formatDateTimeRequest(
          moment().endOf("day")
        );
      }
    }

    try {
      const total = params.limit / MAX_PER_PAGE;

      let count = 0;
      let pkgs = [];
      let isSuccess = true;

      let arrayPromise = [];

      for (let index = 0; index < total; index++) {
        arrayPromise.push(
          http.post("/package/list", {
            ...params,
            limit: MAX_PER_PAGE,
            page: (params.page - 1) * total + index + 1,
          })
        );
      }

      const responses = await Promise.all(arrayPromise);

      for (let index = 0; index < responses.length; index++) {
        const response = responses[index] || {};
        if (response?.data?.success) {
          if (index === 0) {
            count = response?.data?.count || 0;
          }
          pkgs.push(...(response?.data?.pkgs || []));
        } else {
          isSuccess = false;
          break;
        }
      }

      return {
        data: {
          pkgs: isSuccess ? pkgs : [],
          count: isSuccess ? count : 0,
          success: isSuccess,
        },
      };
    } catch (error) {
      return {
        data: {
          pkgs: [],
          count: 0,
          success: false,
          message: "Lấy danh sách đơn hàng thất bại, vui lòng thử lại sau.",
        },
      };
    }
  },
  getOrderDetail: async (id) => {
    const params = { id };
    const response = await http.get("/package/package-detail", { params });
    return response;
  },
  getOrderDetailByAlias: async (alias) => {
    const params = { alias };
    const response = await http.get("/package/package-detail", { params });
    return response;
  },
  updateNote: async (id, note) => {
    const response = await http.post("/package/note", { id, note });
    return response;
  },
  getRateChoice: async (type) => {
    const response = await http.get(
      `/package-session/review-options?type=${type}`
    );
    return response;
  },
  getDetailRate: async (session_id) => {
    const response = await http.get(
      `/package-session/review?session_id=${session_id}`
    );
    return response;
  },
  updateRate: async (detail) => {
    const response = await http.post("/package-session/push-review", detail);
    return response;
  },

  exportExcel: async (_params = {}) => {
    const params = {
      ..._params,
      from: _params.from ? formatDateTimeRequest(_params.from) : undefined,
      to: _params.to ? formatDateTimeRequest(_params.to) : undefined,
    };

    if (params.email.length === 0) delete params.email;

    const response = await http.post("/package/export-file", params);

    return response;
  },
  getCountPackage: async (_params) => {
    const params = {
      customer_created_from: formatDateTimeRequest(
        _params.customer_created_from ||
          moment().startOf("month").startOf("day")
      ),
      customer_created_to: formatDateTimeRequest(
        _params.customer_created_to || moment().endOf("month").endOf("day")
      ),
    };
    const response = await http.get("/package/summary-package", { params });

    return response;
  },
  getSessionsByListOrderId: async (listOrderIds) => {
    const response = await http.post("/package-session/get-by-order", {
      pkg_orders: listOrderIds,
    });

    return response;
  },
};

export default orderService;
