import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(window.localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches)

  const setDark = (val: boolean) => {
    isDark.value = val
    document.documentElement.classList.toggle('dark', val)
  }

  watch(isDark, val => {
    localStorage.setItem('theme', val ? 'dark' : 'light')
    setDark(val)
  }, { immediate: true })

  return { isDark, setDark }
})