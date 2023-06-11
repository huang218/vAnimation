<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const currentRoute = useRoute()

onMounted(() => {
  console.log(currentRoute, 'onMounted')
})
</script>
<template>
  <MainPage>
    <el-descriptions :column="3" size="default" class="mt-4">
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.
    </p>
    <p class="mt-4 text-sm">
      Element Plus team uses <b>weekly</b> release strategy under normal circumstance, but critical
      bug fixes would require hotfix so the actual release number <b>could be</b> more than 1 per
      week.12312
    </p>
  </MainPage>
</template>

<style scoped lang="less">
// main区域为剩余高度
:deep(.el-page-header__main) {
  flex: 1 !important;
}
// @media (min-width: 1024px) {
//   .about {
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//   }
// }
</style>
