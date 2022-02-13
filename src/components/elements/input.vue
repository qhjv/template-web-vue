<template>
  <a-input class="g-input">
    <slot />
    <template #prefix>
      <slot name="prefix" />
    </template>
  </a-input>
</template>

<script>
export default {
  name: "GInput",
};
</script>

<style scoped lang="scss">
.g-input {
  border: 1px solid #c4c4c4 !important;
  border-radius: 5px !important;
  height: 32px;
  box-shadow: none !important;
  &.is-error {
    border-color: #da4838 !important;
  }
}
</style>
