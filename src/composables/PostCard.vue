<script setup lang="ts">
import { defineProps } from "vue";

interface PostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

const props = defineProps<{ post: PostMeta }>();
</script>

<template>
  <article
    style="border: 1px solid #8883; border-radius: 0.75rem; padding: 1rem"
  >
    <h3
      style="
        margin: 0.25rem 0 0.45rem;
        font-size: 1.5rem;
        line-height: 1.35;
        letter-spacing: 0.2px;
      "
    >
      <RouterLink :to="`/post/${post.slug}`">{{ post.title }}</RouterLink>
    </h3>
    <p
      style="
        opacity: 0.9;
        margin: 0.35rem 0 0.6rem;
        font-size: 1.12rem;
        line-height: 1.65;
        letter-spacing: 0.1px;
      "
    >
      {{ post.summary }}
    </p>
    <p
      style="
        display: flex;
        align-items: center;
        gap: 0.6rem;
        opacity: 0.75;
        font-size: 0.96rem;
        margin: 0.2rem 0 0;
        line-height: 1.6;
      "
    >
      <span>🗓 {{ post.date }}</span>
      <span v-for="t in post.tags" :key="t" class="tag">#{{ t }}</span>
    </p>
  </article>
</template>
