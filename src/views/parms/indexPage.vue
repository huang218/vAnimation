<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

// const route = useRoute();
const queryID = ref<string | number>(7)

// onMounted(() => {
//   queryID.value = route.query.id as string;
//   console.log(route.query.id,'onMounted')
// })
</script>
<template>
  <div>
    123
  </div>
  <span>{{ queryID }}</span>
</template>

<style lang="less" scoped>

</style>