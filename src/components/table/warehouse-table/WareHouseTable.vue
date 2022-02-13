<template>
  <div class="warehouse-table-wrapper">
    <table class="w-100 g-table">
      <thead class="t-sticky t-top-0 t-z-10">
        <tr>
          <th class="medium-text">Tên sản phẩm</th>
          <th class="medium-text t-text-right">Tương tác</th>
          <th class="medium-text t-text-right">Đặt mua</th>
          <th class="medium-text t-text-right">Đã xuất</th>
          <th class="medium-text t-text-right">Đã bán</th>
          <th class="medium-text t-text-right">Hoàn hàng</th>
          <th class="medium-text t-text-right">Tồn</th>
          <th class="medium-text t-text-right">Doanh thu</th>
          <th class="action-col medium-text t-text-center">
            <g-checkbox
              :disabled="!products?.length"
              :checked="isSelectedAll"
              @change="handleChangeCheckedAll"
              >Chọn tất cả</g-checkbox
            >
          </th>
        </tr>
      </thead>
      <tbody class="t-align-top">
        <tr v-for="product in products" :key="product.id">
          <td class="warehouse-table-product t-max-w-[320px] t-w-[320px]">
            <span
              class="warehouse-table-product__name t-whitespace-normal t-break-words"
              >{{ product.product_name }}</span
            >
            <div class="warehouse-table-product__price t-text-[#EB5757]">
              {{ product.price }}
            </div>
            <div
              class="warehouse-table-product__img t-w-[72px] t-h-[76px] t-mt-[5px]"
            >
              <div
                class="image-default t-h-full t-w-full t-bg-no-repeat t-bg-center"
                :style="{
                  backgroundImage: `url(${orderDefaultImage}`,
                }"
              ></div>
            </div>
            <div
              class="warehouse-table-product__note t-mt-[5px]"
              v-if="product.note"
            >
              #{{ product.note }}
            </div>
          </td>
          <td class="warehouse-table-interactive t-text-right">
            <div>
              <div class="warehouse-table__number">
                {{ product?.total_interactive || "" }}
              </div>
              <div
                class="warehouse-table__plus t-text-[#069255] t-text-[15px] t-mt-[5px]"
                v-if="product?.inventory?.number"
              >
                +{{ product?.interactive?.plus }}
              </div>
            </div>
          </td>
          <td class="warehouse-table-order t-text-right">
            <div class="warehouse-table__number">
              {{ product?.total_order }}
            </div>
            <div
              class="warehouse-table__plus t-text-[#069255] t-text-[15px] t-mt-[5px]"
              v-if="product?.inventory?.number"
            >
              +{{ product?.inventory?.number }}
            </div>
          </td>
          <td class="warehouse-table-export t-text-right">
            <div class="warehouse-table__number">
              {{ product.inventory?.number ? product.inventory?.number : 0 }}
            </div>
          </td>
          <td class="warehouse-table-sell t-text-right">
            <div class="warehouse-table__number">
              {{ product.total_sell }}
            </div>
            <div
              class="warehouse-table__plus t-text-[#069255] t-text-[15px] t-mt-[5px]"
              v-if="product.inventory?.number"
            >
              +{{ product.inventory?.number }}
            </div>
          </td>
          <td class="warehouse-table-refund t-text-right">
            <div class="warehouse-table__number">
              {{ product.inventory?.number ? product.inventory?.number : 0 }}
            </div>
          </td>
          <td class="warehouse-table-inventory t-text-right">
            <div class="warehouse-table__number">
              {{ product.inventory?.number ? product.inventory?.number : 0 }}
            </div>
          </td>
          <td class="warehouse-table-turnover t-text-right">
            <div class="warehouse-table__number">
              {{ product.inventory?.number ? product.inventory?.number : 0 }}
            </div>
          </td>
          <td class="warehouse-table-action t-w-[140px]">
            <button
              class="t-rounded-full t-border-solid t-bg-transparent t-border-[#069255] t-border-[1.7px] w-100 mb medium-text t-h-[32px] t-p-0 t-text-[#069255]"
              @click="handleClickDetailProduct(product)"
            >
              Xem
            </button>
            <button
              class="t-rounded-full t-border-solid t-bg-transparent t-border-[#DA4838] t-border-[1.7px] w-100 mb medium-text t-h-[32px] t-p-0 t-text-[#DA4838]"
              @click="handleClickDeleteProduct(product)"
            >
              Xóa
            </button>
            <g-checkbox
              :checked="selectedProductIds.includes(product.product_id)"
              @change="handleToggleProduct(product)"
            >
              <span class="primary-text medium-text">
                {{
                  selectedProductIds.includes(product.product_id)
                    ? "Bỏ chọn SP"
                    : "Chọn SP"
                }}</span
              >
            </g-checkbox>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="12">
            <a-empty :description="'Danh sách trống'" />
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="pagination-wrapper flex align-items-center justify-content-space-between t-px-[15px]"
    >
      <div>
        <span class="description-limit">Số lượng bản ghi/trang</span>
        <g-select
          :disabled="loading"
          class="page-limit"
          :value="page_size.toString()"
          :default-active-first-option="false"
          @change="onChangeLimit"
        >
          <a-select-option value="25">25</a-select-option>
          <a-select-option value="50">50</a-select-option>
          <a-select-option value="100">100</a-select-option>
        </g-select>
        Trang {{ products.length === 0 ? 0 : page }}/{{ totalPages }}
        <g-button
          :disabled="loading || page === 1"
          class="ml btn-prev-page"
          @click="changePage(page - 1)"
        >
          <span>Trang trước</span>
        </g-button>
        <g-button
          :disabled="loading || page === totalPages || products.length === 0"
          class="ml btn-next-page"
          @click="changePage(page + 1)"
        >
          <span>Trang sau</span>
        </g-button>
      </div>
      <div class="actions-wrapper">
        <button
          class="button-add t-bg-transparent t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-px-0 t-py-[4px] t-w-[200px] t-text-[16px] t-font-medium t-text-[#069255]"
          :class="selectedProductIds.length === 0 ? 'disabled' : ''"
          @click="handleDeleteMoreProduct"
        >
          Xóa
          {{
            selectedProductIds.length ? `${selectedProductIds.length} SP` : "SP"
          }}
          đã chọn
        </button>
        <g-multiselect placement="topRight">
          <template #contentDropdown>
            <g-button
              id="btn-warehouse-action"
              class="button-action primary ml t-py-[7px] t-px-[40px] t-px-[15px] t-h-[40px] t-cursor-pointer"
            >
              Thao tác
            </g-button>
          </template>
          <template #contentOption>
            <div class="product-request-wrapper">
              <div
                class="request-item primary-text t-flex t-items-center t-px-[15px] t-h-[40px] t-font-medium t-text-[16px] t-cursor-pointer"
                @click="handleClickExport"
              >
                <svg
                  class="t-mr-[5px] t-mb-[2px]"
                  width="20"
                  height="17"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 9.83342L16.6667 6.50008V9.00008H9.16667V10.6667H16.6667V13.1667L20 9.83342ZM15 12.3334V16.5001H1.66667V9.00008H0L8.33333 0.666748L15 7.33342H12.5L8.33333 3.16675L3.33333 8.16675V14.8334H13.3333V12.3334H15Z"
                    fill="#069255"
                  />
                </svg>
                Xuất
              </div>
              <div
                class="request-item primary-text t-flex t-items-center t-px-[15px] t-h-[40px] t-font-medium t-text-[16px] t-cursor-pointer"
                @click="handleClickImport"
              >
                <svg
                  class="t-mr-[5px] t-mb-[2px]"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5003 9.83341L8.16699 6.50008V9.00008H0.666992V10.6667H8.16699V13.1667L11.5003 9.83341ZM17.3337 9.00008H15.667V16.5001H2.33366V12.3334H4.00033V14.8334H14.0003V8.16675L9.00033 3.16675L4.83366 7.33341H2.33366L9.00033 0.666748L17.3337 9.00008Z"
                    fill="#069255"
                  />
                </svg>
                Nhập
              </div>
              <div
                class="request-item primary-text t-flex t-items-center t-px-[15px] t-h-[40px] t-font-medium t-text-[16px] t-cursor-pointer"
                @click="handleClickAdd"
              >
                <svg
                  class="t-mr-[5px] t-mb-[2px]"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0402 7.96025V0.666748H7.96049V7.96025H0.666992V10.0399H7.96049V17.3334H10.0402V10.0399H17.3337V7.96025H10.0402Z"
                    fill="#00904A"
                  />
                </svg>
                Tạo
              </div>
            </div>
          </template>
        </g-multiselect>
      </div>
    </div>
  </div>
  <add-product-modal
    :visible="visibleModal.addProduct"
    :setVisible="setVisibleModal('addProduct')"
  ></add-product-modal>
  <a-modal
    class="delete-product-modal-warehouse"
    :visible="visibleModal.deleteProduct"
    :footer="null"
    :centered="true"
    :width="500"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template v-slot:title>
      <div class="t-flex t-flex-row t-items-center t-w-full">
        <h3
          class="t-text-center t-text-white t-mb-0 t-text-[20px] t-font-medium"
          style="
            flex: 1;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          "
        >
          Xóa sản phẩm
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
    <div
      class="delete-product-modal-content t-text-center t-text-[20px] t-mb-[25px] t-mt-[10px]"
      style="
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      "
    >
      Bạn có chắc muốn xoá sản phẩm
      <span class="t-font-medium">{{ selectedProduct?.product_name }}</span> ?
    </div>
    <div class="delete-product-modal-action t-flex t-justify-around t-m-[10px]">
      <g-button
        size=""
        type="faded"
        class="faded t-h-[40px] t-w-[150px] t-text-[16px] t-font-medium"
        @click="handleCancel"
      >
        Hủy
      </g-button>
      <g-button
        size=""
        type="primary"
        class="primary t-h-[40px] t-w-[150px] t-text-[16px] t-font-medium"
        @click="handleClickDeleteConfirm"
      >
        Xóa
      </g-button>
    </div>
  </a-modal>
