---
title: React UI 入门
icon: fa-brands fa-uikit
date: 2024-11-30 12:22:36
category:
  - 前端
  - react
tag:
  - react
order: 17
---

## 参考
- [React 官方文档](https://zh-hans.react.dev/learn/describing-the-ui)
- [demo 示例](https://www.takeseem.com/demo-react/demo/react-jsx/)

## 怎样写 React UI ？
- 在 React 中，我们可以用 JSX 来写 UI， JSX 是 JavaScript 的一种语法扩展，它允许我们在 JavaScript 代码中嵌入 HTML 标签。
  ```jsx
  function Profile() {
    return (
      <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
    );
  }
  ```
- 文件扩展名：`.js`、`.jsx`、`.tsx`
  - `.jsx` 是 JavaScript 的 JSX 语法。
  - `.tsx` 是 TypeScript 的 JSX 语法。

## 导入和导出组件
- 导入：`import React from'react';`
- 导出：`export default Profile;`

## return 语句
- 只能返回一个根元素：`return (<一个根元素></一个根元素>);`
- 怎样返回多个元素？使用 [Fragment](https://zh-hans.react.dev/reference/react/Fragment)`<>` 标签包裹多个元素
  ```jsx
  function App() {
    return (
      <>
        <第一个元素></第一个元素>
        <第二个元素></第二个元素>
        ……
      </>
    );
  }
  ```

## 怎样命名？
- 组件名：首字母大写，驼峰命名
- 属性命名规则：大部分使用驼峰命名（html 或 css 属性名中的`-`会省略转为驼峰命名）

## 怎样引用变量和对象？
- JSX 中怎样引用变量 或 JS 对象？—— 使用花括号 `{}` 引用变量 或 对象。
  ```jsx
  function App() {
    const name = 'Katherine Johnson';
    return (
      <div>
        <h1 propOfNumber={100} propOfObj={{ name: 'Katherine' }}>Hello, {name}!</h1>
      </div>
    );
  }
  ```
- 怎样向组件传递数据？—— 使用 `props` 属性
  ```jsx
  function MyCompo({ arg1, arg2, }: { arg1: type1; arg2: type2, }) {
    return (
      <>……</>
    );
  }
  function MyUI() {
    return (
      <MyCompo arg1={value1} arg2={value2} />
    );
  }
  ```

## 集合怎样渲染？
- 怎样渲染集合（数组、list、map 等）？
  ```jsx
  const peoples = [
    '凯瑟琳·约翰逊: 数学家',
    '马里奥·莫利纳: 化学家',
    '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
    '珀西·莱温·朱利亚: 化学家',
    '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
  ];

  export default function List() {
    const listItems = peoples.map(p =>
      <li>{p}</li>
    );
    return <ul>{listItems}</ul>;
  }
  ```

## 设计组件遵循怎样的原则？
- 怎样保持组件纯粹？并避免副作用？
  - 纯粹：让组件只依赖于它的参数，返回值只依赖它的输入，不产生任何可观察的副作用。
    - 单一职责原则：只负责自己的任务。
    - 重复性：相同输入，则产生相同输出（渲染）。
  - 副作用：因外界变化，导致组件不得不发生变化，包括屏幕翻转或调整、启动动画、数据更改、用户操作等，它们是 “额外” 发生的事情，与渲染过程无关，这些就是副作用。
  - 避免副作用：不要修改组件的状态，只使用它的 props 和 state 来渲染 UI

## React 怎样组织 UI 组件？
- 什么是 UI 树？——组件之间的嵌套最终会构成一个 UI 树
  ![从组件中创建 UI 树，UI 树会用于渲染 DOM](https://zh-hans.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_dom_tree.dark.png&w=1920&q=75)
- 渲染树
  ![](https://zh-hans.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fconditional_render_tree.dark.png&w=1200&q=75)
- 模块依赖树
  ![](https://zh-hans.react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fmodule_dependency_tree.dark.png&w=1920&q=75)