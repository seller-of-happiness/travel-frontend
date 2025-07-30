import { computed } from "vue";
import { useThemeStore } from "../stores/theme";

export const useThemeClasses = () => {
  const theme = useThemeStore();
  const isDark = computed(() => theme.isDark);

  const textClass = computed(() =>
    isDark.value ? "text-white" : "text-stone-600"
  );

  const textDarkClass = computed(() =>
    isDark.value ? "text-white" : "text-[#101518]"
  );

  const borderClass = computed(() =>
    isDark.value ? "border-b-stone-600" : "border-b-slate-200"
  );

  return {
    isDark,
    textClass,
    textDarkClass,
    borderClass,
  };
};
