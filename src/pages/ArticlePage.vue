<template>
  <div v-if="article" class="px-5 flex flex-1 justify-center py-5">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <h2
        class="text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5"
        :class="isDark ? 'text-white' : 'text-[#101518]'"
      >
        {{ article.title }}
      </h2>
      <div
        class="description mt-4 mb-6"
        :class="isDark ? 'text-white' : 'text-[#101518]'"
      >
        {{ article.description }}
      </div>

      <div
        v-for="(point, idx) in article.points"
        :key="`${article.id}-${idx}`"
        class="points mb-6 sm:mb-10"
      >
        <PhotoAlbum
          class="photo-album rounded-2xl overflow-hidden"
          :photos="photosByPoint[`${article.id}-${idx}`] || []"
          layout="rows"
          :photo-renderer="CustomPhotoSwipeAdapter"
          :style="{ backgroundColor: isDark ? '#1f2937' : 'white' }"
        />

        <h2
          class="text-xl mt-5"
          :class="isDark ? 'text-white' : 'text-[#101518]'"
        >
          {{ point.name }}
        </h2>
        <div
          class="description-point mt-4"
          v-html="point.description"
          :class="isDark ? 'text-white' : 'text-[#101518]'"
        />
      </div>

      <div class="map overflow-hidden">
        <MapRoute />
      </div>

      <nav class="flex justify-between mt-8">
        <router-link
          :to="article.prevRouteId"
          :class="isDark ? 'text-white' : 'text-[#101518]'"
        >
          <span v-if="article.prevRouteId" class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
              />
            </svg>
            Предыдущий маршрут
          </span>
        </router-link>
        <router-link
          :to="article.nextRouteId"
          :class="isDark ? 'text-white' : 'text-[#101518]'"
        >
          <span v-if="article.nextRouteId" class="flex items-center">
            Следующий маршрут
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 ml-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { useArticleStore } from "../stores/article";
import { useThemeStore } from "../stores/theme";
import { PhotoAlbum } from "vue-photo-album";
import CustomPhotoSwipeAdapter from "../components/CustomPhotoSwipeAdapter.vue";
import { useArticlePhotos } from "../composables/useArticlePhotos";
import MapRoute from "../components/MapRoute.vue";

const articleStore = useArticleStore();
const theme = useThemeStore();
const route = useRoute();

const isDark = computed(() => theme.isDark);
const article = computed(() => articleStore.article);

const { photosByPoint, loadArticlePhotos } = useArticlePhotos();

const loadArticle = async (id: string) => {
  await articleStore.fetchArticle(id);
  if (article.value) {
    await loadArticlePhotos(article.value);
  }
};

onMounted(() => {
  const id = route.params.id;
  if (typeof id === "string") loadArticle(id);
});

onBeforeRouteUpdate((to, _, next) => {
  if (typeof to.params.id === "string") loadArticle(to.params.id);
  next();
});
</script>

<style scoped lang="scss">
.points + .points {
  margin-top: 2rem;
}

.photo-album {
  background: transparent !important;
}

.description,
.description-point {
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
