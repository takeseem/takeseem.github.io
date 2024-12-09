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
- 使用一个指向 DOM 节点的 ref 就可以访问 DOM，实现 DOM 节点获得焦点、滚动或测量它的尺寸和位置。
  ```jsx
  import { useRef } from 'react';
  // 最初 myRef.current 是 null
  const myRef = useRef(null);
  <div ref={myRef}>
  // 现在 可以使用浏览器 API 访问 DOM 节点
  myRef.current.scrollIntoView();
  ```
- 怎样在循环中使用 ref？[ref 回调函数](https://zh-hans.react.dev/reference/react-dom/components/common#ref-callback)
- 如何访问另一个组件的 DOM 节点？
  - 使用 [forwardRef](https://zh-hans.react.dev/reference/react/forwardRef#reference) 让组件接收 ref 并将其传递给子组件
- React 何时添加 refs？
  - React 在提交阶段设置 ref.current
  - 更新 DOM 之前，React 将受影响的 ref.current 设置为 null，DOM 更新后，立即设置 ref.current
- [state 更新是排队进行的](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)：所以在修改 state 后，操作 ref 会出现落后的问题，怎么解决？
  - [flushSync(callback)](https://zh-hans.react.dev/reference/react-dom/flushSync#reference)，你应将其作为最后手段使用
  - 示例：[用 flushSync 同步更新 state](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs#flushing-state-updates-synchronously-with-flush-sync)
- 使用 refs 操作 DOM 的最佳实践
  - ref 是一种 React 的例外机制，应该在只有跳出 React 时使用，如：管理焦点、滚动位置，或调用 React 未暴露的浏览器 API 时使用。
  - 如果你通过 ref 手动修改 DOM 可能会与 React 所做的更改发生冲突。
  - React 应用更改到 DOM，所以你可以通过 ref 修改 React 永远不会更改的部分就可以避免冲突。

### 摘要
- Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
- 你通过传递 `<div ref={myRef}>` 指示 React 将 DOM 节点放入 myRef.current。
- 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
- 默认情况下，组件不暴露其 DOM 节点。 你可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
- 避免更改由 React 管理的 DOM 节点。
- 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs#challenges)
  - 播放和暂停视频
  - 使搜索域获得焦点
  - 滚动图像轮播
  - 使分开的组件中的搜索域获得焦点


## 怎样将组件与外部系统同步？
- 使用 Effect 进行同步，它允许你在渲染结束后执行一些代码。
- 回顾 React 组件逻辑
  1. 渲染代码：处理 props 和 state，是一种纯粹的计算结果
  2. 事件处理：处理用户事件，是一种副作用，通常会改变程序状态
- Effect 在 React 渲染提交应用到 DOM 后运行，是一种副作用。
- 如何编写 Effect，遵循三个步骤
  1. `声明 Effect`：在组件顶部调用 [`useEffect`](https://zh-hans.react.dev/reference/react/useEffect#reference)
    ```JSX
    function MyComponent() {
      useEffect(() => {
        // 每次渲染提交后都会执行此处的代码
      });
      return <div />;
    }
    ```
  2. `指定 Effect 依赖`：useEffect() 第二个参数是一个依赖数组，只有当依赖项发生变化时，Effect 才会重新执行。
    - React 使用 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较依赖项
    - 你也不能随意选择依赖项，如果指定的依赖项与 React 根据 Effect 内部代码所推断出的依赖不匹配，你将收到来自 linter 的错误提示。
  3. `必要时添加清理操作`：useEffect 可以通过返回一个函数来执行清理操作。
  - 避免在 Effect 中修改 state 防止死循环。因为 Effect 修改 state 又会触发组件的重新渲染，导致 Effect 再次执行，从而形成死循环。这时你也许不需要 Effect。

### 摘要
- 与事件不同，Effect 由渲染本身引起，而非特定的交互。
- Effect 允许你将组件与某些外部系统（第三方 API、网络等）同步。
- 默认情况下，Effect 在每次渲染（包括初始渲染）后运行。
- 如果所有依赖项都与上一次渲染时相同，React 会跳过本次 Effect。
- 你不能“选择”依赖项，它们是由 Effect 内部的代码所决定的。
- 空的依赖数组（[]）对应于组件的“挂载”，即组件被添加到页面上时。
- 仅在严格模式下的开发环境中，React 会挂载两次组件，以对 Effect 进行压力测试。
- 如果你的 Effect 因为重新挂载而出现问题，那么你需要实现一个清理函数。
- React 会在 Effect 再次运行之前和在组件卸载时调用你的清理函数。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/synchronizing-with-effects#challenges)
  - 挂载后聚焦于表单字段 
  - 有条件地聚焦于表单字段
  - 修复会触发两次的定时器 
  - 解决在 Effect 中获取数据的问题

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