</template>

<script>
import { GSelect, GButton, GCheckbox } from "@/components/elements";
import GMultiselect from "@/components/base/Multiselect";
import AddProductModal from "@/components/modal/WareHouseModal/AddProductModal";
import { mapState } from "vuex";
import orderDefaultImage from "@/assets/images/default_product.svg";
import { message } from "ant-design-vue";
import warehouseService from "@/services/warehouse.service";

export default {
  components: { AddProductModal, GButton, GCheckbox, GSelect, GMultiselect },
  props: [
    "loading",
    "productsInPage",
    "handleChangePage",
    "handleChangeLimit",
    "totalPages",
    "loadData",
    "page",
    "page_size",
  ],
  data() {
    return {
      orderDefaultImage,
      selectedProduct: {},
      visibleModal: {
        addProduct: true,
        deleteProduct: false,
      },
      selectedProductIds: [],
    };
  },
  mounted() {},
  computed: {
    isSelectedAll() {
      if (!this.productsInPage?.length) return false;
      return this.selectedProductIds.length === this.productsInPage.length;
    },
    ...mapState({
      products: (state) => state.warehouse.productList.products,
    }),
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
    handleClickAdd() {
      const btn = document.getElementById("btn-warehouse-action");
      if (btn) btn.click();
      this.visibleModal.addProduct = true;
    },
    handleClickImport() {
      const btn = document.getElementById("btn-warehouse-action");
      if (btn) btn.click();
      alert("Nhập");
    },
    handleClickExport() {
      const btn = document.getElementById("btn-warehouse-action");
      if (btn) btn.click();
      alert("Xuất");
    },
    handleClickDetailProduct(product) {
      alert(product.name);
    },
    handleClickDeleteProduct(product) {
      this.selectedProduct = product;
      this.visibleModal.deleteProduct = true;
    },
    handleChangeCheckedAll(event) {
      const checked = event.target.checked;
      if (checked) {
        let updateIds = [];

        for (const p of this.productsInPage) {
          updateIds.push(p.id);
        }

        this.selectedProductIds = updateIds;
      } else {
        this.selectedProductIds = [];
      }
    },
    onChangeLimit(_limit) {
      this.handleChangeLimit(_limit);
    },
    changePage(page) {
      this.selectedProductIds = [];
      this.handleChangePage(page);
    },
    handleToggleProduct(product) {
      const isSelected = this.selectedProductIds.includes(product.product_id);
      this.selectedProductIds = isSelected
        ? this.selectedProductIds.filter((id) => id !== product.product_id)
        : this.selectedProductIds.concat(product.product_id);
    },
    handleDeleteMoreProduct() {
      if (this.selectedProductIds.length !== 0) {
        alert("xoa nhieu");
      }
    },
    handleCancel() {
      this.visibleModal.deleteProduct = false;
    },
    async handleClickDeleteConfirm() {
      if (this.selectedProduct) {
        try {
          const response = await warehouseService.deleteProduct(
            this.selectedProduct.product_id
          );
          if (response.data.success) {
            this.visibleModal.deleteProduct = false;
            message.success(response.data.message);
            this.$emit("loadData", true);
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          this.visibleModal.deleteProduct = false;
          message.error("Đã có lỗi xảy ra vui lòng thử lại sau. ");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.warehouse-table-wrapper {
  height: calc(100vh - 280px);
  overflow-y: auto;
  .disabled {
    border-color: #bdbdbd;
    color: #bdbdbd;
    cursor: not-allowed;
  }
  table {
  }
  .text-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .pagination-wrapper {
    background: #fff;
    height: 60px;
    border: 1px solid var(--grayColor);
    width: calc(100% - 30px);
    position: absolute;
    bottom: 0;
    .description-limit {
      display: none;
    }
    .g-select.page-limit {
      width: 70px;
    }
    .actions-wrapper {
      .button-action {
        padding: 0 40px;
        height: 38px;
      }
    }
    @media only screen and (min-width: 1600px) {
      .description-limit {
        display: inline-block;
        margin-right: 0.5rem !important;
      }
    }
  }
}
.product-request-wrapper {
  .request-item + .request-item {
    border-top: 1px solid #e7e7e7;
  }
}
</style>

<style lang="scss">
.delete-product-modal-warehouse {
  .delete-product-modal-action {
    .ant-btn {
      height: 40px;
      font-weight: 500;
    }
  }
}
</style>
