<script setup lang="ts">
import { reactive, ref } from 'vue';
import { dayjs } from 'element-plus';
import { useRouterJump } from '@/hooks/useRouterJump';

const { pushRouter } = useRouterJump();
const MaxRow = ref<number>(15);
const formInline = reactive({
  user: '',
  region: '',
})
const now = new Date()

const tableData = ref([
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
])


const pagination = (page) => {
  console.log('pagination', page);
}
const onSubmit = () => {
  console.log('submit!')
}
const deleteRow = (index: number) => {
  tableData.value.splice(index, 1)
}
const goToDetail = (date: any) => {
  console.log(date.row, 'scope');
  pushRouter('/view/TableDetail', {
    query: date.row
  })
}
const onAddItem = () => {
  now.setDate(now.getDate() + 1)
  tableData.value.push({
    date: dayjs(now).format('YYYY-MM-DD'),
    name: 'Tom' + Math.round(Math.random()) * 10,
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  })
}
</script>
<template>
  <div class="h-full w-full">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input v-model="formInline.user" placeholder="Approved by" />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="formInline.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button plain @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="pb-2.5">
      <el-button plain @click="onAddItem">新增</el-button>
      <el-button plain>删除</el-button>
    </div>
    <el-table
      stripe
      :data="tableData" 
      :max-height="`${40 + 40 * MaxRow}`"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="index" label="序号" width="80">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="state" label="State" />
      <el-table-column prop="city" label="City"  />
      <el-table-column prop="address" label="Address" width="400" />
      <el-table-column prop="zip" label="Zip" />
      <el-table-column fixed="right" label="Operations" width="180">
        <template #default="scope">
          <el-button plain @click="goToDetail(scope)">
            Detail
          </el-button>
          <el-button
            type="danger"
            @click="deleteRow(scope.$index)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="tableData.length"
      @pagination="pagination"
    />
  </div>
</template>
<style lang="less" scoped>
// 
</style>
