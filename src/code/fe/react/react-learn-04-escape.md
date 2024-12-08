---
title: React 脱围机制（Escape Hatches）
shortTitle: React 脱围机制
icon: magnet
date: 2024-12-06 14:46:36
category:
  - 前端
  - react
tag:
  - react
  - escape
order: 17
---

## 参考
- [React 官方文档](https://zh-hans.react.dev/learn/escape-hatches)
- [demo](https://www.takeseem.com/demo-react/demo/react-escape)


## 怎样“记住”信息，而不触发重新渲染？
- 可以使用 `ref`，它会记住信息，ref 的变更也不会触发新的渲染。
- ref 和 state 的区别
  | ref | state |
  | --- | --- |
  | [useRef](https://zh-hans.react.dev/reference/react/useRef#reference) | [`useState`](https://zh-hans.react.dev/reference/react/useState#reference) |
  | 修改时不触发渲染 | 修改时触发渲染 |
  | 可变，可以在渲染过程之外修改 current 的值 | “不可变”，你必须使用 state setter 函数修改 state，从而排队重新渲染 |
  | 不应在渲染期间读取、写入 current | 可以随时读取 state，但每次渲染都有自己不变的 state 快照 |
- 何时使用 [useRef](https://zh-hans.react.dev/reference/react/useRef#reference)？
  - 当组件需要跳出 React 与外部 API 交互时就会用到 ref，如：存储 [timeout ID](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)
  - 存储和操作 [DOM 元素](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)
  - 存储不需要被用来计算 JSX 的其他对象
- ref 的最佳实践
  - `将 ref 视为脱围机制`：当使用外部系统或浏览器 API 时，如果应用程序逻辑和数据流很大一部分依赖于 ref，你可能需要重新考虑你的设计。
  - `不要在渲染过程中读取或写入 ref.current`：通常渲染过程中需要某些信息，应该使用 state，而不是 ref。

### 摘要
- ref 是一种脱围机制，用于保留不用于渲染的值。 你不会经常需要它们。
- ref 是一个普通的 JavaScript 对象，具有一个名为 current 的属性，你可以对其进行读取或设置。
- 你可以通过调用 useRef Hook 来让 React 给你一个 ref。
- 与 state 一样，ref 允许你在组件的重新渲染之间保留信息。
- 与 state 不同，设置 ref 的 current 值不会触发重新渲染。
- 不要在渲染过程中读取或写入 ref.current。这使你的组件难以预测。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/referencing-values-with-refs#challenges)
  - 修复坏掉的聊天输入框
  - 修复无法重新渲染的组件
  - 修复防抖
  - 读取最新的 state


## 在 React 中怎样访问 DOM？


## 怎样将组件与外部系统同步？


## 从组件中删除不必要的 Effect
- 两种常见的不必使用 Effect 的情况：
  - 不要为了渲染而使用 Effect 来转换数据。
    ```jsx
    const [fullName, setFullName] = useState('');
    useEffect(() => {
      setFullName(firstName + ' ' + lastName);
    }, [firstName, lastName]);

    // 这是没必要的，应该 fullName 是可计算的，更好的实现如下：
    const fullName = firstName + ' ' + lastName;
    ```
  - 不要使用 Effect 来处理用户事件。


## Effect 的生命周期 不同于 组件的生命周期?
- 组件可以挂载、更新、卸载，但是 Effect 只能做两件事：`开始同步某些东西` 和 `停止同步它`。
- Effect 如果依赖于随时间变化的 props 和 state，这个循环会发生多次。


## 防止某些值重新触发 Effect


## 减少 Effect 重新执行的频率


## 在组件之间共享逻辑