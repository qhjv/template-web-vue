import { createRouter, createWebHistory } from "vue-router";
// import store from "../store";
// import services from "@/services";

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
    },
  },
  { path: "/404", name: "404", component: () => import("../pages/404") },
  { path: "/:catchAll(.*)", redirect: "/404" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
