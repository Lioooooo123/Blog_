<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePosts } from "@/composables/usePosts";
import type { PostMeta } from "@/composables/usePosts";
import PostCard from "@/composables/PostCard.vue";

const q = ref("");
const tag = ref("");
const { posts, tags, load } = usePosts();

onMounted(load);

const filtered = computed(() => {
  const text = q.value.trim().toLowerCase();
  const t = tag.value;
  return posts.value.filter((p: PostMeta) => {
    const okText =
      !text ||
      p.title.toLowerCase().includes(text) ||
      p.summary.toLowerCase().includes(text);
    const okTag = !t || p.tags.includes(t);
    return okText && okTag;
  });
});
</script>
<template>
  <div>
    <div
      style="
        display: flex;
        gap: 0.75rem;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 0.75rem;
      "
    >
      <input class="search" v-model="q" placeholder="搜索文章标题/摘要…" />
      <select v-model="tag" class="search" style="max-width: 200px">
        <option value="">全部标签</option>
        <option v-for="t in tags" :key="t" :value="t">#{{ t }}</option>
      </select>
    </div>
    <div class="post-grid">
      <PostCard v-for="post in filtered" :key="post.slug" :post="post" />
    </div>
  </div>
</template>
