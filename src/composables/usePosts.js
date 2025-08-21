import { ref } from 'vue';
const posts = ref([]);
const tags = ref([]);
export function usePosts() {
    async function load() {
        if (posts.value.length)
            return;
        const res = await fetch('/content/index.json');
        const data = await res.json();
        posts.value = data.sort((a, b) => (a.date < b.date ? 1 : -1));
        const set = new Set();
        posts.value.forEach(p => p.tags.forEach(t => set.add(t)));
        tags.value = Array.from(set).sort();
    }
    return { posts, tags, load };
}
