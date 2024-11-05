---
title: 搞懂 JavaScript 语句执行的神秘机制，让你彻底告别调试迷茫！
shortTitle: 搞懂 JS 语句执行的神秘机制
icon: c
date: 2024-09-24 20:34:32
category:
  - 前端
  - js
tag:
  - js
order: 70
---

JavaScript 的语句执行机制背后隐藏着一些复杂的规则，了解这些机制不仅能帮助你更好地调试代码，还能让你深入理解引擎的工作方式。在这篇文章中，我们将详细揭开 JavaScript 语句执行的神秘面纱，带你彻底搞懂其中的执行逻辑。

## 一、什么是 Completion Record？
当 JavaScript 引擎执行每一条语句时，都会生成一个Completion Record，这个记录类似于一份“执行报告”，告诉引擎语句执行的结果，以便决定下一步的动作。Completion Record 包含三个主要属性：

1. [[type]]：执行结果的类型
> 这是 Completion Record 的核心，决定了当前语句执行的状态，有五种可能的值：
- normal：表示语句正常执行，没有异常。
- break：表示遇到 break 语句，跳出当前代码块或循环。
- continue：表示遇到 continue 语句，跳过本次循环，继续下一次循环。
- return：表示遇到 return 语句，结束函数执行并返回指定值。
- throw：表示遇到 throw 语句，抛出一个异常，进入异常处理流程。

2. [[value]]：语句的返回值
> 每条语句都可能有返回值，例如赋值语句、表达式的结果。[[value]] 属性就是用来记录语句的返回值。如果语句没有返回值，[[value]] 将是 undefined。有趣的是，Chrome 控制台中显示的正是语句执行后的 [[value]] 值。

3. [[target]]：语句的目标
> [[target]] 用于指示一些语句的目标对象，尤其是 break 和 continue 语句。它可以指向某个特定的标签或者循环结构，从而告诉引擎跳转到哪里。

## 二、Completion Record 如何影响代码执行？
JavaScript 引擎通过传播 Completion Record 来控制整个代码的执行流向。不同的 Completion Record 类型会触发不同的操作，例如遇到 return，函数会立刻结束，返回指定的值；遇到 throw，程序将进入异常处理流程。这种机制为代码执行提供了灵活性，但同时也带来了某些不易察觉的复杂性。

## 三、函数中的奇妙场景
在实际编程中，try-catch-finally 结构是处理异常的重要手段。但它与函数返回值的交互机制却常常出乎意料。让我们通过几个有趣的问题来探索 Completion Record 在这些场景中的应用。

### 问题一：如果 try 块正常执行 return 1，finally 块中执行 return 2，那么函数返回的值是什么？

```js
function test() {
  try {
    return 1;
  } finally {
    return 2;
  }
}
console.log(test()); // 输出是什么？
```

**答案：** 函数最终会返回 2。虽然 try 块中已经有了 return 1，但 finally 块中的 return 会覆盖 try 中的返回值。

### 问题二：如果 finally 块中抛出异常，函数的返回结果是什么？
```js
function test() {

  try {
    return 1;
  } finally {
    throw new Error('Oops!');
  }
}
console.log(test()); // 会发生什么？
```
**答案：** 虽然 try 块中有 return 1，但 finally 块中抛出的异常会打断正常的执行流程，函数不会返回 1，而是直接抛出异常 Error: Oops!。

### 问题三：如果 try 块抛出异常，而 finally 块返回 "value"，函数的返回结果是什么？
```js
function test() {
  try {
    throw new Error('Oops!');
  } finally {
    return 'value';
  }
}
console.log(test()); // 输出是什么？
```
**答案：** 即使 try 块抛出了异常，finally 块中的 return 依然会覆盖异常，函数最终会返回 "value"。finally 块中的 return 总是优先级最高的，它会覆盖之前所有的 return 或异常。

### 四、如何掌控 JavaScript 语句的执行流程？
> 理解 JavaScript 的语句执行机制对于调试复杂代码至关重要。以下是几条实用的建议，帮助你更好地掌控代码执行流程：

- **利用 try-catch-finally 的特性：** finally 块的代码总是会执行，因此可以在这里确保资源释放或清理操作，同时要谨慎使用 return，以免覆盖 try 块中的返回值。
- **关注 Chrome 控制台的返回值：** 在开发调试时，留意 Chrome 控制台显示的返回值，它会显示当前语句的 [[value]]，帮助你快速判断代码的执行情况。
- **使用标签和跳转语句：** 在复杂循环和嵌套代码中，合理使用 break 和 continue，并搭配 [[target]] 来控制程序流向。

## 总结
JavaScript 的语句执行机制通过 Completion Record 实现灵活的控制流程。掌握它的细节，不仅能帮你解决疑难 bug，还能让你写出更高效、更稳健的代码。下次编写代码时，记得时刻留意这些隐藏的机制，它们可能是解决问题的关键！

如果你觉得本文有帮助，欢迎点赞、收藏、分享！🚀