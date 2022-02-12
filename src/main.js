import { createApp } from "vue";
import App from "./App.vue";
import Antd from "ant-design-vue";
import VueVirtualScroller from "vue-virtual-scroller";

import "ant-design-vue/dist/antd.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import "maplibre-gl/dist/maplibre-gl.css";

import VueApexCharts from "vue3-apexcharts";
import "./assets/tailwind.css";

const app = createApp(App).use(Antd).use(VueVirtualScroller).use(VueApexCharts);

app.mount("#app");
