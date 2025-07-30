<template>
  <div class="px-5 flex flex-1 justify-center pb-5 pt-8">
    <div class="layout-content-container flex flex-col max-w-[1040px] flex-1">
      <div class="@container">
        <div class="@[480px]:px-4">
          <div
            class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#141a1f] @[480px]:rounded-xl min-h-96 rounded-xl"
            style="
              background-image: url('./images/main.jpg');
              background-size: cover;
              background-position: 0 72%;
            "
          ></div>
        </div>
      </div>
      <div class="flex flex-wrap justify-between gap-3 py-4 mt-4">
        <p
          class="dark:text-white text-stone-600 tracking-light text-[32px] font-bold leading-tight"
        >
          Наши маршруты
        </p>
      </div>
      <div
        class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 py-4"
      >
        <ArticleCard
          v-for="article in homeStore.articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useHomeStore } from "../stores/home";
import ArticleCard from "../components/ArticleCard.vue";

const homeStore = useHomeStore();

onMounted(() => {
  homeStore.fetchArticles();
});
</script>
