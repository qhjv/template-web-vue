export const OPERATE_STATUS_TITLE = {
  1: "Phát sinh & Đã lấy",
  2: "Delay & Hủy lấy",
  3: "Chờ ở kho đích",
  4: "Giao thành công",
  5: "Delay không liên lạc được KH",
  6: "Delay KH báo không nhận SP",
  7: "Delay sai thông tin ĐH",
  8: "Delay KH hẹn ngày giao",
  9: "Hủy vì shop báo",
  10: "Hủy vì KH không nhận / \n Không gọi được",
  11: "Delay khác",
  12: "Lưu kho chờ trả",
  13: "Đang trả",
  14: "Không giao được / \n Chờ duyệt hoàn",
  15: "Đã trả",
  16: "Hàng đổi, trả / \n Giao KH mới / \n Thất lạc hỏng vỡ",
};

export const ORDER_STATUS = [
  {
    key: "all",
    title: "Tất cả",
  },
  {
    key: -1,
    title: "Đơn hàng hủy",
  },
  {
    key: 1,
    title: "Chưa tiếp nhận",
  },
  {
    key: 2,
    title: "Đã tiếp nhận",
  },
  {
    key: 12,
    title: "Đã điều phối lấy hàng/Đang lấy hàng",
  },
  {
    key: 3,
    title: "Đã lấy hàng/Đã nhập kho",
  },
  {
    key: 4,
    title: "Đã điều phối giao hàng/Đang giao hàng",
  },
  {
    key: 5,
    title: "Đã giao hàng/Chưa đối soát",
  },
  {
    key: 6,
    title: "Đã đối soát",
  },
  {
    key: 7,
    title: "Không lấy được hàng",
  },
  {
    key: 8,
    title: "Delay lấy hàng",
  },
  {
    key: 9,
    title: "Không giao được hàng",
  },
  {
    key: 10,
    title: "Delay giao hàng",
  },
  {
    key: 11,
    title: "Đã đối soát trả hàng",
  },
  {
    key: 13,
    title: "Bồi hoàn",
  },
];

export const ADDRESS_TYPE = {
  PROVINCE: 0,
  DISTRICT: 3,
  WARD: 1,
  STREET: 2,
};

export const ORDER_TYPE = [
  { key: "all", title: "Tất cả" },
  { key: 1, title: "Dễ vỡ", color: "red" },
  { key: 2, title: "Giá trị cao", color: "#1f6dd8" },
  { key: 3, title: "Cồng kềnh" },
  { key: 4, title: "Giao hàng 1 phần" },
  { key: 5, title: "Thu tiền xem hàng" },
  { key: 6, title: "Gia cố", color: "red" },
  { key: 7, title: "Thực phẩm khô/ nông sản", color: "#088a4b" },
];

export const ORDER_SERVICE = [
  { key: "all", title: "Tất cả" },
  { key: 1, title: "Standard" },
  { key: 2, title: "Xfast", color: "orangered" },
  { key: 3, title: "Economy", color: "blueviolet" },
  { key: 4, title: "BBS" },
  { key: 5, title: "FF" },
  { key: 6, title: "OPM" },
];

export const ORDER_STATUS_TITLE = {
  1: "Chưa tiếp nhận",
  2: "Đã tiếp nhận",
  3: "Đã lấy hàng/ Đã nhập kho",
  4: "Đã điều phối giao hàng/ Đang giao hàng",
  5: "Đã giao hàng/ Chưa đối soát",
  6: "Đã đối soát",
  7: "Không lấy được hàng",
  8: "Delay lấy hàng",
  9: "Không giao được hàng",
  10: "Delay giao hàng",
  11: "Đã đối soát trả hàng",
  12: "Đã điều phối lấy hàng/ Đang lấy hàng",
  13: "Bồi hoàn",
};

