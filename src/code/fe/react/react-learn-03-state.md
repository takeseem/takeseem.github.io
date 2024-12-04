---
title: React 状态管理
icon: store
date: 2024-12-03 14:22:36
category:
  - 前端
  - react
tag:
  - react
  - state
order: 17
---

## 参考
- [React 官方文档](https://zh-hans.react.dev/learn/managing-state)
- [demo](https://www.takeseem.com/demo-react/demo/react-state)

## 将 UI 视为 state
### 声明式 UI 编程与命令式 UI 编程有何不同？
- 命令式编程：你坐在车上然后一步一步的告诉他该去哪儿。
  - 他不知道你想要去哪儿，所以他只能根据你的指令来行动。
  - 你必须知道执行的每个细节和步骤，并处理每个可能的错误。
- 声明式编程：你告诉他要去哪儿，然后他去了。
  - 你只需告诉他要去哪儿，而不是事无巨细的告诉他如何走，他就会将你带到目的地。
  - 你只需声明你想要的，React 会计算出如何去更新 UI。

### 怎样声明式地考虑 UI？
1. `定位`你的组件中不同的视图状态
  - 如表单：未填写、输入中、提交中、成功时、错误时。
2. `确定`是什么触发了这些 `state` 的改变
  - 人为输入：点击、填写内容、点击导航链接等，通常需要：[事件处理函数](https://zh-hans.react.dev/learn/responding-to-events)
  - 计算机输入：网络请求反馈、定时器、加载图片等。
  - 如：表单的各种状态：
  ![表单的各种状态](react-learn-03-state-1.png)
3. `表示`内存中的 state（需要使用 `useState`）
4. `删除`任何不必要的 state 变量
  - 怎样找出不必要的 state 变量？问问自己：
    - `这个 state 是否会导致矛盾？`例如，isTyping 与 isSubmitting 的状态不能同时为 true。矛盾的产生通常说明了这个 state 没有足够的约束条件。两个布尔值有四种可能的组合，但是只有三种对应有效的状态。为了将“不可能”的状态移除，你可以将他们合并到一个 'status' 中，它的值必须是 'typing'、'submitting' 以及 'success' 这三个中的一个。
    - `相同的信息是否已经在另一个 state 变量中存在？`另一个矛盾：isEmpty 和 isTyping 不能同时为 true。通过使它们成为独立的 state 变量，可能会导致它们不同步并导致 bug。幸运的是，你可以移除 isEmpty 转而用 message.length === 0。
    - `你是否可以通过另一个 state 变量的相反值得到相同的信息？`isError 是多余的，因为你可以检查 error !== null。
  - 通过 [将状态提取到一个 reducer 中](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer) 减少“不可能” state
5. `连接`事件处理函数去设置 state

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/reacting-to-input-with-state#challenges)：务必 Fork 再修复以避免内嵌导致的一些莫名其妙错误。
  - `添加和删除一个 CSS class` 收获：useState 的使用，事件冒泡。
  - `个人信息编辑器` 收获：React 很简单，form submit 默认行为处理。
  - `不使用 React 去重构命令式的解决方案` 收获：怎样用 JS 直接操作 DOM，深刻体会 React 的优势。

## 如何组织好 state 状态结构？
### state 构建原则
1. `合并关联的 state`：如果总是同时更新两个或更多 state，考虑将它们合为一个单独的 state 变量。
1. `避免矛盾的 state`：应尽量避免 state 结构中存在多个相互矛盾或“不一致”的 state。
1. `避免冗余的 state`：如果能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应将这些信息放入 state 中。
1. `避免重复的 state`：当同一数据在多个 state 变量之间或在多个嵌套对象中重复时，很难保持它们同步。应尽可能减少重复。
1. `避免深度嵌套的 state`：深度分层的 state 更新起来不方便，最好以扁平化方式构建 state。有时候可以将一些嵌套 state 移动到子组件中来减少 state 的嵌套，通常是不需要保持的短暂 UI 状态，如：一个选项是否被悬停。

### 摘要
- 如果两个 state 变量总是一起更新，请考虑将它们合并为一个。
- 仔细选择你的 state 变量，以避免创建“极难处理”的 state。
- 用一种减少出错更新的机会的方式来构建你的 state。
- 避免冗余和重复的 state，这样你就不需要保持同步。
- 除非你特别想防止更新，否则不要将 props 放入 state 中。
- 对于选择类型的 UI 模式，请在 state 中保存 ID 或索引而不是对象本身。
- 如果深度嵌套 state 更新很复杂，请尝试将其展开扁平化。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/choosing-the-state-structure#challenges) 务必 Fork 再修复以避免内嵌导致的一些莫名其妙错误。
  - 修复一个未更新的组件：因为定义了非必要的 state。
  - 修复一个损坏的打包清单：total 和 packed 是可计算的，无须定义 state。
    ```jsx
    const [items, setItems] = useState(initialItems);
    const total = items.length;
    let packed = 0;
    items.forEach(v => {
      if (v.packed) packed++; 
    });
    ```
  - 修复消失的选项
    - 因为比较的是对象：`isHighlighted={letter === highlightedLetter}`，而点击后是一个新对象，肯定不相等
    - 修复：应比较对象的标识：`isHighlighted={letter.id === highlightedLetter?.id}`，注意首次高亮对象是 null
  - 实现多选功能：如果熟悉 [Array API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#实例方法) 很快就能实现
    - [findIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#语法)
    - [toSpliced](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
    ```jsx
    const [selectedIds, setSelectedIds] = useState([]);
    const selectedCount = selectedIds.length;
    function handleToggle(toggledId) {
      const idx = selectedIds.findIndex((v) => v === toggledId);
      setSelectedIds(
        idx === -1
          ? selectedIds.toSpliced(selectedIds.length, 0, toggledId)
          : selectedIds.toSpliced(idx, 1)
      );
    }
    ```

## 如何使用“状态提升”在组件之间共享状态
- 把 state 放到它们的公共父级——这被称为“状态提升”
- 如何使用状态提升在组件之间共享状态
- 什么是受控组件和非受控组件
  - `非受控组件`：组件由其自身内部状态控制的叫非受控组件。
  - `受控组件`：组件由 `props` 输入控制的就叫受控组件。

### 尝试一些挑战
- 务必完成官方：[尝试一些挑战](https://zh-hans.react.dev/learn/sharing-state-between-components#challenges) 
  - [挑战: 同步输入状态]()
  - [挑战: 列表过滤]()

## 如何控制状态的保留或重置

## 如何在函数中整合复杂的状态逻辑

## 如何避免数据通过 prop 逐级透传

## 如何随着应用的增长去扩展状态管理