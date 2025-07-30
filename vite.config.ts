import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue(), svgLoader()],
    css: {
      preprocessorOptions: {
        scss: { implementation: require("sass") },
      },
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    server: {
      port: 3002,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  };
});
