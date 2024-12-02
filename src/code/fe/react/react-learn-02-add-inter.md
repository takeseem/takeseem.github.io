---
title: React 交互
icon: fa-regular fa-handshake
date: 2024-11-30 12:22:36
category:
  - 前端
  - react
tag:
  - react
order: 17
---

## 参考
- [React 官方文档](https://zh-hans.react.dev/learn/adding-interactivity)
- [demo](https://www.takeseem.com/demo-react/demo/react-add-inter)

## 如何响应事件？
- 通过组件的 props 来定义事件处理函数，从而响应用户的输入。
  ```jsx
  function DemoOnClick() {
    const [info, setInfo] = useState("");
    const handleClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLButtonElement;
      setInfo(`点击了：${target.innerText}`);
    }
    return (
      <div>
        <MyButton name="Play Movie" onClick={handleClick} />
        <MyButton name="Upload Image" onClick={handleClick} />
        <br />
        <p>{info}</p>
      </div>
    );
  }
  function MyButton({ name, onClick }: { name: string; onClick: (e: React.MouseEvent) => void; }) {
    return <button onClick={onClick} style={btnStyle}>{name}</button>;
  }
  ```

## 如何用状态组件“记住”信息？
- [`useState`](https://zh-hans.react.dev/reference/react/useState)：是 React Hook，在组件中添加一个[状态变量](https://zh-hans.react.dev/learn/state-a-components-memory)

## 什么是两阶段更新 UI？
- 组件显示 UI 的过程
  1. 触发渲染：分为`首次渲染` 和 `组件状态改变` 时
  2. 渲染组件：
    - 首次渲染时：React 会调用根组件，并递归其组件子树节点
    - 后续渲染：状态更新影响的组件，并递归其组件子树节点
  3. 提交到 DOM：
    - 首次渲染：React 使用 [appendChild(https://developer.mozilla.org/docs/Web/API/Node/appendChild)] DOM API 将创建的 DOM 节点放在屏幕上
    - 重渲染：React 在渲染时会计算最少的必要操作，更新 DOM
  - 浏览器绘制：React 更新 DOM 后，浏览器会重新绘制屏幕。

- 注意：
  - 在严格模式下开发时：React 会调用每个组件函数 2 次，用于帮助发现由不纯函数引起的错误。

## 为什么状态改变后没有立即更新？
- 一个 state 变量的值永远不会在一次渲染的内部发生变化
- 过去创建的事件处理函数拥有的是创建它们的那次渲染中的 state 值

## 多个状态更新的最佳实践
- 更新 state 时，实际上是将它加入队列
- React 在事件处理函数执行完成后，批处理 state 更新队列

## 如何更新对象的状态？

## 如何更新数组的状态？