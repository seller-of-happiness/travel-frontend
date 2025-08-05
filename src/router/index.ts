import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ArticlePage from "../pages/ArticlePage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  {
    path: "/article/:id",
    name: "article",
    component: ArticlePage,
    props: true,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // при навигации назад/вперёд возвращаем сохранённую позицию
    if (savedPosition) {
      return savedPosition;
    }
    // в остальных случаях – всегда скролл на самую верхнюю позицию
    return { top: 0 };
  },
});
