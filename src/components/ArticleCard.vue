<template>
  <div
    class="flex flex-col gap-3 pb-3 cursor-pointer"
    @click="goToArticle(article.id)"
  >
    <div
      class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
      :style="{
        backgroundImage: `url(${
          homeStore.articles.length > 1
            ? article.cover.previewUrl
            : article.cover.webpUrl
        })`,
      }"
    ></div>
    <div>
      <p class="text-base font-medium leading-normal" :class="textClass">
        {{ article.title }}
      </p>
      <p class="text-sm font-normal leading-normal" :class="textClass">
        {{ article.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "../types";
import { useThemeClasses } from "../composables/useThemeClasses";
import { useNavigation } from "../composables/useNavigation";
import { useHomeStore } from "../stores/home";

const props = defineProps<{
  article: Article;
}>();

const homeStore = useHomeStore();
const { textClass } = useThemeClasses();
const { goToArticle } = useNavigation();
</script>
