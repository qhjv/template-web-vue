<template>
  <div class="channel__item-col channel__item-note">
    <div class="note-wrapper" @paste.prevent="handlePasteFromExcel($event)">
      <g-textarea
        v-model:value="message"
        :debounce="debounceConfig"
        :autoSize="{ minRows: 1, maxRows: 2 }"
      />
      <div class="note-option">
        <g-multiselect
          :width="415"
          :height="180"
          class="filter-select-wrapper"
          :showApplyToAllChecked="true"
          :isApplyToAllChecked="isApplyAllMessage"
          @applyToAll="handleApplyAllByField('isApplyAllMessage', $event)"
        >
          <template #contentDropdown>
            <g-select
              class="filter-select"
              :style="{ textAlign: 'center' }"
              :open="false"
              :options="expNotes"
              :value="selectionText"
            ></g-select>
          </template>
          <template #contentOption>
            <list-options
              :showAll="false"
              :options="expNotes"
              :checked-list-default="messagesData"
              @onChange="handleUpdateOrderMessage"
            >
              <template #label="{ option }">
                {{ option.text }}
              </template>
            </list-options>
            <div class="t-ml-2">
              <tags-note
                :tags="tags"
                :packageLabels="packageLabels"
                :serviceData="serviceData"
                @onSelectTag="onSelectTag"
              />
            </div>
          </template>
        </g-multiselect>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { filter, find } from "lodash";

// Components
import GMultiselect from "@/components/base/Multiselect";
import ListOptions from "@/components/base/ListOptions";
import GSelect from "@/components/base/SelectBoxInTable";
import GTextarea from "@/components/base/TextareaInTable";
import TagsNote from "@/components/TagsNote";

const TCID = 10000;

