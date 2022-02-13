<template>
  <div>
    <div class="t-flex t-flex-wrap t-gap-[10px]">
      <g-input
        class="t-w-[100px]"
        placeholder="Size/ Màu"
        v-model="characteristicUpdateData.name"
        :outer-error-message="validate.characteristic_name"
      ></g-input>
      <div class="t-flex t-justify-center t-items-center">
        <button
          class="t-relative button-toggle-characteristic t-h-[28px] t-py-[4px] t-px-[10px] t-rounded-[5px] t-flex t-justify-center t-items-center t-bg-[#069255] t-text-[#fff]"
          v-for="charValue in characteristicUpdateData.values"
          :key="charValue"
          @click="deleteValueCharacteristic(charValue)"
        >
          {{ charValue.value }}
        </button>
      </div>
      <g-input
        class="t-w-[228px]"
        placeholder="+ Nhập giá trị đặc tính (S/M/...)"
        v-model="characteristicValue"
        :outer-error-message="validate.characteristic_value"
        @keyup.enter="handleAddValueCharacteristic"
      ></g-input>
      <button
        v-show="buttonAddValue && !disabledButton.add"
        class="t-bg-transparent t-bg-[#069255] t-h-[32px] t-p-0 t-w-[30px] t-h-[25px] t-text-[16px] t-font-normal t-text-[#fff] t-rounded-[5px]"
        @click="handleAddValueCharacteristic"
      >
        +
      </button>
      <button
        :class="disabledButton.save ? 'disabled' : ''"
        class="t-bg-transparent t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-h-[32px] t-p-0 t-w-[50px] t-text-[16px] t-font-normal t-text-[#069255]"
        @click="handleAddCharacteristic"
      >
        Lưu
      </button>
    </div>
    <div
      class="update-characteristic-actions t-mt-[20px] t-flex t-items-center t-justify-end"
    >
      <button
        class="t-bg-transparent t-mr-[15px] t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#DA4838] t-h-[32px] t-p-0 t-w-[106px] t-text-[16px] t-font-normal t-text-[#DA4838]"
        @click="handleDeleteUpdateCharacteristic(characteristicUpdateData.id)"
      >
        Xóa đặc tính
      </button>
      <button
        class="t-bg-[#00904A] t-rounded-[5px] t-border-[2px] t-border-solid t-border-[#069255] t-h-[32px] t-p-0 t-w-[105px] t-text-[16px] t-font-medium t-text-[#fff]"
        @click="handleSaveUpdateCharacteristic(characteristicUpdateData.id)"
      >
        Lưu đặc tính
      </button>
    </div>
  </div>
</template>

<script>
import { GInput } from "@/components";
// import { v4 as uuidv4 } from "uuid";

