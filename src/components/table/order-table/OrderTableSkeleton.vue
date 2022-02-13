<template>
  <table class="w-100 g-table g-table-skeleton">
    <thead>
      <tr>
        <th>Đơn hàng</th>
        <th>Khách hàng</th>
        <th>Sản phẩm</th>
        <th>Log</th>
        <th>
          <g-checkbox :checked="false" />
          Chọn tất cả
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <g-skeleton-text :active="true" :width="'30%'" />
          <g-skeleton-text :active="true" />
          <g-skeleton-text :active="true" />
          <g-skeleton-text :active="true" :width="'50%'" />
        </td>
        <td>
          <g-skeleton-text :active="true" :width="'30%'" />
          <g-skeleton-text :active="true" />
          <g-skeleton-image
            class="mt"
            :maxWidth="178"
            :height="100"
            :active="true"
          />
        </td>
        <td>
          <g-skeleton-text :active="true" :width="'30%'" />
          <g-skeleton-text :active="true" />
          <g-skeleton-text :active="true" :width="'30%'" />
          <g-skeleton-text :active="true" />
        </td>
        <td>
          <g-skeleton-text :active="true" :width="'30%'" />
          <g-skeleton-text :active="true" />
          <a-timeline class="g-timeline" style="margin-top: 5px">
            <a-timeline-item>
              <g-skeleton-text :active="true" :width="'20%'" />
              <g-skeleton-text :active="true" />
              <g-skeleton-image
                :active="true"
                :width="50"
                :height="50"
                class="mb"
              />
            </a-timeline-item>
            <a-timeline-item>
              <g-skeleton-text :active="true" :width="'20%'" />
            </a-timeline-item>
            <a-timeline-item>
              <g-skeleton-text :active="true" :width="'20%'" />
            </a-timeline-item>
            <a-timeline-item>
              <g-skeleton-text :active="true" :width="'20%'" />
            </a-timeline-item>
          </a-timeline>
        </td>
        <td>
          <g-skeleton-button :active="true" class="mb" />
          <g-skeleton-button :active="true" class="mb" />
          <g-skeleton-button :active="true" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { GCheckbox } from "@/components/elements";
import {
  GSkeletonButton,
  GSkeletonImage,
  GSkeletonText,
} from "@/components/elements/skeleton";

export default {
  name: "OrderTableSkeleton",
  components: {
    GSkeletonButton,
    GSkeletonImage,
    GSkeletonText,
    GCheckbox,
  },
};
</script>

<style lang="scss" scoped>
@import "./table-responsive.scss";

.g-table-skeleton {
  td {
    vertical-align: top;
  }
}
</style>
