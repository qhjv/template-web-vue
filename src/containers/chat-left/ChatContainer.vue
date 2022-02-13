<template>
  <div class="chat-container">
    <a-spin :spinning="loading" tip="Đang cập nhật...">
      <div :style="{ width: '100%', height: 'calc(100vh - 64px)' }">
        <iframe
          v-show="!error"
          id="chat-iframe"
          :src="`${gChatOrigin}/?iframe=post_order&createdTime=${createdTime}`"
          title="G-Chat"
        />
        <div class="not-found" v-show="!loading && !hasPermission && !error">
          Bạn không được cấp quyền truy cập.
        </div>
        <div class="not-found" v-show="error">
          Gặp lỗi trong quá trình thực thi.
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script>
import _ from "lodash";

// Mixins
import logout from "@/plugins/mixins/logout";
import eventGChat from "@/plugins/mixins/eventGChat";

// Const
import { URL_GCHAT } from "@/contants";

export default {
  data() {
    return {
      gChatOrigin: URL_GCHAT,
      loading: true,
      hasPermission: false,
      sendPermission: false,
      width: "340px",
      error: false,
      timer: null,
      createdTime: Date.now(),
    };
  },
  mixins: [logout, eventGChat],
  mounted() {
    const eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    const event = window[eventMethod];
    const messageEvent =
      eventMethod === "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    event(messageEvent, (e) => this.handleEventIframe(e), false);
    this.timer = setTimeout(this.checkError, 60000);
    frames[0].document.body.style.backgroundColor = "#000";
  },
  methods: {
    checkError() {
      if (this.loading) {
        this.loading = false;
        this.error = true;
      }
      clearTimeout(this.timer);
    },
    handleEventIframe(e) {
      // Do something.
      if (this.gChatOrigin === e.origin) {
        console.log("Event From Iframe", e);
        let type = _.get(e, "data.type");

        // I, Check content iframe is ready. Iframe push
        if (type === "content_ready") {
          let status = _.get(e, "data.payload.status");
          if (!status || this.sendPermission) return;
          setTimeout(() => {
            this.$mixinSendEventAuthentication();
            this.sendPermission = true;
          }, 200);
        }

        // II, Check user has permission to show iframe
        if (type === "user") {
          let hasPermission = _.get(e, "data.payload.has_permission");
          if (!hasPermission || this.hasPermission) {
            this.loading = false;
            return;
          }
          this.hasPermission = true;
          // Hoàn thành.
          this.loading = false;
        }

        // III, Handle action from Iframe.
        if (type === "status_iframe") {
          this.$router.push("/chat");
        }

        // IV, Handle token expired from Iframe.
        if (type === "token_expired") {
          this.error = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-container {
  width: 100%;
  height: calc(100vh - 64px);
  iframe {
    width: 100%;
    height: 100%;
    border: unset;
  }
  .not-found {
    justify-content: center;
    padding-top: 20px;
    display: flex;
    height: 100%;
    width: 100%;
  }
}
</style>
