<template>
  <a-modal
    class="manage-characteristics-modal"
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
          Quản lý đặc tính
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
      <div class="manage-characteristics-modal-content">
        <div>
          <p class="t-text-[16px] t-font-medium t-m-0">Thêm đặc tính mới</p>
          <div class="t-flex t-mt-[15px] t-flex-wrap t-gap-[10px]">
            <g-input
              class="t-w-[100px]"
              placeholder="Size/ Màu"
              v-model="characteristicValue.name"
              :outer-error-message="validate.characteristic_name"
            ></g-input>
            <div class="t-flex t-justify-center t-items-center">
              <button
                class="t-relative button-toggle-characteristic t-h-[28px] t-py-[4px] t-px-[10px] t-rounded-[5px] t-flex t-justify-center t-items-center t-bg-[#069255] t-text-[#fff]"
                v-for="value in arrayValueCharacteristic"
                :key="value"
                @click="deleteValueCharacteristic(value)"
              >
                {{ value.value }}
                <!--                <span-->
                <!--                  class="t-absolute t-top-0 t-right-0 t-bg-[#C4C4C4] t-rounded-full"-->
                <!--                  >x</span-->
              </button>
            </div>
            <g-input
              class="t-w-[228px]"
              placeholder="+ Nhập giá trị đặc tính (S/M/...)"
              v-model="characteristicValue.value"
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
        </div>
        <div
          class="list-characteristics t-mt-[20px] t-relative"
          :class="characteristics.length !== 0 ? '' : 't-h-[200px]'"
        >
          <p class="t-text-[16px] t-font-medium t-m-0">Danh sách đặc tính</p>
          <div
            class="overlay"
            v-if="loadingSpin || characteristics?.length === 0"
          >
            <a-spin :spinning="loadingSpin || characteristics?.length === 0" />
          </div>
          <div>
            <div
              class="list-characteristic t-flex t-flex-col t-py-[15px]"
              v-for="characteristic in characteristics"
              :key="characteristic.id"
            >
              <div
                class="t-flex t-items-center t-justify-between"
                :class="{ itemActive: activeItem === characteristic.id }"
              >
                <div class="t-flex t-items-center">
                  <p class="t-m-0">
                    {{
                      characteristic.name ? characteristic.name : "Không tên"
                    }}:
                  </p>
                  <div class="t-flex t-items-center t-ml-[5px]">
                    <p
                      class="characteristic-p t-m-0"
                      v-for="char in characteristic.values"
                      :key="char.id"
                    >
                      {{ char.value }},
                    </p>
                  </div>
                </div>
                <div
                  class="t-flex t-cursor-pointer"
                  @click="toggleModalUpadte(characteristic)"
                >
                  <svg
                    width="18px"
                    height="18px"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.76172 9.99463L9.79533 14.3869L20.5516 3.40625"
                      stroke="#069255"
                      stroke-width="1.8"
                      stroke-linecap="square"
                    />
                    <path
                      d="M13 1.5H2.2C1.53726 1.5 1 2.03726 1 2.7V20.3C1 20.9627 1.53726 21.5 2.2 21.5H19.8C20.4627 21.5 21 20.9627 21 20.3V9.5"
                      stroke="#069255"
                      stroke-width="1.8"
                    />
                  </svg>
                </div>
              </div>
              <transition name="bounce">
                <div
                  v-if="activeItem"
                  :class="{ modalActive: activeItem === characteristic.id }"
                  class="update-characteristic t-py-[20px]"
                >
                  <update-characteristics-modal
                    :characteristicUpdate="characteristic"
                    :key="characteristic.id"
                    @toggleModalUpdate="toggleModalUpdate"
                  ></update-characteristics-modal>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { GInput } from "@/components";
