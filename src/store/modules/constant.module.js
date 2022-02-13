// Chứa các const của project mong muốn sử dụng chung.
// TODO NamVH: Bên moshop đang để tạm các const này trong store nên đang để tạm đây.

const constantModule = {
  namespaced: true,
  state: {
    expNotes: [
      {
        name: "Giao hàng một phần",
        value: "Giao hàng một phần",
        text: "Giao hàng một phần",
      },
      {
        name: "Có vấn đề gọi shop, không tự ý hủy đơn",
        value: "Có vấn đề gọi shop, không tự ý hủy đơn",
        text: "Có vấn đề gọi shop, không tự ý hủy đơn",
      },
      {
        name: "Gọi khách trước khi giao",
        value: "Gọi khách trước khi giao",
        text: "Gọi khách trước khi giao",
      },
      {
        name: "Khách không lấy hàng thu ship",
        value: "Khách không lấy hàng thu ship",
        text: "Khách không lấy hàng thu ship",
      },
    ],
    shipMethods: [
      { text: "Bay", label: "Bay", value: "fly", key: "fly" },
      { text: "Bộ", label: "Bộ", value: "road", key: "road" },
    ],
    serviceMethods: [
      {
        text: "Express (Hàng nhỏ ≤20kg)",
        value: "Express",
        key: "express",
      },
      { text: "BBS (Hàng lớn >20kg)", value: "BBS", key: "bbs" },
    ],
    whoPays: [
      { label: "Khách trả", value: "khach", key: "1" }, // freeship = false
      { label: "Shop trả", value: "shop", key: "0" }, // freeship = true
    ],
    shop: [],
  },
  mutations: {},
  actions: {},
};

export default constantModule;
