import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "全球指数",
  description: "全球指数的官方网站",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
