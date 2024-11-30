---
title: VuePress 集成 Next.js 项目
icon: fa-brands fa-vuejs
date: 2024-11-26 11:33:57
category:
  - vuepress
  - nextjs
tag:
  - vue
  - vuepress
  - nextjs
  - 建站
order: 10
star: true
---

## 需求背景

- [博客](https://github.com/takeseem/takeseem.github.io)使用 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/) 构建：[https://www.takeseem.com/]()
- [demo-react](https://github.com/takeseem/demo-react) 用 [Next.js](https://nextjs.org/) 开发，希望集成到博客的 /demo-react 路径下：[https://www.takeseem.com/demo-react](https://www.takeseem.com/demo-react)

## 解决方案

- demo-react 设置 [next.config.ts](https://github.com/takeseem/demo-react/blob/main/next.config.ts#L4)：`output: "export", basePath: "/demo-react",` 以便 build 静态化到 /out 目录。
- vuepress 项目 [navbar.ts](https://github.com/takeseem/takeseem.github.io/blob/main/src/.vuepress/navbar.ts#L12) 新增 ```{ text: "Demo React", link: `${hostname}/demo-react` }```
  - 为什么没有使用相对路径？
  - 用绝对路径主要是不希望 vue 拦截 `/demo-react` 路由。我尝试通过 AI 排除这个路由，失败了，主要是现在还不会 vue，先放弃。
- vuepress github [workflows](https://github.com/takeseem/takeseem.github.io/blob/main/.github/workflows/deploy-docs.yml#L47) 增加流程：下载 demo-react -> 构建项目 & 构建产物移动到 vuepress 中
  ```yaml
  - name: demo-react checkout
    uses: actions/checkout@v4
    with:
      repository: 'takeseem/demo-react'
      ref: 'main'
      path: demo-react

  - name: demo-react build and mv
    working-directory: demo-react
    run: |
      pnpm i
      pnpm run build
      mv out ../src/.vuepress/dist/demo-react
  ```

## 本地测试验证
- nginx 配置
```
  location / {
    # vuepress 站点构建产物：pnpm run docs:build
    root /data/workspace/node/takeseem.github.io/src/.vuepress/dist;
    autoindex on;
    index index.html index.htm;
  }
  
  # 也可以把产物路径映射到 dist/demo-react
  ## ln -sf -T /data/workspace/node/demo-react/out /data/workspace/node/takeseem.github.io/src/.vuepress/dist/demo-react
  location /demo-react {
    # next.js 项目的构建产物：pnpm run build
    alias /data/workspace/node/demo-react/out;
    autoindex on;
    index index.html index.htm;
  }
```
- 访问验证
  - [http://localhost:8080/]()
  - [http://localhost:8080/demo-react]()