---
title: 彻底搞懂闭包和执行上下文：从盒子到执行栈的深度解析
shortTitle: 深入理解闭包和执行上下文
icon: c
date: 2024-09-23 20:55:32
category:
  - 前端
  - js
tag:
  - js
order: 50
---

JavaScript 中的 闭包 和 执行上下文 是理解语言运行机制的核心。要真正掌握这两个概念，必须从闭包的内部结构和执行上下文的执行过程出发。本文将通过生动的比喻和实际例子，帮助你轻松理解这两个重要概念。

## 一、闭包：一个拥有记忆的“盒子”
闭包不仅仅是一个函数，它包含了两个核心部分：环境部分 和 表达式部分。形象地来说，闭包就像一个带有记忆功能的“盒子”。
1. 环境部分
> 环境部分 保存了闭包捕获的外部变量和函数——这就像盒子外面的东西，被“记住”并在闭包内随时可以访问。
2. 表达式部分
> 表达式部分 是盒子内部的代码逻辑，也就是实际的函数表达式。它依赖于环境部分存储的信息来执行操作。

举个例子：
```javascript
function outer() {
  let outerVar = 'I am from the outer function';
    
  return function inner() {
    console.log(outerVar); // 闭包捕获了外部变量 outerVar
  };
}

const closure = outer();
closure(); // 输出: I am from the outer function
```
在这个例子中，inner 函数形成了一个闭包，outerVar 被捕获并在 inner 中使用，哪怕 outer 函数已经执行完毕。


## 二、执行上下文：代码执行的幕后操作
执行上下文 是 JavaScript 运行一段代码所需的所有信息的集合。每一段代码（包括函数）都会创建一个独立的执行上下文。

1. 三种执行上下文
  - 全局执行上下文：默认创建，包含全局代码的执行环境。
  - 函数执行上下文：每当函数调用时，都会为该函数创建一个新的执行上下文。
  - Eval 执行上下文：eval() 函数执行时会生成专用的执行上下文（不建议使用 eval）。

2. 执行上下文的创建阶段
> 当代码开始执行时，JavaScript 引擎会经历创建阶段，包括以下步骤：
  - 设置作用域链：当前执行上下文和所有父级上下文中的变量对象都被放入作用域链。
  - 变量对象：存储当前上下文中的变量和函数声明。
  - This 绑定：定义 this 的指向。


## 三、深入剖析作用域链和 this 绑定
1. 作用域链
> 作用域链是当前执行上下文及其所有上级执行上下文中变量的集合。它决定了函数在不同执行阶段能访问的变量。
2. this 绑定
> this 的指向在不同的上下文中有不同的表现：
  - 全局上下文：this 指向全局对象（浏览器中是 window）。
  - 函数上下文：根据函数的调用方式不同，this 的指向会有所不同：
    - 普通函数：this 指向全局对象。
    - 对象方法：this 指向调用该方法的对象。
    - 使用 new 调用构造函数：this 指向新创建的对象。
    - 使用 call 或 apply：this 绑定到传入的对象。


## 四、执行上下文栈：后进先出的执行流
JavaScript 中的执行上下文是以**栈（stack）**的形式管理的。栈遵循 后进先出（LIFO） 的原则：
1. 执行全局代码，创建全局执行上下文并压入栈底。
1. 调用一个函数时，创建一个新的函数执行上下文，并压入栈顶
1. 函数执行后，栈顶的执行上下文被弹出，返回上一个上下文继续执行

举例说明：
```javascript
function first() {
    console.log('First function');
    second();
}

function second() {
    console.log('Second function');
}

first();
```

执行过程：
1. 全局执行上下文入栈。
1. 调用 first 函数，first 执行上下文入栈，执行 console.log。
1. 调用 second 函数，second 执行上下文入栈，执行 console.log。
1. second 执行完毕，出栈。
1. first 执行完毕，出栈。

最终的输出是：
```
First function
Second function
```

## 五、总结：掌握闭包与执行上下文的关键
理解 闭包 和 执行上下文，能帮助你更好地写出高效、稳定的 JavaScript 代码。闭包为你的函数赋予了记忆功能，而执行上下文决定了代码的执行顺序和 this 的绑定。通过掌握这些机制，你将能更灵活地管理 JavaScript 的异步操作、变量作用域和函数调用。

如果你觉得这篇文章对你有帮助，别忘了收藏和分享给你的朋友！💡