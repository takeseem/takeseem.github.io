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

## 你可能不需要 Effect
- 如果你可以在渲染期间计算某些内容，则不需要使用 Effect。
  - 如果没有涉及到外部系统，而只是根据 props 或 state 变化来更新组件，就不应该使用 Effect。因为 props 或 state 的变化本来就会触发 React 更新组件。
  - 你不必使用 Effect 来处理用户事件，通常应该在相应的事件处理函数中处理用户事件。
- 想要缓存昂贵的计算，请使用 [useMemo](https://zh-hans.react.dev/reference/react/useMemo) 缓存一个昂贵的计算，而不是 useEffect。
- 想要重置整个组件树的 state，请传入不同的 key。
- 想要在 prop 变化时重置某些特定的 state，请在渲染期间处理。
- 组件 显示 时就需要执行的代码应该放在 Effect 中，否则应该放在事件处理函数中。
- 如果你需要更新多个组件的 state，最好在单个事件处理函数中处理。
- 当你尝试在不同组件中同步 state 变量时，请考虑状态提升。
- 你可以使用 Effect 获取数据，但你需要实现清除逻辑以避免竞态条件。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#challenges)
  - 第 1 个挑战 共 4 个挑战: 不用 Effect 转换数据
  - 第 2 个挑战 共 4 个挑战: 不用 Effect 缓存计算结果
  - 第 3 个挑战 共 4 个挑战: 不用 Effect 重置 state
  - 第 4 个挑战 共 4 个挑战: 不用 Effect 提交表单


## Effect 的生命周期 不同于 组件的生命周期?
- 组件可以挂载、更新、卸载，但是 Effect 只能做两件事：`开始同步某些东西` 和 `停止同步它`。
- Effect 如果依赖于随时间变化的 props 和 state，这个循环会发生多次。
- Effect 和依赖项的关系
  - 如果 Effect 没有进行任何同步操作，可能是不必要的。
  - 如果它同时进行了几个独立的同步操作，因其依赖项是独立的，通常将 Effect 拆分为多个 Effect。
  - 如果想读取 props 或 state 的最新值，又不想对 Effect 做出反应并重新同步，可以将 Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）。
  - 避免将对象和函数作为依赖项。如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步。

### 摘要
- 组件可以挂载、更新和卸载。
- 每个 Effect 与周围组件有着独立的生命周期。
- 每个 Effect 描述了一个独立的同步过程，可以 `开始` 和 `停止`。
- 在编写和读取 Effect 时，要独立地考虑每个 Effect（如何开始和停止同步），而不是从组件的角度思考（如何挂载、更新或卸载）。
- 在组件主体内声明的值是“响应式”的。
- 响应式值应该重新进行同步 Effect，因为它们可以随着时间的推移而发生变化。
- 检查工具验证在 Effect 内部使用的所有响应式值都被指定为依赖项。
- 检查工具标记的所有错误都是合理的。总是有一种方法可以修复代码，同时不违反规则。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/lifecycle-of-reactive-effects#challenges)
  - 第 1 个挑战 共 5 个挑战: 修复每次输入均重新连接
  - 第 2 个挑战 共 5 个挑战: 打开和关闭状态同步 
  - 第 3 个挑战 共 5 个挑战: 寻找过时值的错误 
  - 第 4 个挑战 共 5 个挑战: 修复连接开关 
  - 第 5 个挑战 共 5 个挑战: 填充一系列选择框 

## 将事件从 Effect 中分开
- 事件处理 和 Effect
  | 事件处理 | Effect |
  | --- | --- |
  | 在响应特定交互时运行 | 在依赖的 `props` 或 `state` 变化时运行 |
  | 非响应式逻辑 | 响应式逻辑 |
- Effect Event [useEffectEvent](https://zh-hans.react.dev/reference/react/experimental_useEffectEvent)
  - 将非响应式逻辑从 Effect 移到 Effect Event 中，从而获取最新的 props 和 state
  - 只在 Effect 内部调用 Effect Event。
  - 不要将 Effect Event 传给其他组件或者 Hook。
  - 永远在 useEffect 旁边声明 Effect Event
    ```jsx
    // 使用 useEffectEvent 创建 Effect Event，在 useEffect 的旁边
    const onMyHandle = useEffectEvent((args) => {
      // useEffectEvent 中总是能访问最新的值
      // 总是能访问最新的 props 和 state
    });

    // args 可以没有，如果有的话通常是为了避免丢失 effect 触发时的值
    // 如：effect 的依赖变化，那么 onMyHandle 中永远只能获取到当前值，而不是变化前的
    useEffect(() => {
      onMyHandle(args);
    }, [args]);
    ```

### 不支持 useEffectEvent 怎么写？
示例：[第 2 个挑战 共 4 个挑战: 修复一个冻结的计数器](https://github.com/takeseem/demo-react/blob/main/app/demo/react-escape/DemoEffectEvent.tsx#L48)
- 使用：`useEffectEvent` 可以读取最新的 `increment`
  ```jsx
  import { experimental_useEffectEvent as useEffectEvent } from 'react';

  const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  ```
- 使用 `useRef` 和 `useEffect` 同样可以实现
  ```jsx
  const incRef = useRef(increment);
  useEffect(() => {
    incRef.current = increment;
  }, [increment]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + incRef.current);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  ```

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/separating-events-from-effects#challenges)
  - 第 1 个挑战 共 4 个挑战: 修复一个不更新的变量
  - 第 2 个挑战 共 4 个挑战: 修复一个冻结的计数器 
  - 第 3 个挑战 共 4 个挑战: 修复不可调整的延迟
  - 第 4 个挑战 共 4 个挑战: 修复延迟通知

## 移除 Effect 的依赖项
- 依赖应始终与代码匹配。
- 当你对依赖不满意时，你需要编辑的是代码。
- 抑制 linter 会导致非常混乱的错误，你应该始终避免它。
- 要移除依赖，你需要向 linter “证明”它不是必需的。
- 如果某些代码是为了响应特定交互，请将该代码移至事件处理的地方。
- 如果 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect。
- 如果你想根据以前的状态更新一些状态，传递一个更新函数。
- 如果你想读取最新值而不“反应”它，请从 Effect 中提取出一个 Effect Event。
- 在 JavaScript 中，如果对象和函数是在不同时间创建的，则它们被认为是不同的。
- 尽量避免对象和函数依赖。将它们移到组件外或 Effect 内。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/removing-effect-dependencies#challenges)
  - 第 1 个挑战 共 4 个挑战: 修复重置 interval
  - 第 2 个挑战 共 4 个挑战: 修复重新触发动画的问题 
  - 第 3 个挑战 共 4 个挑战: 修复聊天重新连接的问题 
  - 第 4 个挑战 共 4 个挑战: 再次修复聊天重新连接的问题

## 使用自定义 Hook 复用逻辑
- 用途：逻辑复用、解耦、组合逻辑。
- 名称必须以 `use` 开头并紧跟一个大写字母，可以返回任意值
- Hook 只能被：Hook 和组件调用。所以如果函数内部没有使用 Hook，你应该定义的是普通函数，这样其他任何函数都能调用它。
- Hook 共享的是状态逻辑，而不是状态本身。
- 每次组件重新渲染时，所有 Hook 会重新运行。
- Hook 应和组件代码一样保持纯粹。
- 把自定义 Hook 收到的事件处理函数包裹到 Effect Event。
- 不要创建像 useMount 仅用于包装原生 Hook，极易丢失依赖，而应该保持业务逻辑的目标具体化。

### 最佳实践
切记：避免过早优化。
1. 先直接开始写 Effect，确保每个 Effect 只负责单一职责，并根据需要正确处理依赖项的变化。
1. 再根据其复杂性和代码组织的需要，考虑是否提取出自定义 Hook。


### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks#challenges)
  - 第 1 个挑战 共 5 个挑战: 提取 useCounter Hook
  - 第 2 个挑战 共 5 个挑战: 让计时器的 delay 变为可配置项
  - 第 3 个挑战 共 5 个挑战: 从 useCounter 中提取 useInterval
  - 第 4 个挑战 共 5 个挑战: 修复计时器重置
  - 第 5 个挑战 共 5 个挑战: 实现交错运动