<template>
  <a-modal
    class="add-product-modal"
    :visible="visible"
    :footer="null"
    :centered="true"
    :width="656"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template v-slot:title>
      <div class="t-flex t-flex-row t-items-center t-w-full">
        <h3
          class="t-text-center t-text-white t-mb-0 t-text-[24px] t-font-medium t-h-[25px]"
          style="
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          "
        >
          Tạo sản phẩm
        </h3>
        <span class="t-flex t-cursor-pointer" @click="handleCancel">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 2.01429L17.9857 0L10 7.98571L2.01429 0L0 2.01429L7.98571 10L0 17.9857L2.01429 20L10 12.0143L17.9857 20L20 17.9857L12.0143 10L20 2.01429Z"
              fill="#fff"
            />
          </svg>
        </span>
      </div>
    </template>
    <div class="t-text-black t-text-[16px]">
      <div class="add-product-modal-img t-grid t-grid-cols-6 t-gap-3 t-pb-4">
        <div
          class="product-image t-relative"
          v-for="(image, index) in product.images_file"
          :key="index"
        >
          <img class="t-w-full t-h-full" :src="image" :alt="''" />
          <svg
            class="t-absolute t-w-[15px] t-top-[1px] t-right-0 t-cursor-pointer"
            @click="removeFile(index)"
            viewBox="64 64 896 896"
            data-icon="close"
            :width="width"
            :height="height"
            :fill="fill || '#fff'"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            />
          </svg>
        </div>
        <div class="select-image__wrapper" @click="selectImage('orderImage')">
          <plus-icon class="t-mb-[10px]" :width="23" :height="23"></plus-icon>
          <span style="font-size: 16px; font-weight: 500"> Ảnh </span>
          <input
            type="file"
            :ref="'orderImage'"
            style="display: none"
            multiple="true"
            @change="(e) => onSelectProductImage(e)"
          />
        </div>
      </div>
      <div class="add-product-modal-detail t-py-[20px]">
        <div class="t-flex t-items-center">
          <label class="t-w-[120px]">Tên sản phẩm </label>
          <g-input
            class="t-flex-1"
            v-model="product.name"
            placeholder="Nhập tên sản phẩm"
            :outer-error-message="validate.product_name"
          ></g-input>
        </div>
        <div class="t-flex t-items-center t-mt-[20px]">
          <label class="t-w-[120px]">Danh mục </label>
          <g-select
            class="t-flex-1 t-cursor-pointer"
            inputJustify="left"
            :show-search="false"
            optionAlign="left"
            :data-source="formattedProductCategories"
            v-model:selected-item="product.tags"
          ></g-select>
        </div>
        <div class="t-flex t-items-center t-mt-[20px]">
          <label class="t-w-[120px]">Khối lượng </label>
          <p class="t-flex t-items-center t-m-0">
            <g-select
              class="t-mr-[10px] t-w-[90px] t-cursor-pointer"
              inputJustify="center"
              :show-search="false"
              valueType="number"
              :number-only="true"
              optionAlign="center"
              showSearch
              type="suggestion"
              :data-source="weightData"
              v-model:selectedItem="product.weight"
            ></g-select
            >kg
          </p>
        </div>
        <div class="t-flex t-items-center t-mt-[20px]">
          <label class="t-w-[120px]">Giá gốc</label>
          <g-input
            class="t-flex-1"
            v-model="product.cost"
            placeholder="Nhập giá gốc"
          ></g-input>
        </div>
        <div class="t-flex t-items-center t-mt-[20px]">
          <label class="t-w-[120px]">Giá bán</label>
          <g-input
            v-model="product.retail_prices"
            class="t-flex-1"
            placeholder="Nhập giá bán"
          ></g-input>
        </div>
        <div class="t-flex t-mt-[20px]">
          <label class="t-w-[120px] t-mt-[10px]">Mô tả</label>
          <g-textarea
            v-model="product.description"
            style="min-height: 80px"
            class="t-flex-1"
            placeholder="Nhập mô tả sản phẩm"
          ></g-textarea>
        </div>
      </div>
      <div
        class="add-product-modal-property t-flex t-justify-between t-py-[20px]"
      >
        <div class="">
          <div class="t-flex t-items-center">
            <label class="t-w-[120px]">Đăc tính</label>
            <button
              class="t-bg-transparent t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-p-0 t-h-[32px] t-w-[150px] t-text-[16px] t-font-normal t-text-[#069255]"
            >
              Thêm đặc tính mới
            </button>
          </div>
          <div class="t-flex t-mt-[20px]">
            <g-select
              v-model:selectedItem="product.selectedProduct"
              :noBorder="true"
              :required="true"
              :data-source="handleGetCharacteristics"
              :loading="isFetchingProduct"
              inputId="productName"
              class="g-select-name-char t-flex-grow t-w-[100px] t-mr-[20px]"
              placeholder="Size/ Màu"
              type="suggestion"
              @on-selection-change="
                (item) => onProductSelectionChange(item, product)
              "
              @on-input-blur="onProductInputBlur(product)"
              @on-input-change="(value) => onProductInputChange(value, product)"
            ></g-select>
            <g-input
              class="t-w-[228px]"
              placeholder="+ Nhập giá trị đặc tính (S/M/...)"
            ></g-input>
            <button
              class="t-bg-transparent t-ml-[20px] t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-h-[32px] t-p-0 t-w-[50px] t-text-[16px] t-font-normal t-text-[#069255]"
            >
              Lưu
            </button>
          </div>
        </div>
        <div>
          <button
            class="t-bg-transparent t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-p-0 t-h-[32px] t-w-[70px] t-text-[16px] t-font-normal t-text-[#069255]"
            @click="handleOpenManageModal"
          >
            Quản lý
          </button>
        </div>
      </div>
      <div
        class="add-product-modal-action t-pt-[20px] t-flex t-justify-between t-items-center"
      >
        <button
          class="t-bg-transparent t-rounded-[5px] t-h-[40px] t-p-0 t-text-[16px] t-font-medium t-text-[#00904A] t-flex-1"
        >
          Xem trước
        </button>
        <button
          @click="addProduct"
          class="t-bg-[#00904A] t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-h-[40px] t-p-0 t-w-[464px] t-text-[16px] t-font-medium t-text-[#fff]"
        >
          Tạo sản phẩm
        </button>
      </div>
    </div>
  </a-modal>
  <manage-characteristics-modal
    :visible="visibleModal.manageModal"
    :setVisible="setVisibleModal('manageModal')"
  />
