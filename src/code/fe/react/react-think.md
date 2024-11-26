---
title: React 哲学
icon: brain
date: 2024-11-26 14:46:37
category:
  - react
tag:
  - react
  - 开发日常
order: 15
---

::: tip
本文是 [React 哲学](https://zh-hans.react.dev/learn/thinking-in-react) 的学习整理
:::

## 问题
- 拿到一个界面原型，怎样使用 React 来实现？

## 解题步骤
1. 拆解 UI 为组件层级结构
1. 用 React 构建一个静态版本
1. 找出 state，排除那些不是 state 的
   - 随时间 **保持不变**？——不是 state
   - 通过 props **从父组件传递**？——不是 state
   - 基于已存在于组件中的 state 或 props 进行计算？——不是 state
1. 放置 state 到组件层级结构中：state 放置到需要它的组件的 **最近的共同父组件** 中
1. 添加反向数据流：通过事件处理器更新 state

- 拆解 UI 为组件层级结构，如图：拆成 5 个组件
  
  ![ui](react-think-ui0.png =50%x)
  ![ui](react-think-ui1.png =50%x)

- state：根据上面的拆解步骤，确定变化的只有 `组件 2` 中的搜索框
- state 放置到哪儿？用到 state 的是：`组件 2`、`组件 4`，故 state 放置到 `组件 1`

## demo
- [https://www.takeseem.com/demo-react/demo/react-think]()
