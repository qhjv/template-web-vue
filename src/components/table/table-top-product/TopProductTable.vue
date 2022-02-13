<template>
  <div class="top-product-wrapper">
    <table class="w-100 g-table">
      <thead>
        <tr>
          <th class="medium-text t-w-[600px]">Sản phẩm</th>
          <th class="medium-text t-text-right">Tương tác</th>
          <th class="medium-text t-text-right">Đặt mua</th>
          <th class="medium-text t-text-right">Đã bán</th>
          <th class="medium-text t-text-right">Đã hoàn</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in topProductList" :key="index">
          <td class="top-product-item t-flex t-items-center t-h-24">
            <div class="ranking t-w-[80px] t-h-[42px] t-text-center">
              <h1
                :class="
                  typeActive === 'top_selling'
                    ? 't-mb-1 rank-red'
                    : 't-mb-1 rank-green'
                "
              >
                <b class="ranking-number t-pr-2 t-pb-4">{{ index + 1 }}</b>
              </h1>
            </div>
            <div class="top-product-item__img t-w-[64px] t-h-[64px] t-bg-white">
              <img class="t-w-full" src="@/assets/images/default_product.svg" />
            </div>
            <span class="top-product-item__name t-pl-4">{{
              product.product_name
            }}</span>
          </td>
          <td class="top-product-item-interactive t-text-right">
            <div>
              <div class="top-product-item__number">
                {{ convertPickMoneyFunction(product.TTNumber) || "" }}
              </div>
              <div class="top-product-item__plus">
                + {{ product.TTNumber_plus }}
              </div>
            </div>
          </td>
          <td class="top-product-item-order t-text-right">
            <div class="top-product-item__number">
              {{ convertPickMoneyFunction(product.OrderNumber) }}
            </div>
            <div class="top-product-item__plus">
              + {{ product.OrderNumber_plus }}
            </div>
          </td>
          <td class="top-product-item-export t-text-right">
            <div class="top-product-item__number">
              {{ convertPickMoneyFunction(product.SellingNumber) }}
            </div>
            <div class="top-product-item__plus">
              + {{ product.SellingNumber_plus }}
            </div>
          </td>
          <td class="top-product-item-order t-text-right">
            <div class="top-product-item__number">
              {{ convertPickMoneyFunction(product.GetBackNumber) }}
            </div>
            <div class="top-product-item__plus">
              + {{ product.GetBackNumber_plus }}
            </div>
          </td>
        </tr>
        <tr v-if="topProductList.length === 0">
          <div class="t-w-full t-m-auto t-absolute t-top-1/2 t-text-center">
            <p>Đang cập nhật dữ liệu</p>
          </div>
        </tr>
      </tbody>
    </table>
    <div
      class="pagination-wrapper flex align-items-center justify-content-space-between t-px-[15px]"
    >
      <div>
        <span class="description-limit">Số lượng bản ghi/trang</span>
        <g-select
          class="page-limit"
          :value="limit.toString()"
          :default-active-first-option="false"
          @change="onChangeLimit"
        >
          <a-select-option value="25">25</a-select-option>
          <a-select-option value="50">50</a-select-option>
          <a-select-option value="100">100</a-select-option>
        </g-select>
        Trang {{ page }}/{{ totalPages }}
        <g-button
          :disabled="page === 1"
          class="ml btn-prev-page"
          @click="changePage(page - 1)"
        >
          <span>Trang trước</span>
        </g-button>
        <g-button
          :disabled="page === totalPages"
          class="ml btn-next-page"
          @click="changePage(page + 1)"
        >
          <span>Trang sau</span>
        </g-button>
      </div>
      <div class="actions-wrapper">
        <button
          @click="ahih"
          class="button-add t-bg-transparent t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-py-[5px] t-px-[42px] t-text-[16px] t-font-medium t-text-[#069255]"
        >
          Xóa SP đã chọn
        </button>
        <g-multiselect placement="topRight">
          <template #contentDropdown>
            <g-button
              id="btn-export-excel"
              class="primary ml t-rounded-[5px] t-py-[7px] t-px-[40px] t-bg-[#00904A] t-text-[#fff] t-ml-[15px] t-font-medium"
            >
              Thao tác
            </g-button>
          </template>
          <template #contentOption>
            <div class="list-request-wrapper">
              <div
                class="request-item primary-text t-flex t-items-center"
                @click="openModal(true)"
              >
                <svg
                  class="t-mr-[5px] t-mb-[2px]"
                  width="18"
                  height="20"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5003 9.83341L8.16699 6.50008V9.00008H0.666992V10.6667H8.16699V13.1667L11.5003 9.83341ZM17.3337 9.00008H15.667V16.5001H2.33366V12.3334H4.00033V14.8334H14.0003V8.16675L9.00033 3.16675L4.83366 7.33341H2.33366L9.00033 0.666748L17.3337 9.00008Z"
                    fill="#069255"
                  />
                </svg>
                Tạo phiếu nhập
              </div>
              <div
                class="request-item primary-text t-flex t-items-center"
                @click="openModal(false)"
              >
                <svg
                  class="t-mr-[5px] t-mb-[2px]"
                  width="20"
                  height="18"
                  viewBox="0 0 20 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 9.83342L16.6667 6.50008V9.00008H9.16667V10.6667H16.6667V13.1667L20 9.83342ZM15 12.3334V16.5001H1.66667V9.00008H0L8.33333 0.666748L15 7.33342H12.5L8.33333 3.16675L3.33333 8.16675V14.8334H13.3333V12.3334H15Z"
                    fill="#069255"
                  />
                </svg>
                Tạo phiếu xuất
              </div>
            </div>
          </template>
        </g-multiselect>
      </div>
    </div>
    <a-modal
      :visible="showModal"
      :footer="null"
      :closable="false"
      :centered="true"
      :width="561"
      class="confirmSubmitOrderModal"
      @cancel="showModal = false"
    >
      <template v-slot:title>
        <div class="t-flex t-flex-row t-items-center t-w-full">
          <h3 class="t-text-center t-text-white t-mb-0 t-flex-1 t-ml-12">
            {{ isImport ? "Tạo phiếu nhập" : "Tạo phiếu xuất" }}
          </h3>
          <span
            class="t-flex t-items-center t-justify-center t-text-white t-w-12 t-cursor-pointer btn-close-modal"
            @click="confirmCloseModal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8323 10.0001L19.6199 2.21215C20.1267 1.70557 20.1267 0.88651 19.6199 0.379933C19.1133 -0.126644 18.2943 -0.126644 17.7877 0.379933L9.99988 8.16793L2.21228 0.379933C1.70548 -0.126644 0.886669 -0.126644 0.380103 0.379933C-0.126701 0.88651 -0.126701 1.70557 0.380103 2.21215L8.1677 10.0001L0.380103 17.7881C-0.126701 18.2947 -0.126701 19.1138 0.380103 19.6204C0.632555 19.8731 0.964493 20 1.29619 20C1.62789 20 1.95959 19.8731 2.21228 19.6204L9.99988 11.8324L17.7877 19.6204C18.0404 19.8731 18.3721 20 18.7038 20C19.0355 20 19.3672 19.8731 19.6199 19.6204C20.1267 19.1138 20.1267 18.2947 19.6199 17.7881L11.8323 10.0001Z"
                fill="white"
              />
            </svg>
          </span>
        </div>
      </template>
      <import-export-product
        :isImport="this.isImport"
        @update:product="(data) => getDataFromImportExportProduct(data)"
      ></import-export-product>
    </a-modal>
  </div>
