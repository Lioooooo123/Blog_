import { createRouter, createWebHistory } from 'vue-router';
const routes = [
    { path: '/', name: 'home', component: () => import('../../pages/Home.vue'), meta: { title: '首页 - My Blog' } },
    { path: '/post/:slug', name: 'post', component: () => import('../../pages/Post.vue') },
    { path: '/about', name: 'about', component: () => import('../../pages/About.vue'), meta: { title: '关于 - My Blog' } },
    { path: '/:pathMatch(.*)*', name: '404', component: { template: '<p>页面不存在</p>' }, meta: { title: '404 - My Blog' } },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});
export default router;
