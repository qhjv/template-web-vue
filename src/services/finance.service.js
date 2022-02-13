import http from "../utils/http";
import { formatDateTimeRequest, formatDayTime } from "../utils/date";

const financeService = {
  getNextAuditData: async ({ type = "all" }) => {
    const params = { type };
    const response = await http.get("/cashflow/statistic-money", { params });
    return response;
  },
  getBillDetail: async (_params = {}) => {
    const params = { bill_id: _params.id };
    const response = await http.get("/cashflow/bill-detail", { params });
    return response;
  },
  getInvoiceDetail: async (_params = {}) => {
    const params = { invoiceId: _params.id };
    return await http.get("/cashflow/get-invoice-detail", { params });
  },
  getInvoicePdf: async (_params = {}) => {
    const params = { invoiceId: _params.id };
    return await http.get("/cashflow/get-invoice-pdf", { params });
  },
  getAuditHistory: async (_params = {}) => {
    const params = {
      ..._params,
      from_date: _params.from_date
        ? formatDateTimeRequest(_params.from_date)
        : undefined,
      to_date: _params.to_date
        ? formatDateTimeRequest(_params.to_date)
        : undefined,
    };
    for (const key in params) {
      if (!params[key]) delete params[key];
    }
    if (!params.type) params.type = "all";
    const response = await http.get("/cashflow/list-bill", { params });
    return response;
  },
  getVATData: async (_params = {}) => {
    const params = {
      ..._params,
      from: _params.from ? formatDayTime(_params.from) : undefined,
      to: _params.to ? formatDayTime(_params.to) : undefined,
      status:
        _params.status && _params.status[0] ? _params.status[0] : undefined,
    };
    const response = await http.get("/cashflow/get-invoice-list", { params });
    return response;
  },
};

export default financeService;
