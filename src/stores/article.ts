import { defineStore } from "pinia";
import { ref } from "vue";
import type { ArticleDetail } from "../types";

export const useArticleStore = defineStore("article", () => {
  const article = ref<ArticleDetail | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchArticle = async (id: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      // Запрос к API для получения детальной информации
      const res = await fetch(`/api/routes/${id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ArticleDetail = await res.json();
      article.value = data;
    } catch (e) {
      error.value = "Ошибка загрузки статьи";
      article.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  return { article, isLoading, error, fetchArticle };
});
