<template>
  <div class="t-mt-5">
    <table class="w-100 g-table">
      <thead>
        <tr>
          <th style="width: 320px" class="medium-text">Thông tin hóa đơn</th>
          <th style="width: 210px" class="medium-text">Thời gian</th>
          <th style="width: 320px" class="product-col medium-text">
            Trạng thái
          </th>
          <th style="width: 210px" class="medium-text">
            Tổng tiền<br />trước thuế
          </th>
          <th style="width: 332px" class="medium-text">Thuế</th>
          <th style="width: 332px" class="medium-text">
            Tổng tiền<br />sau thuế
          </th>
          <th style="width: 150px" class="action-col medium-text">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in vatBillData" :key="bill.id">
          <td style="max-width: 280px">
            <span class="t-font-bolds medium-text t-text-blacks">
              {{ bill.sid }} </span
            ><br />
            <span class="t-text-blacks t-leading-loose t-py-1">
              Phương thức thanh toán: {{ bill.payment_method }}
            </span>
          </td>
          <td>
            <span class="t-text-blacks t-font-bolds t-text-md">
              {{ $filters.timestampToDate(bill.from) }}<br />
              đến {{ $filters.timestampToDate(bill.to) }}
            </span>
          </td>
          <td>
            <span class="t-text-blacks t-font-bolds t-text-md t-float-left">
              {{ vatStatusValue(bill.status) }}
            </span>
          </td>
          <td>
            <span class="t-text-blacks t-font-bolds t-text-md t-float-left">
              {{ $filters.numberFormatter(bill.amount) || 0 }}
            </span>
          </td>
          <td>
            <span class="t-text-blacks t-font-bolds t-text-md t-float-left">
              {{ $filters.numberFormatter(bill.vat_amount) || 0 }}
            </span>
          </td>
          <td>
            <span class="t-text-blacks t-font-bolds t-text-md t-float-left">
              {{ $filters.numberFormatter(bill.total) || 0 }}
            </span>
          </td>
          <td>
            <g-button
              class="rounded w-100 mb"
              @click="openDetailModal(bill.id)"
            >
              <span class="medium-text">Xem chi tiết</span>
            </g-button>
            <g-button class="rounded w-100 mb" @click="exportData(bill.ar_url)">
              <span class="medium-text">Xuất bảng kê</span>
            </g-button>
            <g-button class="rounded w-100" @click="viewPdf(bill.id)">
              <span class="medium-text">Xem hóa đơn</span>
            </g-button>
          </td>
        </tr>
        <tr v-if="vatBillData.length === 0">
          <td colspan="7">
            <a-empty :description="'Danh sách trống'" />
          </td>
        </tr>
      </tbody>
    </table>
    <detail-vat-modal
      :visible="visibleModal"
      :setVisible="setVisibleModal"
      :bill-id="billId"
      :key="billId"
    />
  </div>
</template>

<script>
import GButton from "@/components/elements/button.vue";
import DetailVatModal from "@/components/modal/DetailVatModal.vue";
import { mapState } from "vuex";

export default {
  name: "FinanceTable",
  props: {
    vatBillData: Array,
  },
  components: {
    GButton,
    DetailVatModal,
  },

  data() {
    return {
      visibleModal: false,
      showPdf: false,
      billId: "",
    };
  },

  methods: {
    setVisibleModal(_visible) {
      this.visibleModal = _visible;
    },
    setVisiblePdfModal(_visible) {
      this.showPdf = _visible;
    },
    openDetailModal(billId) {
      this.billId = billId;
      this.visibleModal = true;
    },
    exportData(url) {
      window.open(url, "_blank");
    },
    getInvoicePdf(url) {
      window.open(url, "_blank");
    },
    vatStatusValue(key) {
      let status = this.vatBillStatus.find((item) => item.key === key);
      return status ? status.title : key;
    },
    viewPdf(billId) {
      let routeData = this.$router.resolve({
        name: "chi-tiet-hoa-don",
        params: { id: billId },
      });
      console.log(routeData);
      window.open(routeData.href, "_blank");
      // this.billId = billId;
      // this.showPdf = true;
    },
  },
  computed: {
    ...mapState({
      vatBillStatus: (state) => state.finance.vatBillStatus,
    }),
  },
};
</script>

<style scoped></style>
