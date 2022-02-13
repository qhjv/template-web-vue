export const WAREHOUSE_METRIC_TYPE = [
  {
    key: "import",
    title: "Nhập",
    isSingle: true,
    keys: ["count_number_product_import"],
    subKeys: ["count_number_product_import"],
  },
  {
    key: "export",
    title: "Xuất",
    isSingle: true,
    keys: ["count_number_product_export"],
    subKeys: ["count_number_product_export"],
  },
  {
    key: "remain",
    title: "Tồn",
    keys: ["count_number_inventory"],
    subKeys: ["count_number_inventory"],
  },
  {
    key: "draft",
    title: "ĐH đã tạo",
    keys: [
      "count_number_package_created",
      "count_number_product_package_created",
    ],
    subKeys: [
      "count_number_package_created",
      "count_number_product_package_created",
    ],
  },
  {
    key: "da_ban_giao",
    title: "Đã bàn giao GHTK",
    keys: [
      "count_number_package_delivered_ghtk",
      "count_number_product_package_delivered_ghtk",
    ],
    subKeys: [
      "count_number_package_delivered_ghtk",
      "count_number_product_package_delivered_ghtk",
    ],
  },
  {
    key: "delivering",
    title: "Đang giao",
    keys: ["total_package_shipping", "count_number_product_shipping"],
    subKeys: ["total_package_shipping", "count_number_product_shipping"],
  },
  {
    key: "return",
    title: "Hoàn hàng",
    isSingle: true,
    keys: ["count_number_package_refund"],
    subKeys: ["count_number_refund"],
  },
  {
    key: "da_giao",
    title: "Đã giao & chưa CK",
    isSingle: true,
    keys: ["count_package_delivered_and_unpaid"],
    subKeys: ["count_number_product_delivered_and_unpaid"],
  },
  {
    key: "audited",
    title: "Đã đối soát CK",
    isSingle: true,
    keys: ["count_number_package_checked"],
    subKeys: ["count_number_product_package_checked"],
  },
  {
    key: "returned",
    title: "Đã trả hàng",
    isSingle: true,
    keys: ["count_number_package_returned"],
    subKeys: ["count_number_product_package_returned"],
  },
];
