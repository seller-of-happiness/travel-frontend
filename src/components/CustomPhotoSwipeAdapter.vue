<template>
  <a
    :href="largePhoto.src"
    :data-pswp-width="largePhoto.width"
    :data-pswp-height="largePhoto.height"
    :data-pswp-srcset="srcsetAttr"
    @click.prevent
  >
    <img
      v-bind="props.imageProps"
      loading="lazy"
      class="w-full h-full object-cover"
    />
  </a>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import type { PhotoRendererMetadata } from "vue-photo-album";

const props = defineProps<PhotoRendererMetadata>();
// используем первый srcSet вариант для full‑size (или сам photo)
const largePhoto = computed(() => props.photo.srcSet?.[0] ?? props.photo);

// готовим строку для data-pswp-srcset
const srcsetAttr = computed(() =>
  props.photo.srcSet
    ? props.photo.srcSet.map((p) => `${p.src} ${p.width}w`).join(", ")
    : ""
);
</script>
