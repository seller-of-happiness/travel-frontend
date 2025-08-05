import * as L from "leaflet";

declare module "leaflet" {
  interface MapOptions {
    /** Включает обработку жестов двумя пальцами */
    gestureHandling?: boolean;
    /** Опции для плагина leaflet-gesture-handling */
    gestureHandlingOptions?: {
      /** Текст подсказки на десктопе */
      text?: string;
      /** Текст подсказки на тачах */
      textTouch?: string;
    };
  }
}
