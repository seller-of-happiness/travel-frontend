<template>
  <!-- Кнопки для открытия маршрута -->
  <div
    v-if="points.length > 1"
    class="flex gap-2 flex-col md:flex-row items-center md:justify-end relative mb-4 md:-mb-11 mr-0 md:mr-3 z-[99999]"
  >
    <h2
      class="text-center md:hidden"
      :class="isDark ? 'text-white' : 'text-[#101518]'"
    >
      Откройте мар в своем навигаторе
    </h2>
    <div class="flex">
      <a
        :href="googleMapsLink"
        class="md:px-3 md:py-2 py-0 px-0 md:bg-white bg-transparent rounded md:shadow text-black font-medium text-xs mr-5 md:mr-3"
        target="_blank"
        rel="noopener"
      >
        <Gm class="block md:hidden w-10 h-10" />
        <sapn class="hidden md:block">Открыть в Google Maps</sapn>
      </a>
      <a
        :href="yandexMapsLink"
        class="md:px-3 md:py-2 py-0 px-0 md:bg-white bg-transparent rounded md:shadow text-black font-medium text-xs"
        target="_blank"
        rel="noopener"
      >
        <svg
          class="block md:hidden w-9 h-9 bg-white md:bg-transparent m-1 overflow-hidden rounded"
          version="1.0"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 1122 862"
          style="enable-background: new 0 0 1122 862"
          xml:space="preserve"
        >
          <g id="Navi">
            <g id="Color_icon_color">
              <g id="navi-2">
                <g id="Group-2">
                  <g id="Group">
                    <linearGradient
                      id="Fill-1_00000003071682277889664780000012705420653585890968_"
                      gradientUnits="userSpaceOnUse"
                      x1="-278.2527"
                      y1="430.1914"
                      x2="-276.4127"
                      y2="432.0314"
                      gradientTransform="matrix(397.42 0 0 -397.42 110776.7031 171765.2812)"
                    >
                      <stop offset="0" style="stop-color: #ffcc00" />
                      <stop offset="1" style="stop-color: #ffe992" />
                    </linearGradient>
                    <polygon
                      id="Fill-1"
                      style="
                        fill: url(#Fill-1_00000003071682277889664780000012705420653585890968_);
                      "
                      points="927,65 
                  195,362.5 515.3,476.9 629.7,797 					"
                    />
                    <polygon
                      id="Fill-3"
                      class="st1"
                      points="927,65 503.9,488.3 629.7,797 					"
                    />
                    <polygon
                      id="Fill-4"
                      class="st2"
                      points="492.5,499.7 629.7,797 583.8,408.2 195,362.5 					"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span class="hidden md:block">Открыть в Яндекс.Картах</span>
      </a>
    </div>
  </div>

  <div class="relative h-full w-full">
    <div
      ref="mapRef"
      class="h-80 sm:h-[600px] w-full"
      style="min-height: 400px"
    ></div>

    <!-- Блок с длиной маршрута -->
    <div
      v-if="routeSummary"
      class="absolute top-3 left-14 bg-white p-2 rounded shadow z-[9999] text-black"
    >
      <div>
        Длина маршрута: {{ (routeSummary.distance / 1000).toFixed(2) }} км
      </div>
      <div>Время в пути: {{ formattedDuration }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useArticleStore } from "../stores/article";
import { useThemeStore } from "../stores/theme";
import Gm from "../assets/images/gm.svg";
import * as L from "leaflet";
import "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const articleStore = useArticleStore();
const theme = useThemeStore();
const mapRef = ref<HTMLDivElement | null>(null);
const routeSummary = ref<{ distance: number; time: number } | null>(null);

const points = computed(() => articleStore.article?.points ?? []);

const isDark = computed(() => theme.isDark);

const googleMapsLink = computed(() => {
  if (points.value.length < 2) return "#";
  // Формируем url: /dir/lat1,lng1/lat2,lng2/lat3,lng3
  const base = "https://www.google.com/maps/dir/";
  const segments = points.value.map((p) => `${p.lat},${p.lng}`);
  return base + segments.join("/");
});

const yandexMapsLink = computed(() => {
  if (points.value.length < 2) return "#";
  // Формируем rtext=lat1,lng1~lat2,lng2~lat3,lng3
  const base = "https://yandex.ru/maps/?rtext=";
  const segments = points.value.map((p) => `${p.lat},${p.lng}`);
  return base + segments.join("~") + "&rtt=auto";
});

const formattedDuration = computed(() => {
  const seconds = routeSummary.value?.time;
  if (typeof seconds !== "number" || isNaN(seconds)) return "—";

  const totalMinutes = Math.round(seconds / 60);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const mins = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} д`);
  if (hours > 0) parts.push(`${hours} ч`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins} мин`);
  return parts.join(" ");
});

onMounted(() => {
  // Берём точки один раз из стора (или пустой массив)
  const points = articleStore.article?.points ?? [];
  if (!mapRef.value) return;

  // Инициализируем карту
  const map = L.map(mapRef.value, {
    center: [52.370216, 4.895168],
    zoom: 12,
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }),
    ],
    gestureHandling: true,
  });

  // Добавляем простые нумерованные маркеры
  points.forEach((pt, idx) => {
    const icon = L.divIcon({
      className: "marker",
      html: `<span class="marker__label"><span>${idx + 1}</span></span>`,
    });
    L.marker([pt.lat, pt.lng], { icon }).addTo(map);
  });

  // Если точек больше одной — строим маршрут и сохраняем summary
  if (points.length > 1) {
    const control = (L as any).Routing.control({
      waypoints: points.map((p) => L.latLng(p.lat, p.lng)),
      lineOptions: { styles: [{ weight: 4 }] },
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      routeWhileDragging: false,
    }).addTo(map);

    control.on("routesfound", (e: any) => {
      const s = e.routes[0].summary;
      routeSummary.value = { distance: s.totalDistance, time: s.totalTime };
    });
  }
});
</script>

<style lang="scss">
.marker {
  &__label {
    width: 36px;
    height: 36px;
    background-color: #605dff;
    border-radius: 60px 60px 0 60px;
    transform: rotate(45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      transform: rotate(-45deg);
      font-weight: bold;
      font-size: 14px;
    }
  }
}

/* Скрываем дефолтный контрол навигации */
.leaflet-right {
  display: none;
}

.st1 {
  fill: #ffcc00;
}
.st2 {
  fill: #eca704;
}
</style>
