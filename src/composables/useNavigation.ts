import { useRouter } from "vue-router";

export const useNavigation = () => {
  const router = useRouter();

  const goToArticle = (id: string) => {
    router.push(`/article/${id}`);
  };

  const goToHome = () => {
    router.push("/");
  };

  return {
    goToArticle,
    goToHome,
  };
};
