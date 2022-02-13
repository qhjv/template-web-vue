<template>
  <div class="warehouse-table-wrapper">
    <table class="w-100 g-table">
      <thead>
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
            <g-checkbox :checked="false">Chọn tất cả</g-checkbox>
          </th>
        </tr>
      </thead>
      <tbody class="t-align-top">
        <tr v-for="i in 3" :key="i">
          <td class="warehouse-table-product t-max-w-[320px] t-w-[320px]">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'30%'" />
            <g-skeleton-image
              class="mt"
              :maxWidth="76"
              :height="76"
              :active="true"
            />
            <g-skeleton-text class="mt" :active="true" :width="'50%'" />
          </td>
          <td class="warehouse-table-interactive t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-order t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-export t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-sell t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-refund t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-inventory t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-turnover t-text-right">
            <g-skeleton-text :active="true" :width="'100%'" />
            <g-skeleton-text :active="true" :width="'100%'" />
          </td>
          <td class="warehouse-table-action t-w-[136px]">
            <g-skeleton-button :active="true" class="mb" />
            <g-skeleton-button :active="true" class="mb" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GCheckbox } from "@/components/elements";
import {
  GSkeletonButton,
  GSkeletonImage,
  GSkeletonText,
} from "@/components/elements/skeleton";
export default {
  name: "WareHouseTableSkeleton",
  components: {
    GSkeletonButton,
    GSkeletonImage,
    GSkeletonText,
    GCheckbox,
  },
};
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
