<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  name: string
  age: number
  home?: string
}
const defaProps = withDefaults(defineProps<Props>(), {
  name: 'names'
})
const defaEmit = defineEmits<{
  (e: 'on-changed', event: Record<string, string | number>): void
}>()
const defaCtx = defineSlots()

const exportVal = ref('hjhExport')

const submit = () => {
  defaEmit('on-changed', { target: 'fgsgs', starget: 2 })
}
const edit = () => {
  exportVal.value = 'newExport'
  console.log(defaCtx, exportVal)
}
const vFocus = {
  mounted: (el) => el.focus()
}
// 暴露到组件外，组件外可使用ref获取暴露属性
defineExpose({
  exportVal
})
</script>

<template>
  <div>{{ defaProps.name }}&{{ defaProps.age }}</div>
  <el-button @click="submit">点击</el-button>
  <el-button @click="edit">修改</el-button>
  <el-input v-focus :value="2" />
  <slot name="hjh"></slot>
</template>

<style scoped lang="less"></style>
