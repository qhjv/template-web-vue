<template>
  <div>mainlayout</div>
</template>

<script>
export default {
  components: {},
  props: {
    layout: {
      type: String,
      default: "blank",
    },
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
main {
  font-size: 1rem;
  height: calc(100vh - 64px);
  overflow-y: auto;

  .main-left {
    width: 300px;
    border-right: 1px solid var(--grayColor);
    position: sticky;
    left: 0;
    height: calc(100vh - 64px);
    overflow: hidden;
  }

  .main-left-extend {
    width: calc(100% - 300px);
    position: sticky;
    left: 0;
    height: calc(100vh - 64px);
    overflow: hidden;
  }

  .main-content {
    width: calc(100% - 600px);
    height: calc(100vh - 64px);
    overflow: auto;
  }

  .main-content-full {
    width: 100%;
    padding: 15px 15px 0 15px;
  }

  .main-animation {
    transition: width 0.1s linear;
  }

  .main-right {
    width: 300px;
    border-left: 1px solid var(--grayColor);
    position: sticky;
    height: calc(100vh - 64px);
    overflow-y: hidden;
  }
  &.is-collapsed-menu-right {
    .main-right {
      width: 125px;
    }
    .main-content {
      width: calc(100% - 300px - 125px);
    }
    .main-left-extend {
      width: calc(100% - 125px);
    }
  }
}
</style>
