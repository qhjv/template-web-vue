<template>
  <div class="order-notify-wrap">
    <div v-if="list.length === 0">
      <span>Danh sách rỗng</span>
    </div>
    <div v-else>
      <div
        class="order-notify-item"
        v-for="item in listPackage"
        :key="item.package_draft_id"
      >
        <div>
          <b>{{ item.alias }}</b>
        </div>
        <div>
          <b>{{ item.customer_fullname }} / {{ item.customer_tel }}</b>
        </div>
        <div>
          {{ item.customer_first_address }}, {{ item.customer_corner }},
          {{ item.customer_ward }}, {{ item.customer_district }},
          {{ item.customer_province }}
        </div>
        <div>
          <div v-for="(order, index) in item.Order" :key="index">
            {{ order.product_name }} / SL: {{ order.quantity || 0 }}
          </div>
        </div>
        <div>
          CoD <b>{{ item.pick_money }} đ</b> | Phí ship:
          <b>{{ item.ship_money }} đ</b>
        </div>
        <div class="notify-error">
          <i v-html="item.message" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListOrderNotify",
  computed: {
    listPackage() {
      const listObject = [];
      this.list.forEach((item) => {
        const packageObject = JSON.parse(item.package);
        packageObject.package_draft_id = item.package_draft_id;
        listObject.push({ ...packageObject, message: item.message });
      });
      return listObject;
    },
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.order-notify-wrap {
  max-width: 500px;
  max-height: 500px;
  overflow: auto;
  padding: 10px 15px;
  color: black;
}
.order-notify-item {
  padding: 5px;
  border-bottom: 1px solid var(--grayColor);
}
.notify-error {
  color: red;
}
</style>
