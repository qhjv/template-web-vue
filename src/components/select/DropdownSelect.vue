<template>
  <div class="g-dropdown-select" v-click-outside="handleClickOutside">
    <g-input
      :value="textDisplay"
      :placeholder="placeholder"
      :readonly="true"
      @focus="onFocusInput"
    />
    <div
      class="list-options-wrapper"
      :class="{ 'placement-right': placement === 'right' }"
      :style="{ width, minWidth }"
      v-if="openDropdown"
    >
      <div
        v-for="option in options"
        :key="option.key"
        class="option-item"
        @click="handleToogle(option.key)"
      >
        <template v-if="option.key === 'all'">
          <g-checkbox
            v-if="
              value.filter((v) => v !== 'all').length !== options.length - 1
            "
            :indeterminate="true"
            :checked="value.filter((v) => v !== 'all').length !== 0"
          />
          <g-checkbox
            v-if="
              value.filter((v) => v !== 'all').length === options.length - 1
            "
            :checked="true"
          />
        </template>
        <g-checkbox v-else :checked="value.includes(option.key)" />
        <span class="option-item__title">
          {{ option.title }}
        </span>
      </div>
      <div class="option-item" v-if="options.length === 0">
        <span class="option-item__title">Không có kết quả</span>
      </div>
    </div>
    <img
      class="down-icon"
      src="@/assets/icons/arrow_down_select.svg"
      width="12"
      height="12"
    />
  </div>
</template>

<script>
import GInput from "../elements/input.vue";
import GCheckbox from "../elements/checkbox.vue";

export default {
  name: "GDropdownSelect",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    onChange: {
      type: Function,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "Chọn giá trị",
    },
    width: {
      type: String,
      default: "100%",
    },
    isSingle: {
      type: Boolean,
      default: false,
    },
    minWidth: {
      type: String,
      default: "unset",
    },
    placement: {
      type: String,
      default: "",
    },
  },
  components: {
    GInput,
    GCheckbox,
  },
  data() {
    return {
      openDropdown: false,
    };
  },
  methods: {
    onFocusInput() {
      this.openDropdown = true;
    },
    handleClickOutside() {
      this.openDropdown = false;
    },
    handleToogle(_value) {
      if (this.isSingle) {
        this.onChange(this.value.includes(_value) ? [] : [_value]);
      } else {
        if (_value === "all") {
          this.onChange(
            this.value.filter((v) => v.key !== "all").length !== 0
              ? []
              : this.options.filter((v) => v.key !== "all").map((v) => v.key)
          );
        } else {
          this.onChange(
            !this.value.includes(_value)
              ? this.value.concat(_value)
              : this.value.filter((v) => v !== _value)
          );
        }
      }
    },
  },
  computed: {
    optionTitleByKey() {
      let _optionTitleByKey = {};
      for (const option of this.options) {
        if (option.key !== "all") {
          _optionTitleByKey[option.key] = option.title;
        }
      }
      return _optionTitleByKey;
    },
    textDisplay() {
      if (!this.value.length) return "";
      if (this.isAllSelected) return "Tất cả";
      if (this.value.length === 1) {
        return this.optionTitleByKey[this.value[0]];
      }
      return `Đã chọn ${this.value.length}`;
    },
    isAllSelected() {
      return (
        this.value.filter((v) => v.key !== "all").length ===
        this.options.length - 1
      );
    },
  },
};
</script>

<style lang="scss">
.g-dropdown-select {
  position: relative;
  .g-input {
    height: 32px;
    padding-right: 36px;
    box-shadow: none !important;
    text-align: center;
    cursor: pointer;
  }
  .list-options-wrapper {
    border-radius: 5px;
    z-index: 9999;
    position: absolute;
    bottom: -5px;
    transform: translateY(100%);
    width: 100%;
    background-color: #fff;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    overflow: hidden;
    max-height: 339px;
    overflow-y: auto;
    &.placement-right {
      right: 0;
    }
    .option-item {
      padding: 0.25em 0.6em;
      cursor: pointer;
      display: flex;
      height: 34px;
      overflow: hidden;
      &:not(:last-child) {
        border-bottom: 1px solid var(--grayColor);
      }
      &__title {
        margin-left: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .down-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.25);
    svg {
      width: 12px !important;
      height: 12px !important;
    }
  }
}
</style>