</template>

<script>
import { GInput } from "@/components";
import { GTextarea } from "@/components/elements";
import PlusIcon from "@/components/icons/PlusIcon";
import { mapState } from "vuex";
import { forEach } from "lodash";
import services from "@/services";
import wareHouseService from "@/services/warehouse.service";
import ManageCharacteristicsModal from "@/components/modal/WareHouseModal/ManageCharacteristicsModal";
import GSelect from "@/components/common/GSelect";
export default {
  components: {
    ManageCharacteristicsModal,
    PlusIcon,
    GInput,
    GSelect,
    GTextarea,
  },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    setVisible: Function,
  },
  data() {
    return {
      product: {
        code: "",
        name: "",
        weight: 0,
        cost: 0,
        retail_prices: 0,
        images: [],
        weightData: [],
        characteristics: [{ id: 0, value_ids: [] }],
        description: "",
        properties: [{ property_id: 0, value: "" }],
        tags: {},
        images_file: [],
        listCharacteristics: [],
      },
      validate: {
        product_name: "123",
        product_cost: "",
        product_price: "",
      },
      visibleModal: {
        manageModal: false,
      },
    };
  },
  computed: {
    ...mapState({
      productCategories: (state) => state.warehouse.productCategories,
      weightDataSource: (state) => state.global.weightDataSource,
      characteristics: (state) => state.warehouse.productCharacteristics,
    }),
    formattedProductCategories() {
      return this.productCategories.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    },
    handleGetCharacteristics() {
      return this.characteristics.map((item) => {
        return {
          id: item.id,
          label: `${item.name} ${item.value}`,
        };
      });
    },
  },
  mounted() {
    if (!this.productCategories.length && this.visible) {
      this.$store.dispatch("warehouse/getProductCategories");
    }
    if (!this.characteristics.length && this.visible) {
      this.$store.dispatch("warehouse/getProductCharacteristics");
    }
    this.handleLimitWeight();
  },
  methods: {
    setVisibleModal(field) {
      return (value) => {
        this.visibleModal = {
          ...this.visibleModal,
          [field]: value,
        };
      };
    },
    handleCancel() {
      this.setVisible(false);
    },
    handleLimitWeight() {
      this.weightData = this.weightDataSource.filter((w) => {
        return w.value <= 20;
      });
    },
    handleOpenManageModal() {
      this.visibleModal.manageModal = true;
    },
    onSelectProductImage(e) {
      let files = e.target.files;
      if (files.length === 0) {
        return false;
      }
      const self = this;
      if (files.length > 0) {
        for (let f = 0; f < files.length; f++) {
          const file = files[f];
          this.product.images.push(file);
          const reader = new FileReader();
          reader.onload = function (evt) {
            self.product.images_file.push(evt.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
    },

    selectImage(image) {
      this.$refs[image].click();
    },

    removeFile(index) {
      this.product?.images.splice(index, 1);
      this.product?.images_file.splice(index, 1);
    },

    addProduct() {
      this.uploadImage();
      this.uploadImageCs();
    },

    async uploadImage() {
      let data = new FormData();
      forEach(this.product.images, (image) => {
        data.append("content", "productImage");
        data.append("object", "product");
        data.append("files[]", image);
      });
      let result = await services.$package.uploadImage(data);
      if (result && result.success) {
        console.log("uploaded", result);
      }
    },
    async uploadImageCs() {
      if (this.product.images) {
        try {
          const response = await wareHouseService.uploadImageCs(
            this.product.images
          );
          if (response.data.success) {
            console.log(response.data.success);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  watch: {
    visible: function (newVal) {
      console.log(newVal);
      if (!this.productCategories.length && newVal) {
        this.$store.dispatch("warehouse/getProductCategories");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-product-modal {
  .add-product-modal-detail,
  .add-product-modal-img,
  .add-product-modal-property {
    border-bottom: 1px solid #e0e0e0;
  }
  .select-image__wrapper {
    width: 80px;
    height: 80px;
    border: 1px dashed #069255;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #069255;
    cursor: pointer;
  }
  .product-image {
    width: 80px;
    height: 80px;
  }
}
</style>

<style lang="scss">
.add-product-modal {
  .g-input__wrapper {
    .outerError {
      position: absolute;
      bottom: -20px;
      font-size: 13px;
    }
  }
  .g-select-name-char {
    .input__wrapper {
      border-bottom: 1px solid #c4c4c4;
    }
    .list__wrapper {
      min-width: 367px !important;
    }
  }
  .ant-modal-content {
    border-radius: 13px 13px 12px 12px;
    .ant-modal-header {
      padding: 11px 24px;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    }
  }
  .ant-input:focus {
    border-color: #d9d9d9;
    box-shadow: none;
  }
  .ant-input:hover {
    border-color: #d9d9d9;
    box-shadow: none;
  }
  .ant-modal-body {
    padding: 12px;
  }
}
</style>
