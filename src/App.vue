<script setup lang="ts">
import { provide, ref, onMounted, nextTick } from 'vue'

const provideInfo = ref<number>(10086)

provide('provideInfo', provideInfo)
onMounted(() => {
  // nextTick(() => {
  //   const aDom = Array.from(document.querySelectorAll('a'))
  //   const buttonDom: any[] = Array.from(document.querySelectorAll('button'))
  //   const doms = aDom.concat(buttonDom)
  //   console.log(doms, 'dom', buttonDom)
  //   doms.forEach((dom) => {
  //     dom.addEventListener('mouseover', (event) => {
  //       console.log(event, 'mouseover')
  //     })
  //     dom.addEventListener('mouseleave', (event) => {
  //       console.log(event, 'mouseleave')
  //     })
  //   })
  // })
})
</script>

<template>
  <router-view> </router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
