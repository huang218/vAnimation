<script setup lang="ts">
import { useLoading } from '../../hooks/useLoading'
const { loading } = useLoading()
</script>
<template>
  <div
    v-show="loading"
    class="mask w-full h-full absolute top-0 left-0 bg-light-400/70 dark:bg-dark-400/70"
  >
    <div class="container">
      <div class="sami-ring"></div>
      <div class="sami-ring"></div>
      <div class="sami-ring"></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@keyframes loading_one {
  from {
    transform: rotateX(35deg) rotateY(-45deg) rotate(0);
  }
  to {
    transform: rotateX(35deg) rotateY(-45deg) rotate(360deg);
  }
}
@keyframes loading_two {
  from {
    transform: rotateX(50deg) rotateY(10deg) rotate(0);
  }
  to {
    transform: rotateX(50deg) rotateY(10deg) rotate(360deg);
  }
}
@keyframes loading_three {
  from {
    transform: rotateX(35deg) rotateY(55deg) rotate(0);
  }
  to {
    transform: rotateX(35deg) rotateY(55deg) rotate(360deg);
  }
}
.container {
  @apply h-200px w-200px relative top-1/2 left-1/2 perspect-500px preserve-3d;
  transform: translate(-100px, -100px);
  .sami-ring {
    @apply absolute top-0 left-0 w-full h-full rounded-1/2;
    border-bottom: 5px solid orange;
    &:nth-child(1) {
      border-color: #0097e6;
      animation: loading_one 1.2s linear -0.8s infinite;
    }
    &:nth-child(2) {
      border-color: #99e600;
      animation: loading_two 1.2s linear -0.4s infinite;
    }
    &:nth-child(3) {
      border-color: #3200e6;
      animation: loading_three 1.2s linear infinite;
    }
  }
}
</style>