</template>

<script>
import GButton from "@/components/elements/button.vue";
import { GSelect } from "@/components/elements";
import GMultiselect from "@/components/base/Multiselect";
import ImportExportProduct from "@/pages/warehouse/ImportExportProduct";
export default {
  props: {
    typeActive: {
      type: String,
      default: "top_selling",
    },
    topProductList: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Number,
      default: 1,
    },
    packagesInPage: {
      type: Boolean,
      default: true,
    },
    handleChangePage: {
      type: Function,
    },
    handleChangeLimit: {
      type: Function,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 25,
    },
  },
  components: {
    GButton,
    GSelect,
    GMultiselect,
    ImportExportProduct,
  },
  mounted() {},
  computed: {
    // ...mapState({
    //   paging: (state) => state.warehouse.topProductList.paging.total,
    // }),
    // totalPages() {
    //   let total = this.paging;
    //   const limit = this.limit || 25;
    //
    //   if (total % limit === 0) return total / limit;
    //
    //   return Math.floor(total / this.limit) + 1;
    // },
  },
  data() {
    return {
      convertPickMoney: "",
      showModal: false,
      isImport: false,
    };
  },
  methods: {
    // ahih() {
    //   console.log(this.paging);
    // },
    getDataFromImportExportProduct() {
      this.showModal = false;
    },
    convertPickMoneyFunction(value) {
      if (value) {
        let seg = ".";
        let convertValue = value.toString();
        this.convertPickMoney = convertValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          seg
        );
      }
      return this.convertPickMoney;
    },

    confirmCloseModal() {
      this.showModal = false;
    },

    openModal(isImport) {
      const btn = document.getElementById("btn-export-excel");
      if (btn) btn.click();
      this.showModal = true;
      this.isImport = isImport;
    },
    changePage(page) {
      this.handleChangePage(page);
      console.log(this.page, page);
    },
    onChangeLimit(_limit) {
      this.handleChangePage(1);
      this.handleChangeLimit(_limit);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-product-wrapper {
  height: calc(100vh - 280px);
  overflow-y: auto;
  .top-product-item__number {
    font-size: 16px;
    line-height: 20px;
  }
  .top-product-item__plus {
    font-size: 14px;
    line-height: 20px;
    color: #00904a;
  }

  .rank-green {
    -webkit-text-stroke-color: #069255;
  }
  .ranking-number {
    font-family: Roboto;
    font-style: normal;
    color: #fff;
    -webkit-text-stroke-width: 2px;
    flex: none;
    order: 0;
    flex-grow: 0;
    font-size: 40px;
    line-height: 40px;
  }
  .rank-red {
    -webkit-text-stroke-color: #eb5757;
  }
  .pagination-wrapper {
    background-color: #ffffff;
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
    @media only screen and (min-width: 1600px) {
      .description-limit {
        display: inline-block;
        margin-right: 0.5rem !important;
      }
    }
  }
  #btn-export-excel {
    height: 40px;
    width: 140px;
    font-size: 16px;
    font-weight: 500;
  }
}
</style>
