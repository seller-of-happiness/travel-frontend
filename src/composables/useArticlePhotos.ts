import { ref, nextTick } from "vue";
import type { Photo } from "vue-photo-album";
import type { ArticleDetail } from "../types";
import { usePhotoSwipe } from "./usePhotoSwipe";

// Тип объекта из API
interface ApiPhoto {
  previewUrl: string;
  webpUrl: string;
}

export const useArticlePhotos = () => {
  const photosByPoint = ref<Record<string, Photo[]>>({});
  const { lightbox } = usePhotoSwipe({
    gallery: ".photo-album",
    children: "a",
  });

  /**
   * Загружает full-size WebP, чтобы узнать реальные width/height,
   * и возвращает объект Photo с обязательными полями src, width, height.
   */
  const getPhotoWithSize = async (photo: ApiPhoto): Promise<Photo> =>
    new Promise((resolve) => {
      const img = new Image();
      img.src = photo.webpUrl;
      img.onload = () =>
        resolve({
          src: photo.previewUrl,
          width: img.naturalWidth,
          height: img.naturalHeight,
          srcSet: [
            {
              src: photo.webpUrl,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
          ],
        });
      img.onerror = () =>
        resolve({
          src: photo.previewUrl,
          width: 1,
          height: 1,
          srcSet: [{ src: photo.webpUrl, width: 1, height: 1 }],
        });
    });

  /** Загружает фотографии для всех точек статьи */
  const loadArticlePhotos = async (article: ArticleDetail) => {
    try {
      // Собираем пары [ключ, фотографии]
      const entries = await Promise.all(
        article.points.map(async (point, i) => {
          const key = `${article.id}-${i}`;
          // Явно приводим point.photos к ApiPhoto[]
          const apiPhotos = point.photos as unknown as ApiPhoto[];
          const photos = await Promise.all(
            apiPhotos.map((photoObj) => getPhotoWithSize(photoObj))
          );
          return [key, photos] as [string, Photo[]];
        })
      );

      // Переводим в объект { [key]: Photo[] }
      photosByPoint.value = entries.reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {} as Record<string, Photo[]>);

      // Обновляем лайтбокс после вставки ссылок
      await nextTick();
      lightbox.value?.destroy();
      lightbox.value?.init();
    } catch (err) {
      console.error("Ошибка при загрузке фотографий:", err);
    }
  };

  return {
    photosByPoint,
    loadArticlePhotos,
  };
};
