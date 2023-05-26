<script setup lang="ts">
import { ref, onMounted } from 'vue'
const textRef = ref<String>('1323')

onMounted(() => {
  console.log(import.meta.env.BASE_URL)
})
</script>
<template>
  <div class="about">
    <h1>This is an about page{{ textRef }}</h1>
    <div class="box">
      <span>123</span>
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
  background-color: red;
  span {
    color: aqua;
  }
}
</style>
