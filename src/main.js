import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import VueVirtualScroller from "vue-virtual-scroller";
import vClickOutside from "@/directives/vClickOutside";
import filters from "@/filters";

import "@/utils/browserUnSupport";
import "ant-design-vue/dist/antd.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "maplibre-gl/dist/maplibre-gl.css";

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)
  .use(store)
  .use(Antd)
  .use(router)
  .use(VueVirtualScroller)
  .use(VueApexCharts)
  .directive("click-outside", vClickOutside);

app.config.globalProperties.$filters = filters;
app.mount("#app");
