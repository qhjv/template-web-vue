import { REDIRECT_URI_LOGOUT } from "@/contants";

// Service
import services from "@/services";

export default {
  methods: {
    async onLogout(access_token) {
      // TODO NamVH: bật loading khi logout. => tránh trường hợp server xử lý chậm.
      // const res = await services.$auth.logout(access_token);
      try {
        // TODO NamVH: bỏ tạm việc check điều kiện.
        localStorage.clear();
        // Clear IndexDB.
        await services.$auth.logoutIndexDBLocal();
        services.$auth.logout(access_token);
        // TODO NamVH: Cần xử lý thêm, Hạn chế lưu trữ token vào trong localstorage
        // if (res.success) {
        // }
      } catch (e) {
        console.log(e);
      }
      // Clear Store VueX.
      this.$store.commit("sessionStorage/logout");
      setTimeout(() => {
        window.location.replace(REDIRECT_URI_LOGOUT);
      }, 100);
    },
  },
};
