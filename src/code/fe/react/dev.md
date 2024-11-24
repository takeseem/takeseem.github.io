---
title: React 开发日常记录
icon: fa-brands fa-react
date: 2024-11-24 15:46:37
category:
  - react
tag:
  - react
  - 开发日常
order: 10
---

## FontAwesome
- [免费 icon](https://fontawesome.com/search?o=r&m=free)

### [在 React 中使用 FontAwesome](https://docs.fontawesome.com/web/use-with/react)
- 安装依赖
```bash
pm i --save @fortawesome/fontawesome-svg-core \
  @fortawesome/free-solid-svg-icons \
  @fortawesome/free-regular-svg-icons \
  @fortawesome/free-brands-svg-icons \
  @fortawesome/react-fontawesome@latest
```
- 使用
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function App() {
  return <FontAwesomeIcon icon={faCoffee} />;
}
```

### [Next.js 中使用 FontAwesome](https://docs.fontawesome.com/web/use-with/react/use-with#nextjs)
- 安装依赖
```bash
pm i --save @fortawesome/fontawesome-svg-core \
  @fortawesome/free-solid-svg-icons \
  @fortawesome/free-regular-svg-icons \
  @fortawesome/free-brands-svg-icons \
  @fortawesome/react-fontawesome@latest
```
- layout.tsx 中配置
  - 不配置会导致图标占满整个空间
```jsx
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
```
- pages.tsx 中使用
```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function App() {
  return <FontAwesomeIcon icon={faCoffee} />;
}
```
