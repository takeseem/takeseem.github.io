---
title: 彻底解析 Promise 执行过程：从事件循环到 async/await 轻松掌握！
shortTitle: 彻底解析 Promise 执行过程
icon: p
date: 2024-09-23 15:49:32
category:
  - 前端
  - js
tag:
  - js
  - promise
order: 40
---

在 JavaScript 中，Promise 是处理异步编程的重要工具。要深入理解 Promise 的执行过程，我们需要从 JavaScript 引擎的执行机制入手，尤其是 事件循环（Event Loop）和 任务队列（Task Queue）的运作方式。


## 一、任务队列的两大类型
JavaScript 中的任务队列分为两种主要类型：
- 宏任务队列（Macrotask Queue）：包含如 setTimeout、setInterval 和 DOM 事件处理等任务
- 微任务队列（Microtask Queue）：专门用于存放 Promise 回调、MutationObserver 等任务


## 二、事件循环（Event Loop）
事件循环的工作原理是不断检查执行栈是否为空：
- 如果执行栈为空，首先检查微任务队列，依次执行其中的所有微任务
- 清空微任务队列后，从宏任务队列中取出一个任务执行
- 重复以上步骤，形成循环


## 三、JavaScript 引擎执行过程
执行过程主要包括以下步骤：
1. 执行同步代码（栈中的任务）
1. 执行所有微任务
1. 执行一个宏任务
1. 重复步骤 2 和 3


## 四、示例解析

让我们看一个简单的例子，来理解输出顺序：
```javascript
console.log('1'); // 同步任务

// setTimeout 提交了一个宏任务到宏任务队列
setTimeout(() => {
    console.log('2'); // 宏任务
}, 0);

// Promise 添加了一个微任务到微任务队列
Promise.resolve().then(() => {
    console.log('3'); // 微任务
});

console.log('4'); // 同步任务
```
执行过程
- 先执行同步任务，输出 1 和 4
- 因为 Promise 添加了微任务，所以同步代码执行后会执行微任务输出 3
- 最后再执行 setTimeout 提交的宏任务输出 2
最终输出顺序将是：1, 4, 3, 2


## 五、async/await —— Promise 的语法糖

async/await 是 ES2017 引入的处理 Promise 的新语法，使异步代码看起来像同步代码，极大提高了可读性。
- async 函数返回一个 Promise
- await 只能在 async 函数内使用，它会暂停函数执行，直到 Promise 解决（Fulfilled 或 Rejected）
通过 async/await，你可以轻松处理复杂的异步逻辑，写出更清晰的代码

## 总结
掌握 Promise 的执行过程和事件循环的原理，是提高 JavaScript 编程能力的关键。理解微任务和宏任务的区别，有助于你更好地管理异步操作，优化代码性能。如果你觉得这篇文章对你有所帮助，别忘了点赞和分享，让更多人了解 Promise 的奥秘！🚀