import { defineStore } from "pinia";
import { ref } from "vue";
import type { Article } from "../types";

export const useHomeStore = defineStore("home", () => {
  const articles = ref<Article[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchArticles = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await fetch("/api/routes");
      if (!response.ok) {
        throw new Error(`Сервер вернул статус ${response.status}`);
      }

      const data = (await response.json()) as Article[];
      articles.value = data;
    } catch (e) {
      console.error(e);
      error.value =
        e instanceof Error ? e.message : "Неизвестная ошибка при загрузке";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    articles,
    isLoading,
    error,
    fetchArticles,
  };
});
