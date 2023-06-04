<script setup lang="ts">import { ref } from 'vue';


const MaxColumn = ref<number>(10);
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const pagination = (page) => {
  console.log('pagination', page);
  
}
</script>
<template>
  <div class="h-full w-full">
    <el-table
      stripe
      :data="tableData" 
      :max-height="`${40 + 40 * MaxColumn}`"
      style="width: 100%"
    >
      <el-table-column prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <Pagination
      :total="tableData.length"
      @pagination="pagination"
    />
  </div>
</template>
<style lang="less" scoped>

</style>
