<script setup lang="ts">
const emit = defineEmits<{
  changes: [prop: number]
}>()

const logTest = () => {
  console.log(emit('changes', 2), 'emit')
}
</script>
<template>
  <div>
    <el-button @click="logTest">组件点击</el-button>
  </div>
</template>
<style lang="less" scoped></style>
