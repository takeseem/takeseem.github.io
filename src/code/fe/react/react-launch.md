---
title: React 启航
icon: rocket
date: 2024-12-13 14:11:36
category:
  - 前端
  - react
tag:
  - react
order: 10
---

- [React 技术栈 2025](https://www.robinwieruch.de/react-tech-stack/)
- [迈向下一步](https://www.road-to-next.com/)

## 学习 React 的好处
- 就业：全球 Web 开发首选框架、全栈工程师的首选
- [React](https://zh-hans.react.dev/)：全球第一，既能构建 Web 应用，又能构建原生应用。
  - 用组件创建用户界面、用代码和标签编写组件、可在任何 HTML 页面中添加 React
  - 全栈 React 开发框架：[Next.js](https://nextjs.org/)、[Remix](https://remix.run/)
  - 社区有数百万人
- [React vs Vue](https://npmtrends.com/react-vs-vue)

  ![React vs Vue](react-launch-1-react-vs-vue.png)


## React 开发环境
### Node 环境搭建
- 安装 [fnm](https://github.com/Schniz/fnm)
  ```bash
  # 安装 fnm (Fast Node Manager)
  curl -fsSL https://fnm.vercel.app/install | bash
  # 激活 fnm
  source ~/.bashrc
  ```
- 安装 [Node.js](https://nodejs.org/en/download/package-manager)
  ```bash
  # 安装并使用 Node.js v22
  fnm use --install-if-missing 22
  # 验证 Node.js 和 npm 版本
  node -v
  npm -v
  ```
- 使用 [Corepack](https://nodejs.org/api/corepack.html) 安装 [pnpm](https://pnpm.io/installation#using-corepack)（pnpm 更快更省空间）
  ```bash
  corepack enable pnpm
  ```
- Node 环境一键升级脚本：`node-upgrade.sh`
  ```bash
  #!/bin/bash

  function fnmUpgrade() {
    local ver0=$(fnm --version)
    echo "upgrade: fnm $ver0"
    curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell
    local ver=$(fnm --version)
    if [ "$ver0" = "$ver" ]; then
      echo "fnm $ver0 nothing to change"
    else
      echo "fnm $ver0 upgrade to $ver"
    fi
  }

  function nodeUpgrade() {
    local ver=$(fnm ls-remote --latest)
    if [ ! -z "$(fnm ls|grep $ver)" ]; then
      echo "node $ver is latest"
      return 0
    fi
    
    local old="node: $(node -v), npm: $(npm -v)"
    fnm install $ver
    fnm default $ver
    local now="node: $(node -v), npm: $(npm -v)"
    
    echo "node upgrade from"
    echo "\t$old"
    echo "\t$now"
  }

  function pmUpgrade() {
    echo "pnpm: $(corepack pnpm -v)"
    corepack use pnpm@latest
    corepack enable pnpm
  }

  fnmUpgrade
  nodeUpgrade
  pmUpgrade
  ```

### IDE
- 推荐安装：[vscode](/code/IDE/vscode)
- 在线 IDE：[react.new](https://react.new)


## React 项目搭建
- 使用 [vite](https://vite.dev/guide/#scaffolding-your-first-vite-project) 创建 React 项目
  ```bash
  # bash 中执行，项目名称：my-app，模板：react-swc-ts
  pnpm create vite my-app --template react-swc-ts

  # 创建成功后，进入项目目录启动项目
  cd my-app
  pnpm i
  pnpm run dev
  ```
  - 打开测试：[http://localhost:5173/](http://localhost:5173/)
  - 使用`.`在当前目录创建项目：`pnpm create vite . --template react-swc-ts`
  - 使用 vite 一步一步创建项目：`pnpm create vite`
- 升级 React 19
  ```bash
  pnpm i react@latest react-dom@latest
  pnpm i -D @types/react@latest @types/react-dom@latest \
    @vitejs/plugin-react-swc@latest eslint-plugin-react-hooks@latest \
    eslint-plugin-react-refresh@latest 
  ```
- 升级所有的包
  ```bash
  pnpm i react@latest react-dom@latest
  pnpm i -D @eslint/js@latest @types/react@latest @types/react-dom@latest \
    @vitejs/plugin-react-swc@latest \
    eslint@latest eslint-plugin-react-hooks@latest eslint-plugin-react-refresh@latest \
    globals@latest typescript@latest typescript-eslint@latest \
    vite@latest
  ```

## 集成 tailwindcss
- [tailwindcss](https://tailwindcss.com/docs/guides/vite)
  ```bash
  # 进入项目目录
  cd my-app

  # 添加依赖
  pnpm install -D tailwindcss postcss autoprefixer

  # 创建 tailwind 和 postcss 配置文件
  ## tailwind.config.js 和 postcss.config.js
  npx tailwindcss init -p
  ```
- 配置：tailwind.config.js
  ```js{3-6} title="tailwind.config.js"
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```
- 新建 scss 文件：src/assets/styles/tailwind.scss
  ```css title="src/assets/styles/tailwind.scss"
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- 在 main.tsx 中引入
  ```tsx title="main.tsx"
  import "./assets/styles/tailwind.scss";
  ```
- 测试效果，修改： App.tsx 内容如下
  ```tsx title="App.tsx"
  function App() {
    return (
      <div className="bg-red-800 text-white text-bold text-3xl">
        Hello world!
      </div>
    )
  }
  export default App
  ```
![tailwindcss](react-launch-2-tailwindcss.png =50%x)