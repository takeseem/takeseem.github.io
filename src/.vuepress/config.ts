import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'

const __dirname = getDirname(import.meta.url);

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "全球指数",
  description: "全球指数的官方网站",

  alias: {
    "@theme-hope/modules/blog/components/BlogHero":
      path.resolve(__dirname, "./components/BlogHero.vue"),
  },

  theme,

  plugins: [
    googleAnalyticsPlugin({
      id: "G-1XKV285RL6",
    }),
    baiduAnalyticsPlugin({
      id: "c1d8fdbe93196004b7679ce595a70285"
    }),
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