export default {
  components: { GInput },
  props: ["characteristicUpdate", "toggleModalUpdate"],
  data() {
    return {
      characteristicValue: "",
      characteristicUpdateData: {},
      arrayValueCharacteristic: [],
      arrayValueCharacteristicCheck: [],
      validate: {
        characteristic_name: "",
        characteristic_value: "",
      },
      buttonAddValue: false,
      disabledButton: {
        add: false,
        save: true,
      },
    };
  },
  mounted() {
    this.characteristicUpdateData = {
      name: this.characteristicUpdate.name || "",
      id: this.characteristicUpdate.id || null,
      values: this.characteristicUpdate.values || [],
    };
  },
  computed: {},
  methods: {
    handleDeleteUpdateCharacteristic(id) {
      if (id) {
        this.$store.dispatch("warehouse/deleteProductCharacteristics", {
          id,
          is_delete: true,
        });
        this.$emit("toggleModalUpdate", true);
      }
    },
    handleSaveUpdateCharacteristic(id) {
      console.log(id);
      const newCharacteristicUpdateData =
        this.characteristicUpdateData.values.map((val) => {
          return {
            id: val.id_value,
            value: val.value,
          };
        });
      this.$store.dispatch("warehouse/updateProductCharacteristics", {
        id: id,
        name: this.characteristicUpdateData.name,
        values: newCharacteristicUpdateData,
      });
      this.$store.dispatch("warehouse/getProductCategories");
      this.$emit("toggleModalUpdate", true);
    },
    handleAddValueCharacteristic() {
      if (this.characteristicValue) {
        this.characteristicUpdateData.values.push({
          value: this.characteristicValue,
        });
        this.arrayValueCharacteristicCheck.push(this.characteristicValue);
        this.characteristicValue = "";
      }
    },
    handleValidate() {
      let isValid = true;
      this.validate.characteristic_value = "";
      this.validate.characteristic_name = "";
      if (!this.characteristicValue.name && !this.disabledButton.save) {
        this.validate.characteristic_name = "Nhập tên đặc tính";
        isValid = false;
      }
      if (
        this.arrayValueCharacteristic.length === 0 &&
        !this.disabledButton.save
      ) {
        this.validate.characteristic_value = "Nhập giá trị đặc tính";
        isValid = false;
      }

      return isValid;
    },
    deleteValueCharacteristic(value) {
      console.log(value);
      if (value) {
        this.characteristicUpdateData.values =
          this.characteristicUpdateData.values.filter((val) => {
            return val.id_value !== value.id_value;
          });
      }
    },
    handleAddCharacteristic() {
      this.handleValidate();
      // if (this.handleValidate() === true && !this.disabledButton.save) {
      //   this.$store.dispatch("warehouse/addProductCharacteristics", {
      // 	  name: this.characteristicValue.name,
      // 	  values: this.arrayValueCharacteristic,
      //   });
      //   this.characteristicValue.name = "";
      //   this.characteristicValue.value = "";
      //   this.arrayValueCharacteristic = [];
      //   this.arrayValueCharacteristicCheck = [];
      // }
    },
    checkValueCharacteristic() {
      if (this.characteristicValue && this.characteristicValue.length <= 10) {
        this.arrayValueCharacteristicCheck.includes(this.characteristicValue)
          ? (this.validate.characteristic_value = "Trùng với giá trị trước đó")
          : (this.validate.characteristic_value = "");
        this.arrayValueCharacteristicCheck.includes(this.characteristicValue)
          ? (this.disabledButton.add = true)
          : (this.disabledButton.add = false);
      } else if (
        this.characteristicValue &&
        this.characteristicValue.length > 10
      ) {
        this.characteristicValue.length > 10
          ? (this.validate.characteristic_value = "Nhỏ hơn 10 ký tụ")
          : (this.validate.characteristic_value = "");
        this.characteristicValue.length > 10
          ? (this.disabledButton.add = true)
          : (this.disabledButton.add = false);
      }
    },
  },
  watch: {
    // characteristicUpdate: function () {
    //   this.characteristicUpdateData = {
    //     name: this.characteristicUpdate.name || "",
    //     id: this.characteristicUpdate.id || null,
    //     values: this.characteristicUpdate.values || [],
    //   };
    // },
    characteristicValue: function () {
      this.characteristicValue
        ? (this.buttonAddValue = true)
        : (this.buttonAddValue = false);
      this.checkValueCharacteristic();
    },
    "characteristicUpdateData.name": {
      handler() {
        this.checkValueCharacteristic();
        this.characteristicUpdateData.name.length > 10
          ? (this.validate.characteristic_name = "Nhỏ hơn 10 ký tụ")
          : (this.validate.characteristic_name = "");
        this.characteristicUpdateData.name &&
        this.characteristicUpdateData.name.length <= 10 &&
        this.characteristicUpdateData.values.length !== 0
          ? (this.disabledButton.save = false)
          : (this.disabledButton.save = true);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.manage-characteristics-modal {
  .update-characteristic {
    display: none;
    transition: 0.3s;
  }
  .modalActive {
    display: block;
  }
  .itemActive {
    display: none;
  }
  .overlay {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: calc(100% - 30px);
    z-index: 1;
  }
  .disabled {
    border-color: #bdbdbd;
    color: #bdbdbd;
    cursor: not-allowed;
  }
  .list-characteristic + .list-characteristic {
    border-top: 1px solid #e0e0e0;
  }
  .list-characteristic {
    .characteristic-p {
      margin-left: 3px;
    }
  }
  .button-toggle-characteristic + .button-toggle-characteristic {
    margin-left: 10px;
  }
}
</style>

<style lang="scss"></style>
