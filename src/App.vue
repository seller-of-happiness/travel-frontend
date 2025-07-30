<template>
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-[#141a1f]">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>
