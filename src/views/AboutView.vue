<script setup lang="ts">
import { ref, onMounted } from 'vue'
const value1 = ref(true)
const textRef = ref<String>('1323')
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

onMounted(() => {
})
</script>
<template>
  <div class="about">
    <h1>This is an about page{{ textRef }}</h1>
    <div class="box">
      <span>123</span>
      <el-switch v-model="value1" />
      <el-select v-model="value" class="m-2" placeholder="Select" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<style lang="less">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.box {
  width: 100%;
  height: 100%;
  border: 1px solid black;
 
}
</style>
