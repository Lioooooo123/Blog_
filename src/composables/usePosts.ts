import { ref } from 'vue'

export interface PostMeta { slug: string; title: string; summary: string; date: string; tags: string[] }

const posts = ref<PostMeta[]>([])
const tags = ref<string[]>([])

export function usePosts() {
  async function load() {
    if (posts.value.length) return
    const res = await fetch('/content/index.json')
    const data: PostMeta[] = await res.json()
    posts.value = data.sort((a, b) => (a.date < b.date ? 1 : -1))
    const set = new Set<string>()
    posts.value.forEach(p => p.tags.forEach(t => set.add(t)))
    tags.value = Array.from(set).sort()
  }
  return { posts, tags, load }
}