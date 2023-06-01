<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterJump } from '@/hooks/useRouterJump';

const { goRouter, pushRouter } = useRouterJump();
const currentRoute = useRoute();

const onBack = () => {
  goRouter(-1)
}
const toDetail = () => {
  pushRouter('/view/AboutViewDetail')
}
const curRoute = computed(() => {
  return currentRoute.path.split('/').filter(item => item != '');
})
onMounted(() => {
  console.log(currentRoute,'onMounted')
})
</script>
<template>
  <div class="main-hjh-box w-full h-full">
    <el-page-header class="box h-full flex flex-col" @back="onBack">
      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">
            homepage
          </el-breadcrumb-item> -->
          <el-breadcrumb-item v-for="(item, index) in curRoute" :key="index">
            {{ item }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </template>
      <template #title>
        <span class="hover:text-blue-400">Back</span>
      </template>
      <template #content>
        <div class="flex items-center">
          <el-avatar
            class="mr-3"
            :size="32"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="text-large font-600 mr-3"> View </span>
          <span
            class="text-sm mr-2"
            style="color: var(--el-text-color-regular)"
          >
            Sub title
          </span>
          <el-tag>Default</el-tag>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button @click="toDetail">Detail</el-button>
          <el-button type="primary" class="ml-2">Edit</el-button>
        </div>
      </template>
      
      <template #default >
        <el-scrollbar>
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
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.
          </p>
          <p class="mt-4 text-sm">
            Element Plus team uses <b>weekly</b> release strategy under normal
            circumstance, but critical bug fixes would require hotfix so the actual
            release number <b>could be</b> more than 1 per week.12312
          </p>
        </el-scrollbar>
      </template>
    </el-page-header>
  </div>
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
