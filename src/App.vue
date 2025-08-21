<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const title = computed(() => (route.meta.title as string) || 'My Blog')

// 基础 SEO：动态设置标题
import { watch } from 'vue'
watch(title, (t) => { if (t) document.title = t })
</script>

<template>
  <div>
    <header class="header container">
      <h1><router-link to="/">My Blog</router-link></h1>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>
    <main class="container">
      <RouterView />
    </main>
    <footer class="container footer">© {{ new Date().getFullYear() }} My Blog.</footer>
  </div>
</template>