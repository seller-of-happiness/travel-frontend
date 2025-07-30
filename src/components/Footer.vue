<template>
  <footer
    class="flex items-center justify-center px-10 py-3 border-t border-solid"
    :class="borderClass"
  >
    <div :class="textClass">© CatTemp</div>
  </footer>
</template>
<script setup lang="ts">
import { useThemeClasses } from "../composables/useThemeClasses";

const { textClass, borderClass } = useThemeClasses();
</script>