import { v4 as uuidv4 } from "uuid";
import UpdateCharacteristicsModal from "@/components/modal/WareHouseModal/UpdateCharacteristicsModal";
import { mapState } from "vuex";
export default {
  components: { UpdateCharacteristicsModal, GInput },
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    setVisible: Function,
  },
  mounted() {},
  computed: {
    ...mapState({
      characteristics: (state) => state.warehouse.productCharacteristics,
    }),
  },
  data() {
    return {
      loadingSpin: false,
      activeItem: null,
      characteristicValue: {
        name: "",
        value: "",
      },
      arrayValueCharacteristic: [],
      arrayValueCharacteristicCheck: [],
      buttonAddValue: false,
      validate: {
        characteristic_name: "",
        characteristic_value: "",
      },
      disabledButton: {
        add: false,
        save: true,
      },
    };
  },
  methods: {
    handleCancel() {
      this.handleResetValue();
      this.setVisible(false);
    },
    handleAddCharacteristic() {
      this.handleValidate();
      if (this.handleValidate() === true && !this.disabledButton.save) {
        this.$store.dispatch("warehouse/addProductCharacteristics", {
          name: this.characteristicValue.name,
          values: this.arrayValueCharacteristic,
        });
        this.characteristicValue.name = "";
        this.characteristicValue.value = "";
        this.arrayValueCharacteristic = [];
        this.arrayValueCharacteristicCheck = [];
      }
    },
    handleAddValueCharacteristic() {
      if (this.characteristicValue.value) {
        this.arrayValueCharacteristic.push({
          id: uuidv4(),
          value: this.characteristicValue.value,
        });
        this.arrayValueCharacteristicCheck.push(this.characteristicValue.value);
        this.characteristicValue.value = "";
      }
    },
    toggleModalUpdate(data) {
      console.log(data);
      if (data) {
        this.activeItem = null;
      }
    },
    deleteValueCharacteristic(value) {
      if (value) {
        this.arrayValueCharacteristic = this.arrayValueCharacteristic.filter(
          (val) => {
            return val.id !== value.id;
          }
        );
        this.arrayValueCharacteristicCheck =
          this.arrayValueCharacteristicCheck.filter((val) => {
            return val !== value.value;
          });
      }
    },
    toggleModalUpadte(n) {
      console.log(n);
      if (this.activeItem === n.id) {
        this.activeItem = null;
      } else {
        this.activeItem = n.id;
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

    handleResetValue() {
      this.characteristicValue.name = "";
      this.characteristicValue.value = "";
      this.arrayValueCharacteristic = [];
      this.arrayValueCharacteristicCheck = [];
      this.buttonAddValue = false;
      this.validate.characteristic_name = "";
      this.validate.characteristic_value = "";
      this.disabledButton.add = false;
      this.disabledButton.save = true;
      this.activeItem = null;
    },
    checkValueCharacteristic() {
      if (
        this.characteristicValue &&
        this.characteristicValue.value.length <= 10
      ) {
        this.arrayValueCharacteristicCheck.includes(
          this.characteristicValue.value
        )
          ? (this.validate.characteristic_value = "Trùng với giá trị trước đó")
          : (this.validate.characteristic_value = "");
        this.arrayValueCharacteristicCheck.includes(
          this.characteristicValue.value
        )
          ? (this.disabledButton.add = true)
          : (this.disabledButton.add = false);
      } else if (
        this.characteristicValue &&
        this.characteristicValue.value.length > 10
      ) {
        this.characteristicValue.value.length > 10
          ? (this.validate.characteristic_value = "Nhỏ hơn 10 ký tụ")
          : (this.validate.characteristic_value = "");
        this.characteristicValue.value.length > 10
          ? (this.disabledButton.add = true)
          : (this.disabledButton.add = false);
      }
    },
  },
  watch: {
    "characteristicValue.value": function () {
      this.characteristicValue.value
        ? (this.buttonAddValue = true)
        : (this.buttonAddValue = false);
      this.checkValueCharacteristic();
    },
    characteristicValue: {
      handler() {
        this.characteristicValue.name.length > 10
          ? (this.validate.characteristic_name = "Nhỏ hơn 10 ký tụ")
          : (this.validate.characteristic_name = "");
        this.characteristicValue.value
          ? (this.buttonAddValue = true)
          : (this.buttonAddValue = false);
        this.characteristicValue.name &&
        this.characteristicValue.name.length <= 10 &&
        this.arrayValueCharacteristic.length !== 0
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

<style lang="scss">
.manage-characteristics-modal {
  .bounce-enter-active {
    animation: bounce-in 0.3s;
  }
  .bounce-leave-active {
    opacity: 0;
    transition: 0.3s;
  }
  @keyframes bounce-in {
    0% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .g-input__wrapper {
    .outerError {
      position: absolute;
      bottom: -21px;
      font-size: 12px;
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
    padding: 20px 25px 0 25px;
  }
}
</style>
