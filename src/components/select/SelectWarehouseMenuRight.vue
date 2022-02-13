<template>
  <div class="wrapper mr">
    <input-select :width="'53px'" :setOpen="setIsOpen" :is-active="isOpen">
      <template #content>
        <img src="@/assets/icons/warehouse.svg" class="" />
      </template>
      <template v-if="isOpen" #dropdown>
        <div class="dropdown-overlay overlay-warehouse-dropdown">
          <div
            v-for="option in options"
            :key="option.key"
            @click="handleClick(option.key)"
            class="option-item"
          >
            <g-checkbox
              :checked="value?.toString() === option.key.toString()"
            />
            <a-tooltip :title="option.title" :placement="'left'">
              <span class="ml">{{ option.title }}</span>
            </a-tooltip>
          </div>
        </div>
      </template>
    </input-select>
  </div>
</template>

<script>
import { mapState } from "vuex";

import GCheckbox from "../elements/checkbox.vue";
import InputSelect from "@/components/select/InputSelect.vue";

export default {
  name: "SelectWarehouseMenuRight",
  props: ["isOpen", "setIsOpen", "value", "onChange"],
  components: {
    InputSelect,
    GCheckbox,
  },
  data() {
    return {
      options: [],
    };
  },
  mounted() {
    this.updatePickAddresses();
  },
  methods: {
    open() {
      this.setIsOpen(true);
    },
    updatePickAddresses() {
      const pickAddresses = this.pickAddresses?.map((pickAddress) => ({
        ...pickAddress,
        key: pickAddress.id,
        title: pickAddress.first_address + ", " + pickAddress.last_address,
      }));
      if (pickAddresses.length) {
        this.options = [{ key: "all", title: "Tất cả" }, ...pickAddresses];
      }
    },
    handleClick(_value) {
      this.onChange(_value);
    },
  },
  computed: {
    ...mapState({
      pickAddresses: (state) => state.shop?.PickAddress,
    }),
  },
  watch: {
    pickAddresses() {
      this.updatePickAddresses();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .option-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 30px;
    line-height: 30px;
    align-items: center;
  }
}
</style>
