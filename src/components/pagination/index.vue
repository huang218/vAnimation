<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup lang="ts">
import { withDefaults, toRefs, computed, getCurrentInstance } from "vue";
const props = withDefaults(
  defineProps<{
    total?: number;
    page?: number;
    size?: number;
    pageSizes?: number[];
    layout?: string;
    background?: boolean;
  }>(),
  {
    total: 0,
    page: 1,
    size: 10,
    pageSizes: () => [10, 20, 30, 50],
    layout: "total, sizes, prev, pager, next, jumper",
    background: true,
  }
);

// eslint-disable-next-line vue/no-dupe-keys
const { total, page, pageSizes, size, layout, background } = toRefs(props);
const { proxy } = getCurrentInstance() as any;
const currentPage = computed(() => page.value);
const hidden = computed(() => total.value === 0);
const pageSize = computed(() => size.value);
const handleSizeChange = (val: number) => {
  proxy.$emit("pagination", { page: currentPage.value, limit: val });
};
const handleCurrentChange = (val: number) => {
  proxy.$emit("pagination", { page: val, limit: pageSize.value });
};
</script>
<style lang="scss" scoped>
.pagination-container {
  // position: fixed;
  // bottom: 0;
  // right: 0;
  display: flex;
  justify-content: right;
  padding: 12px 16px;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>

<script lang="ts">
export default { name: "Pagination" };
</script>
