<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const route = useRoute()
const html = ref('正在加载…')
const meta = ref<{ title?: string; date?: string; tags?: string[] } | null>(null)

// Standalone HTML escaper to avoid referencing `md` inside its own initializer
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight(code: string, lang: string): string {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return (
          `<pre class="hljs"><code>` +
          hljs.highlight(code, { language: lang }).value +
          '</code></pre>'
        )
      }
      return `<pre class="hljs"><code>` + escapeHtml(code) + '</code></pre>'
    } catch (e) {
      return `<pre class="hljs"><code>` + escapeHtml(code) + '</code></pre>'
    }
  },
})

async function load() {
  const slug = route.params.slug as string
  const res = await fetch(`/content/${slug}.md`)
  if (!res.ok) {
    html.value = '未找到文章'
    document.title = '未找到 - My Blog'
    return
  }
  const text = await res.text()
  // 简易 front-matter：第一段三短横线之间的 JSON
  // ---\n{ "title":"…","date":"…","tags":[…] }\n---
  const fm = text.match(/^---\n([\s\S]*?)\n---\n?/)
  let body = text
  if (fm) {
    try { meta.value = JSON.parse(fm[1]) } catch {}
    body = text.slice(fm[0].length)
  }
  html.value = md.render(body)
  if (meta.value?.title) document.title = `${meta.value.title} - My Blog`
}

onMounted(load)
watch(() => route.fullPath, load)
</script>

<template>
  <article>
    <h1 v-if="meta?.title">{{ meta.title }}</h1>
    <p v-if="meta?.date || meta?.tags?.length" style="opacity:.7;">
      <span v-if="meta?.date">🗓 {{ meta!.date }}</span>
      <span v-if="meta?.tags?.length">　|　标签：
        <span class="tag" v-for="t in meta!.tags" :key="t">#{{ t }}</span>
      </span>
    </p>
    <hr />
    <div class="codeblock" v-html="html" />
  </article>
</template>