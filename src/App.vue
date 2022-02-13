<template>
  <MainLayout :layout="layout" />
</template>

<script>
// Layout
import {MainLayout} from '@/layouts';

// Service
// import { VERSION } from "./contants";

// Mixins

export default {
  components: {
    MainLayout,
  },
  mounted() {
    // Checking version.
    window.ECOM_VERSION = '1.0.3';
    console.log('Version: ', '1.0.3');
    // if (
    //   !localStorage.getItem("token_ecom") &&
    //   window.location.pathname !== "/web/login"
    // ) {
    //   this.$router.push("/login");
    // } else if (localStorage.getItem("token_ecom")) {
    //   this.$store.commit("auth/setAuthentication", true);
    // }
  },
  // mixins: [logout],
  // computed: {
  //   layout() {
  //     return this.$route?.meta?.layout;
  //   },
  // },
  // TODO NamVH: Xử lý tạm, sau sẽ tối ưu và viết gọn thêm.
  // - Cần lưu trữ token ở trong Cookie và xét các cơ chế bảo mật. HTTPS.
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
