// src/shims-svg.d.ts
declare module "*.svg" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
