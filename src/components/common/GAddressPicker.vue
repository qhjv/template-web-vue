<template>
  <div class="address-picker__wrapper">
    <g-select
      v-model:selected-item="selectedHamlet"
      :dataSource="listHamlet"
      :inputSize="50"
      inputJustify="center"
      searchInputPlaceholder="Nhập để tìm kiếm địa chỉ đặc biệt (Tòa nhà/Hẻm/Đường)"
      placeholder="Tòa nhà/Hẻm/Đường"
      :error-message="error.selectedHamletError"
      @on-selection-change="onHamletSelectionChange"
    ></g-select>
    <g-select
      v-model:selected-item="selectedWard"
      placeholder="Phường/Xã"
      :dataSource="listWard"
      inputJustify="center"
      :error-message="error.selectedWardError"
      @on-selection-change="onWardSelectionChange"
    ></g-select>
    <g-select
      v-model:selected-item="selectedDistrict"
      placeholder="Quận/Huyện"
      :dataSource="listDistrict"
      inputJustify="center"
      :error-message="error.selectedDistrictError"
      @on-selection-change="onDistrictSelectionChange"
    ></g-select>
    <g-select
      v-model:selected-item="selectedProvince"
      placeholder="Tỉnh/TP"
      :dataSource="listProvince"
      inputJustify="center"
      :error-message="error.selectedProvinceError"
      @on-selection-change="onProvinceSelectionChange"
    ></g-select>
  </div>
</template>

<script>
import GSelect from "@/components/common/GSelect";
import services from "@/services";
import { get, size } from "lodash";
import common from "@/utils/common";
import { ADDRESS_TYPE } from "@/contants";

export default {
  props: {
    selectedItem: Object,
    error: Object,
    isPick: {
      type: Boolean,
      default: false,
    },
  },
  components: { GSelect },
  computed: {
    listProvince() {
      return this.$store.getters["global/getProvinces"];
    },
  },
  mounted() {
    if (this.selectedItem) {
      this.selectedProvince = get(this.selectedItem, "selectedProvince", {});
      if (this.selectedProvince && this.selectedProvince.value) {
        this.onSearchAddress(
          this.selectedProvince.value,
          ADDRESS_TYPE.DISTRICT,
          "listDistrict"
        );
      }
      this.selectedDistrict = get(this.selectedItem, "selectedDistrict", {});
      if (this.selectedDistrict && this.selectedDistrict.value) {
        this.onSearchAddress(
          this.selectedDistrict.value,
          ADDRESS_TYPE.WARD,
          "listWard"
        );
      }
      this.selectedWard = get(this.selectedItem, "selectedWard", {});
      if (this.selectedWard && this.selectedWard.value) {
        this.onSearchAddress(
          this.selectedWard.value,
          ADDRESS_TYPE.STREET,
          "listHamlet"
        );
      }
      this.selectedHamlet = get(this.selectedItem, "selectedHamlet", {
        label: null,
        value: null,
      });
    }
  },
  data() {
    return {
      listDistrict: [],
      listHamlet: [{ label: "Khác", value: -1 }],
      listWard: [],
      selectedProvince: {},
      selectedDistrict: {},
      selectedWard: {},
      selectedHamlet: {},
    };
  },
  methods: {
    onHamletSelectionChange() {
      this.updateSelectedItem();
    },
    onProvinceSelectionChange(item) {
      this.selectedDistrict = {};
      this.selectedWard = {};
      this.selectedHamlet = {};
      this.listWard = [];
      this.listHamlet = [{ label: "Khác", value: -1 }];
      this.updateSelectedItem();
      if (item && item.value) {
        this.onSearchAddress(item.value, ADDRESS_TYPE.DISTRICT, "listDistrict");
      }
    },
    onDistrictSelectionChange(item) {
      this.selectedWard = {};
      this.selectedHamlet = {};
      this.listHamlet = [];
      this.updateSelectedItem();
      if (item && item.value) {
        this.onSearchAddress(item.value, ADDRESS_TYPE.WARD, "listWard");
      }
    },
    onWardSelectionChange(item) {
      this.updateSelectedItem();
      if (item && item.value) {
        this.onSearchAddress(item.value, ADDRESS_TYPE.STREET, "listHamlet");
      }
    },
    async onSearchAddress(parentId, type, dataSource) {
      let result;
      let isHamlet = false;
      if (type === ADDRESS_TYPE.STREET) {
        isHamlet = true;
        result = await services.$address.browseHamletAddress(
          parentId,
          this.isPick
        );
      } else {
        result = await services.$address.browseAddressList(parentId, type);
      }
      if (result && result.success) {
        let data = common.convertLabelValueDataSource({
          dataSource: get(
            result,
            isHamlet ? ["data", "hamlet_address"] : "data",
            []
          ),
          labelName: "name",
          valueName: "id",
        });
        if (size(data) === 0) {
          data = [{ label: "Khác", value: -1 }];
        } else if (dataSource === "listHamlet") {
          data.push({ label: "Khác", value: -1 });
        }
        this[dataSource] = data;
      }
    },
    updateSelectedItem() {
      let value = {
        selectedProvince: this.selectedProvince,
        selectedDistrict: this.selectedDistrict,
        selectedWard: this.selectedWard,
        selectedHamlet: this.selectedHamlet,
      };
      this.$emit("update:selectedItem", value);
      this.$emit("onChange", value);
    },
  },
};
</script>
<style lang="scss" scoped>
.address-picker__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.75em;
}
</style>
