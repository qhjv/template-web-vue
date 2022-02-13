<template>
  <g-modal
    :visible="visible"
    :footer="null"
    :centered="true"
    :width="500"
    :maskClosable="!loading"
    :title="title"
    @cancel="handleCancel"
  >
    <div class="order-note-modal-wrapper">
      <div>
        <slot name="header" />
        <div>
          <p class="t-text-center t-text-18 t-leading-4.5 t-text-black t-pt-3">
            Đánh giá của bạn giúp GHTK <br />
            hoàn thiện hơn mỗi ngày
          </p>
          <div
            class="t-flex t-items-center t-justify-around t-text-center t-cursor-pointer"
          >
            <div v-for="(type, index) in optionTypes" :key="index">
              <div @click="handleChangeType(type.key)">
                <keep-alive>
                  <component
                    :is="`${type.keyComponent}${
                      `${type.key}` === `${typeSelected}` ? 'Color' : ''
                    }`"
                  ></component>
                </keep-alive>
                <p
                  :class="{
                    't-text-primary': `${type.key}` === `${typeSelected}`,
                    't-font-medium': true,
                  }"
                >
                  {{ type.text }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div v-for="(type, index) in optionTypes" :key="index">
              <div
                class="t-flex t-flex-col t-items-center"
                v-show="`${type.key}` === `${typeSelected}`"
              >
                <div
                  class="check-box-rate t-p-2 t-mb-2 t-w-full"
                  v-for="item in type.listOptions"
                  :key="item.key"
                >
                  <g-checkbox
                    :checked="listOptionSelected.includes(item.key)"
                    @change="handleChangeCheckbox(item.key)"
                    class="t-pb-2"
                  >
                    {{ item.value }}
                  </g-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <g-textarea
        style="min-height: 92px"
        placeholder="Nhập ghi chú thêm"
        :class="{ invalid: errorMessage }"
        :value="note"
        @change="handleChangeNote"
      />
      <span v-if="errorMessage" class="error-message mt">
        {{ errorMessage }}
      </span>
      <g-button
        :loading="loading"
        :disabled="
          (!note && this.listOptionSelected.length === 0) || !!errorMessage
        "
        class="primary w-100 mt-1"
        @click="handleSubmit"
      >
        Xác nhận
      </g-button>
    </div>
  </g-modal>
</template>

<script>
import GModal from "../elements/modal.vue";
import GCheckbox from "@/components/elements/checkbox.vue";
import GButton from "../elements/button.vue";
import { GTextarea } from "../elements";

// Icons
import Satisfied from "@/components/icons/SatisfiedIcon.vue";
import Unsatisfied from "@/components/icons/UnsatisfiedIcon.vue";
import SatisfiedColor from "@/components/icons/SatisfiedColorIcon.vue";
import UnsatisfiedColor from "@/components/icons/UnsatisfiedColorIcon.vue";

export default {
  name: "OrderNoteModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    setVisible: {
      type: Function,
      default() {
        return () => {};
      },
    },
    handleUpdateReview: {
      type: Function,
      default() {
        return () => {};
      },
    },
    optionTypes: {
      type: Array,
      default() {
        return [];
      },
    },
    listOptionSelected: {
      type: Array,
      default() {
        return [];
      },
    },
    typeSelected: {
      type: String,
      default: "",
    },
    note: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "Đánh giá",
    },
  },
  components: {
    GModal,
    GButton,
    GTextarea,
    Satisfied,
    SatisfiedColor,
    Unsatisfied,
    UnsatisfiedColor,
    GCheckbox,
  },
  data() {
    return {
      loading: false,
      errorMessage: "",
      unsatisfiedActive: true,
      rate_details: [],
    };
  },
  mounted() {
    this.rate_details = [];
  },
  methods: {
    handleChangeType(value) {
      this.$emit("onChangeType", value);
    },
    handleCancel() {
      this.setVisible(false);
      this.$emit("onClose");
    },
    handleChangeNote(event) {
      const note = event.target.value;
      this.$emit("onChangeNote", note);
    },
    handleChangeCheckbox(key) {
      const rateDetails = this.listOptionSelected.includes(key)
        ? this.listOptionSelected.filter((field) => field !== key)
        : this.listOptionSelected.concat(key);
      this.$emit("onChangeOption", rateDetails);
    },
    async handleSubmit() {
      this.loading = true;
      const response = await this.handleUpdateReview(
        this.note,
        this.typeSelected,
        this.listOptionSelected
      );
      if (response.success) {
        this.setVisible(false);
      }
      this.loading = false;
    },
  },
  watch: {
    note(_note) {
      this.errorMessage = _note.length > 120 ? "Tối đa 120 ký tự." : "";
    },
  },
};
</script>

<style lang="scss">
textarea.invalid {
  border-color: #da4838;
}
.error-message {
  color: #da4838;
  display: block;
}
.rate-info {
  color: #000000;
  border-bottom: 1px solid #e0e0e0;
  font-family: Roboto;
}
.check-box-rate {
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid green;
}
.check-box-rate-satisfied .check-box-rate .ant-checkbox-inner {
  width: 22px;
  height: 22px;
  border-color: #000 !important;
  border: 2px solid #000000;
}
</style>
