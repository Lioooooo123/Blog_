<script setup lang="ts">
import { defineProps } from 'vue'

interface PostMeta {
  slug: string
  title: string
  summary: string
  date: string
  tags: string[]
}

const props = defineProps<{ post: PostMeta }>()
</script>

<template>
  <article style="border:1px solid #8883; border-radius:.75rem; padding:1rem;">
    <h3 style="margin:.25rem 0 0.5rem;">
      <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
    </h3>
    <p style="opacity:.8; margin:.25rem 0 .5rem;">{{ post.summary }}</p>
    <p style="display:flex; align-items:center; gap:.5rem; opacity:.7; font-size:.9rem;">
      <span>🗓 {{ post.date }}</span>
      <span v-for="t in post.tags" :key="t" class="tag">#{{ t }}</span>
    </p>
  </article>
</template>