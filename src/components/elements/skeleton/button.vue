<template>
  <a-skeleton avatar :active="!!active" class="g-skeleton-button" />
</template>

<script>
export default {
  name: "SkeletonButton",
  props: ["active"],
};
</script>

<style lang="scss">
.g-skeleton-button {
  .ant-skeleton-header {
    padding: 0;
    .ant-skeleton-avatar {
      width: 100%;
      height: 32px;
      border-radius: 20px !important;
    }
  }
  .ant-skeleton-content {
    display: none;
  }
}
</style>
