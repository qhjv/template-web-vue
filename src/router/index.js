import { createRouter, createWebHistory } from "vue-router";
// import store from "../store";
// import services from "@/services";
// import { ROLES } from "@/contants";

const routes = [
  {
    path: "/error",
    name: "error",
    component: () => import("../pages/Error.vue"),
  },
  {
    path: "/",
    name: "overview",
    component: () => import("../pages/home/Home.vue"),
    meta: {
      layout: "main",
      // roles: [ROLES.ADMIN],
    },
  },
  // {
  //   path: "/kho-va-san-pham",
  //   name: "warehouse-and-products",
  //   component: () => import("../pages/warehouse/index.vue"),
  //   redirect: "/kho-va-san-pham/danh-sach-san-pham",
  //   meta: {
  //     layout: "main",
  //     roles: [ROLES.ADMIN],
  //   },
  //   children: [
  //     {
  //       path: "danh-sach-san-pham",
  //       name: "warehouse-and-products_list-products",
  //       component: () => import("../pages/warehouse/Warehouse.vue"),
  //       meta: {
  //         roles: [ROLES.ADMIN],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/chi-tiet-hoa-don/:id",
  //   name: "chi-tiet-hoa-don",
  //   component: () => import("../pages/finance/ViewPdfBill.vue"),
  //   meta: {
  //     roles: [ROLES.ADMIN, ROLES.CASHIER],
  //   },
  // },
  // {
  //   path: "/thong-tin-shop",
  //   name: "shop-info",
  //   component: () => import("../pages/shop-info/index.vue"),
  //   redirect: "/tao-don-hang/tai-khoan",
  //   meta: {
  //     layout: "header",
  //   },
  //   children: [
  //     {
  //       path: "tai-khoan",
  //       name: "shop-info-account",
  //       component: () => import("../pages/shop-info/account.vue"),
  //       meta: {
  //         roles: [ROLES.ADMIN],
  //       },
  //     },
  //   ],
  // },
  { path: "/404", name: "404", component: () => import("../pages/404") },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// async function getShopInfo(access_token) {
//   let shopInfo = null;
//
//   try {
//     const response = await services.$shop.browseInfoShop(access_token);
//     if (response?.success) {
//       shopInfo = response.data;
//       store.commit("shop/setFullInfoShop", shopInfo);
//       // Update Shop_code and Shop_type
//       localStorage.setItem("shop_code", shopInfo.Shop?.code);
//       localStorage.setItem("shop_token", shopInfo.Shop?.token);
//       localStorage.setItem("shop_type", shopInfo.Shop?.shop_type);
//     }
//   } catch (error) {
//     console.error(error);
//   }
//
//   return shopInfo;
// }
//
// router.beforeEach(async (to, from, next) => {
//   let role = store.state.shop.ShopStaff.role;
//
//   if (to.name === "login") {
//     next();
//   }
//
//   if (!role) {
//     const shopInfo = await getShopInfo();
//     if (shopInfo) {
//       role = shopInfo?.ShopStaff?.role;
//     }
//   }
//
//   if (!role) {
//     next({
//       name: "error",
//       params: {
//         message: "Lấy thông tin shop thất bại",
//         description: "Vui lòng thử lại bằng cách trở lại trang chủ.",
//       },
//     });
//   } else {
//     const isValid =
//       role === ROLES.ADMIN || !to.meta?.roles || to.meta?.roles?.includes(role);
//
//     if (isValid) {
//       next();
//     } else {
//       next({
//         name: role === ROLES.OPERATOR ? "manage-order" : "cash-flow",
//       });
//     }
//   }
// });

export default router;
