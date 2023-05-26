<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch } from 'vue'

const route = useRoute()
watch(
  () => route.params.id,
  (newValue) => {
    console.log('indexPage', newValue)
  }
)
</script>
<template>
  <div>
    123
  </div>
</template>

<style lang="less" scoped>

</style>