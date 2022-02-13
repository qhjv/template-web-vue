export const SUM_FIELDS = [
  {
    key: "refund_money",
    title: "Bồi hoàn",
  },
  {
    key: "sale_off",
    title: "Khuyến mãi",
  },
  // {
  //   key: "pre_paid_amount",
  //   title: "Trả trước",
  // },
  // {
  //   key: "return_trans_fee",
  //   title: "Phí DV hoàn lại",
  //   des: "",
  // },
  // {
  //   key: "paid_service_fee",
  //   title: "Phí DV đã thanh toán",
  //   des: "Phí dịch vụ phát sinh (không bao gồm trả trước) của các đơn hàng bị hoàn về mà Shop đã thanh toán tiền mặt hoặc GHTK đã cấn trừ khi đơn không giao được ",
  // },
];

export const SUB_FIELDS = [
  {
    key: "delivery_money",
    title: "Phí giao hàng",
    orderAuditHistory: 1,
  },
  {
    key: "re_delivery_fee",
    title: "Phí giao lại",
    orderAuditHistory: 1.1,
  },
  {
    key: "insurance_fee",
    title: "Phí bảo hiểm",
    orderAuditHistory: 2,
  },
  {
    key: "transfer_fee",
    title: "Phí chuyển khoản",
    orderAuditHistory: 11,
  },
  {
    key: "return_fee",
    title: "Phí chuyển hoàn",
    orderAuditHistory: 3,
  },
  {
    key: "change_address_fee",
    title: "Phí thay đổi địa chỉ giao",
    orderAuditHistory: 4,
  },
  {
    key: "store_fee",
    title: "Phí lưu kho",
    orderAuditHistory: 5,
  },
  {
    key: "tip_cod",
    title: "Tiền tip CoD",
    orderAuditHistory: 6,
  },
  {
    key: "quick_transfer_fee",
    title: "Phí đối soát nhanh",
    orderAuditHistory: 7,
  },
  {
    key: "sum_fee_materials",
    title: "Phí gia cố",
    orderAuditHistory: 8,
  },
  {
    key: "total_prepayment",
    title: "Phí DV cấn trừ",
    orderAuditHistory: 9,
  },
  {
    key: "deb_bill",
    title: "Nợ tồn",
    orderAuditHistory: 10,
  },
];

export const SUM_FIELDS_AUDIT = [
  {
    key: "refund_fee",
    title: "Bồi hoàn",
  },
  {
    key: "discount",
    title: "Khuyến mãi",
  },
  {
    key: "pre_paid_amount",
    title: "Trả trước",
  },
  {
    key: "return_trans_fee",
    title: "Phí DV hoàn lại",
    des: "",
  },
  {
    key: "paid_service_fee",
    title: "Phí DV đã thanh toán",
    des: "Phí dịch vụ phát sinh (không bao gồm trả trước) của các đơn hàng bị hoàn về mà Shop đã thanh toán tiền mặt hoặc GHTK đã cấn trừ khi đơn không giao được ",
  },
];

export const SUB_FIELDS_AUDIT = [
  {
    key: "ship_money",
    title: "Phí giao hàng",
    orderAuditHistory: 1,
  },
  {
    key: "re_delivery_fee",
    title: "Phí giao lại",
    orderAuditHistory: 1.1,
  },
  {
    key: "insurance",
    title: "Phí bảo hiểm",
    orderAuditHistory: 2,
  },
  {
    key: "transfer_fee",
    title: "Phí chuyển khoản",
    orderAuditHistory: 11,
  },
  {
    key: "return_fee", // Chưa thấy trường mới
    title: "Phí chuyển hoàn",
    orderAuditHistory: 3,
  },
  {
    key: "ch_addr_fee",
    title: "Phí thay đổi địa chỉ giao",
    orderAuditHistory: 4,
  },
  {
    key: "store_fee", // Chưa thấy trường mới
    title: "Phí lưu kho",
    orderAuditHistory: 5,
  },
  {
    key: "prepayment_tip",
    title: "Tiền tip CoD",
    orderAuditHistory: 6,
  },
  {
    key: "quick_transfer_fee", // Chưa thấy trường mới
    title: "Phí đối soát nhanh",
    orderAuditHistory: 7,
  },
  {
    key: "sum_fee_materials", // Chưa thấy trường mới
    title: "Phí gia cố",
    orderAuditHistory: 8,
  },
  {
    key: "prepayment_fee",
    title: "Phí DV cấn trừ",
    orderAuditHistory: 9,
  },
  {
    key: "return_debt_money",
    title: "Tiền nợ trả hàng",
    orderAuditHistory: 9.1,
  },
  {
    key: "debt_money", // Chưa thấy trường mới
    title: "Nợ tồn",
    orderAuditHistory: 10,
  },
];

export const OPTION_AUDIT_ONE_TIME_PER_WEEK = [
  "payment_once_per_week_monday",
  "payment_once_per_week_tuesday",
  "payment_once_per_week_wednesday",
  "payment_once_per_week_thursday",
];
