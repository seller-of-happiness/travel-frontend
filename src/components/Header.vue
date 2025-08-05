<template>
  <header
    class="flex items-center justify-between px-5 md:px-10 py-3 border-b border-solid"
    :class="borderClass"
  >
    <router-link to="/">
      <Logo
        class="dark:fill-white fill-stone-600 w-full sm:max-w-40 max-w-32"
      />
    </router-link>

    <div class="flex items-center gap-8">
      <router-link
        to="/"
        class="text-sm font-medium leading-normal"
        :class="textClass"
        >Маршруты</router-link
      >
      <ThemeSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import Logo from "../assets/images/logo.svg";
import { useThemeClasses } from "../composables/useThemeClasses";

const { textClass, borderClass } = useThemeClasses();
</script>
