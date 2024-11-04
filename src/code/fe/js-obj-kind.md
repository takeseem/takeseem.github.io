---
title: 深入解析 JavaScript 对象分类：宿主对象 vs 内置对象，区别到底在哪？
shortTitle: 深入解析 JavaScript 对象分类
icon: k
date: 2024-09-23 15:00:32
category:
  - 前端
  - js
tag:
  - js
order: 3
---

JavaScript 是一门灵活的语言，而对象无处不在。那么，JavaScript 中的对象到底有哪些分类？今天，我们将深入剖析宿主对象和内置对象，帮助你全面掌握它们的区别与应用场景。

## 一、宿主对象（Host Objects）
宿主对象是由 JavaScript 运行环境提供的。根据不同的环境，宿主对象会有所不同。

1. 浏览器环境中的宿主对象
- window：浏览器的全局对象，所有全局变量和函数都挂在它上面。
- document：负责 DOM 操作，帮助你操作网页结构。
- console：调试神器，用于输出日志信息。
- XMLHttpRequest：早期用于发起 HTTP 请求的 API，如今广泛使用 fetch 替代。

2. Node.js 环境中的宿主对象
- fs：文件系统模块，允许你读写文件。
- http：HTTP 模块，用于构建 HTTP 服务。
- process：提供与当前 Node.js 进程的交互信息。
简单来说，宿主对象取决于你代码运行的环境，不同环境下提供的 API 和工具有所不同。

## 二、内置对象（Built-in Objects）
**内置对象是** JavaScript 本身提供的，运行时自动创建，所有 JavaScript 环境都支持。

1. 固有对象（Intrinsic Objects）
固有对象是 JavaScript 语言的一部分，由标准规定，并在运行时自动创建。
- Object：所有对象的基类，几乎所有 JavaScript 对象都继承自它。
- Function：所有函数的基类。
- Array：常用的数据结构，帮助你处理列表或数组。
- Date：日期和时间处理神器。
这些对象都是由语言标准规定的，并在代码执行前就已经准备好，随时可以使用。

2. 原生对象（Native Objects）
原生对象是通过 JavaScript 内置的构造器函数或特殊语法生成的对象，例如：
- Array：用来创建数组的对象。
> let arr = new Array(); // 或者 let arr = [];
- RegExp：正则表达式对象，帮助你进行复杂的模式匹配。
> let regex = new RegExp('abc');
原生对象可以通过简单的语法或构造函数来实例化，非常常见于日常开发中。

## 三、深入了解内置对象标准
如果你对内置对象的标准定义感兴趣，可以参考 [ECMAScript 标准](https://262.ecma-international.org/9.0/index.html#sec-well-known-intrinsic-objects)，这里列出了所有的固有对象和原生对象，帮助你进一步理解它们的细节和用法。

## 总结
掌握 JavaScript 中的对象分类，有助于你更高效地使用 API 和库，也能让你在不同环境下如鱼得水。宿主对象提供了与环境相关的工具，而内置对象则是 JavaScript 自带的“百宝箱”。无论是在浏览器还是 Node.js 环境下，理解这些对象的作用和差异，能让你写出更加健壮和高效的代码。

如果你觉得这篇文章对你有帮助，别忘了点赞、分享，让更多人掌握 JavaScript 对象的奥秘！🌟