export default defineComponent({
  name: "order-excel-col-note",
  props: {
    messageData: {
      type: Object,
    },
    productsData: {
      type: Array,
    },
    messagesData: {
      type: Array,
      default() {
        return [];
      },
    },
    tags: {
      type: Array,
      default() {
        return [];
      },
    },
    serviceData: {
      type: String,
      default: "",
    },
    packageLabels: {
      type: Array,
      default() {
        return [];
      },
    },
    expNotes: {
      type: Array,
      default() {
        return [];
      },
    },
    debounceConfig: {
      type: Number,
      default: 1,
    },
    isApplyAllMessage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TagsNote,
    GTextarea,
    GSelect,
    GMultiselect,
    ListOptions,
  },
  methods: {
    handlePasteFromExcel(event) {
      this.$emit("onPasteFromExcel", "message", event);
    },
    handleUpdateOrderMessage(data) {
      this.$emit("onUpdateItemByFieldName", {
        name: "messages",
        value: data.checkedList,
      });
      this.$emit("onUpdateOrderMessage", data.checkedList);
    },
    handleApplyAllByField(name, checked) {
      this.$emit("onApplyAllByField", name, checked);
    },
    onChangeBigTags(type) {
      let bigTag = find(this.packageLabels, (x) => x.label === "Giá trị cao");

      let tags = this.tags || [];
      let change = false;

      if (type === "add") {
        if (!this.tags?.includes(bigTag.value)) {
          tags = [...tags, bigTag.value];
          change = true;
        }
      } else if (type === "remove") {
        if (this.tags?.includes(bigTag.value)) {
          tags = this.tags?.filter((_item) => _item !== bigTag.value);
          change = true;
        }
      }

      if (change) {
        this.$emit("onUpdateItemByFieldName", {
          name: "tags",
          value: tags,
        });
      }
    },
    onSelectTag(item) {
      let tieuChuanTag = find(
        this.packageLabels,
        (x) => x.label === "Tiêu chuẩn"
      );

      let bigTag = find(this.packageLabels, (x) => x.label === "Giá trị cao");

      // Loại bỏ tag tiêu chuẩn trước.
      let tags = this.tags.filter((_item) => _item !== tieuChuanTag.value);

      if (tieuChuanTag.value === item.value) {
        // Nếu chọn tag tiêu chuẩn. => sẽ ẩn hết tất cả các tag khác.
        tags = [item.value];
      } else {
        // Nếu tag đang chọn, đã được active thì bỏ chọn.
        if (this.tags.includes(item.value)) {
          tags = tags.filter((_item) => _item !== item.value);
        } else {
          // TH chọn các tag khác. (Dễ vỡ + Giao 1 phần)
          tags = [...tags, item.value];
        }
      }

      if (
        tags.length === 0 ||
        (tags.length === 1 && tags[0] === bigTag.value)
      ) {
        // TH rỗng thì mặc định thêm tag tiêu chuẩn vào
        tags = [TCID];
      }

      this.handleUpdateTags(tags);
    },
    /**
     * Convert text VND to Number.
     */
    vndToNumber(x) {
      if (!x) {
        return 0;
      }
      x = x.toString();
      x = x.replace(/\D/g, "");
      x = parseInt(x);
      return x;
    },
    handleUpdateTags(tags) {
      this.$emit("onUpdateItemByFieldName", {
        name: "tags",
        value: tags,
      });
      this.$emit("onUpdateOrderTags");
    },
    handleChangeTags(newValue) {
      let totalCashNew = 0;
      newValue.forEach((item) => {
        totalCashNew += this.vndToNumber(item.money);
      });

      // TODO NamVH: chỗ này đang bị gọi lại nhiều lần.
      const shopType = localStorage.getItem("shop_type");
      // Nếu tổng giá trị của đơn hàng.
      // 1. Shop_type = 0 (shop c2c, đơn hàng có tổng giá trị hàng >=1tr -> nhảy tag [giá trị cao]
      // 2. shop_type = 1 (shop b2c, đơn hàng có tổng giá trị hàng >3tr -> nhảy tag [giá trị cao]
      // -> tính bảo hiểm hàng hoá
      // TODO NamVH: Đưa logic này tập chung và gọn vào 1 khu vực để sau dễ quản lý. Vì sẽ thay đổi theo thời gian.
      if (
        (`${shopType}` === "0" && totalCashNew >= 1000000) ||
        (`${shopType}` === "1" && totalCashNew > 3000000)
      ) {
        this.onChangeBigTags("add");
      } else {
        this.onChangeBigTags("remove");
      }

      // Nếu là đơn Express thì cần loại bỏ tag gia cố nếu trước đó đã chọn.
      if (this.serviceData === "Express") {
        const giacoTag = this.packageLabels.find(
          (item) => item.label === "Gia cố hàng hóa"
        );

        if (this.tags.includes(giacoTag.value)) {
          let tags = this.tags.filter((_item) => _item !== giacoTag.value);
          this.handleUpdateTags(tags);
        }
      }
    },
  },
  computed: {
    message: {
      get() {
        return this.messageData;
      },
      set(nextValue) {
        this.$emit("onUpdateItemByFieldName", {
          name: "message",
          value: nextValue,
        });
      },
    },
    selectionText() {
      const tags = filter(this.tags, (x) => {
        if (this.serviceData === "Express") {
          const giacoTag = this.packageLabels.find(
            (item) => item.label === "Gia cố hàng hóa"
          );
          if (!giacoTag) return true;
          return giacoTag.value !== x;
        }
        return true;
      });
      return `Chọn (${this.messagesData.length + tags.length})`;
    },
  },
  watch: {
    productsData: {
      handler(oldValue, newValue) {
        // TODO NamVH: Cần so sánh để tránh việc thực thi ở đây.
        this.handleChangeTags(newValue);
      },
      deep: true,
    },
    tags() {
      this.handleChangeTags(this.productsData);
    },
  },
});
</script>

<style scoped>
.channel__item-col {
  padding-top: 15px;
}

.note-option {
  margin-top: 0.25rem;
  text-align: right;
}
</style>