export const OPERATE_TYPE = [
  {
    key: "incurredReportData.incurred",
    title: "Phát sinh & Đã lấy",
    type: "pick",
  },
  {
    key: "delayNotPickReportData.delay_not_pick",
    title: "Delay & Hủy lấy",
    type: "delay",
  },
  {
    key: "waitTransferReportData.wait_transfer",
    title: "Chờ giao ở kho đích",
    type: "deliver",
  },
  {
    key: "deliveringReportData.done",
    title: "Giao thành công",
    type: "deliver",
  },
  {
    key: "delayReportData.delay_not_contact",
    title: "Delay không liên hệ được KH",
    type: "delay",
  },
  {
    key: "delayReportData.delay_customer_refused",
    title: "Delay KH báo không nhận SP",
    type: "delay",
  },
  {
    key: "delayReportData.delay_wrong_info",
    title: "Delay sai thông tin ĐH",
    type: "delay",
  },
  {
    key: "delayReportData.delay_customer_change_date",
    title: "Delay KH hẹn ngày giao",
    type: "delay",
  },
  {
    key: "cancelByShopReportData.cancel_by_shop",
    title: "Hủy vì shop báo",
    type: "cancel",
  },
  {
    key: "cancelCouldNotContactOrRefuseReportData.cancel_could_not_contact_refuse",
    title: "Hủy vì KH không nhận/ Không gọi được",
    type: "cancel",
  },
  {
    key: "delayReportData.delay_other_reason_v2",
    title: "Delay khác",
    type: "delay",
  },
  {
    key: "notDeliverDoneAndWaitForApprovalReportData.not_deliver_wait_for_approval",
    title: "Lưu kho chờ shop check/ Chờ duyệt hoàn",
    type: "not_deliver_wait_approval",
  },
  {
    key: "waitingToReturnReportData.waiting_to_return",
    title: "Lưu kho chờ trả",
    type: "returning",
  },
  {
    key: "returningReportData.returning",
    title: "Đang trả",
    type: "returning",
  },
  {
    key: "returnedReportData.returned",
    title: "Đã trả",
    type: "returning",
  },
  {
    key: "ticketReportData.ticket",
    title: "Hàng đổi trả/ Giao KH mới/ Thất lạc hỏng vỡ",
    type: "ticket",
  },
];

export const FINANCE_NEXT_AUDIT = [
  {
    key: "cash_transfer",
    title: "Tiền đang luân chuyển",
  },
  {
    key: "pick_money",
    title: "Tiền thu hộ",
  },
  {
    key: "delivery_money",
    title: "Phí giao hàng",
  },
  {
    key: "return_fee",
    title: "Phí hoàn hàng",
  },
  // {
  //   key: "extra_fee",
  //   title: "Phí DV phát sinh",
  // },
  {
    key: "insurance_fee",
    title: "Phí bảo hiểm",
  },
  {
    key: "tip_cod",
    title: "Tiền tip CoD",
  },
  {
    key: "store_fee",
    title: "Phí lưu kho",
  },
  {
    key: "change_address_fee",
    title: "Phí thay đổi địa chỉ giao",
  },
  {
    key: "transfer_fee",
    title: "Phí chuyển khoản",
  },
  {
    key: "sale_off",
    title: "Khuyến mãi",
  },
  {
    key: "refund_money",
    title: "Bồi hoàn",
  },
  {
    key: "deb_bill",
    title: "Nợ tồn",
  },
  {
    key: "available_cash",
    title: "Số dư hiện tại",
    des: "Số dư hiện tại là tiền về tính đến thời điểm hiện tại, sau khi trừ các khoản phí phát sinh dự kiến của tất cả các đơn",
    isBold: true,
  },
  {
    key: "audit_mon",
    title: "Số dư chốt",
    des: "Số dư chốt là tiền về tính đến thời điểm hiện tại, sau khi trừ các khoản phí phát sinh dự kiến của tất cả các đơn đã chốt trạng thái",
    isBold: true,
  },
];
export const FILTER_TOTAL_FROM_TO = [
  {
    key: "first",
    label: "0 - 100",
    value: "first",
    range: {
      from: 0,
      to: 100,
    },
  },
  {
    key: "second",
    label: "100 - 200",
    value: "second",
    range: {
      from: 100,
      to: 200,
    },
  },
  {
    key: "third",
    label: "200 - 300",
    value: "third",
    range: {
      from: 200,
      to: 300,
    },
  },
];
export const KEY_CACHE_DASHBOARD_METRICS = "dashboard_metrics";
export const KEY_CACHE_REALTIME_REPORT_C2C = "realtime_report_c2c";
export const KEY_CACHE_REALTIME_REPORT_B2C = "realtime_report_b2c";
export const KEY_CACHE_NEXT_AUDIT = "next_audit";

export const ROLES = {
  ADMIN: "admin",
  OPERATOR: "operator",
  CASHIER: "cashier",
};
