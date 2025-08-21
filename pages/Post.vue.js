import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
const route = useRoute();
const html = ref('正在加载…');
const meta = ref(null);
// Standalone HTML escaper to avoid referencing `md` inside its own initializer
const escapeHtml = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
const md = new MarkdownIt({
    html: true,
    linkify: true,
    highlight(code, lang) {
        try {
            if (lang && hljs.getLanguage(lang)) {
                return (`<pre class="hljs"><code>` +
                    hljs.highlight(code, { language: lang }).value +
                    '</code></pre>');
            }
            return `<pre class="hljs"><code>` + escapeHtml(code) + '</code></pre>';
        }
        catch (e) {
            return `<pre class="hljs"><code>` + escapeHtml(code) + '</code></pre>';
        }
    },
});
async function load() {
    const slug = route.params.slug;
    const res = await fetch(`/content/${slug}.md`);
    if (!res.ok) {
        html.value = '未找到文章';
        document.title = '未找到 - My Blog';
        return;
    }
    const text = await res.text();
    // 简易 front-matter：第一段三短横线之间的 JSON
    // ---\n{ "title":"…","date":"…","tags":[…] }\n---
    const fm = text.match(/^---\n([\s\S]*?)\n---\n?/);
    let body = text;
    if (fm) {
        try {
            meta.value = JSON.parse(fm[1]);
        }
        catch { }
        body = text.slice(fm[0].length);
    }
    html.value = md.render(body);
    if (meta.value?.title)
        document.title = `${meta.value.title} - My Blog`;
}
onMounted(load);
watch(() => route.fullPath, load);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({});
if (__VLS_ctx.meta?.title) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
    (__VLS_ctx.meta.title);
}
if (__VLS_ctx.meta?.date || __VLS_ctx.meta?.tags?.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ style: {} },
    });
    if (__VLS_ctx.meta?.date) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.meta.date);
    }
    if (__VLS_ctx.meta?.tags?.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        for (const [t] of __VLS_getVForSourceType((__VLS_ctx.meta.tags))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "tag" },
                key: (t),
            });
            (t);
        }
    }
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.hr)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "codeblock" },
});
__VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.html) }, null, null);
/** @type {__VLS_StyleScopedClasses['tag']} */ ;
/** @type {__VLS_StyleScopedClasses['codeblock']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            html: html,
            meta: meta,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
