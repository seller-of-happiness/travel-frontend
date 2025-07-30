import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { router } from "./router";
import VuePhotoAlbum from "vue-photo-album";
import "./index.css";
import "photoswipe/style.css";

const app = createApp(App);
app.use(createPinia());
app.use(VuePhotoAlbum);
app.use(router);
app.mount("#app");
