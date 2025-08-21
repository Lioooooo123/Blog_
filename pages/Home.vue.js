import { ref, computed, onMounted } from "vue";
import { usePosts } from "@/composables/usePosts";
import PostCard from "@/composables/PostCard.vue";
const q = ref("");
const tag = ref("");
const { posts, tags, load } = usePosts();
onMounted(load);
const filtered = computed(() => {
    const text = q.value.trim().toLowerCase();
    const t = tag.value;
    return posts.value.filter((p) => {
        const okText = !text ||
            p.title.toLowerCase().includes(text) ||
            p.summary.toLowerCase().includes(text);
        const okTag = !t || p.tags.includes(t);
        return okText && okTag;
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ class: "search" },
    placeholder: "搜索文章标题/摘要…",
});
(__VLS_ctx.q);
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.tag),
    ...{ class: "search" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "",
});
for (const [t] of __VLS_getVForSourceType((__VLS_ctx.tags))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (t),
        value: (t),
    });
    (t);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "post-grid" },
});
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.filtered))) {
    /** @type {[typeof PostCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PostCard, new PostCard({
        key: (post.slug),
        post: (post),
    }));
    const __VLS_1 = __VLS_0({
        key: (post.slug),
        post: (post),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['search']} */ ;
/** @type {__VLS_StyleScopedClasses['search']} */ ;
/** @type {__VLS_StyleScopedClasses['post-grid']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PostCard: PostCard,
            q: q,
            tag: tag,
            tags: tags,
            filtered: filtered,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
