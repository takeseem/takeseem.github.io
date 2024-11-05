---
title: 彻底搞懂 JavaScript 函数和执行机制：从函数类型到 this 的奥秘
shortTitle: 彻底搞懂 JS 函数和执行机制
icon: f
date: 2024-09-24 16:36:32
category:
  - 前端
  - js
tag:
  - js
order: 60
---

JavaScript 中的函数不仅仅是定义和调用那么简单，它们的行为依赖于复杂的执行机制与上下文切换。要完全理解 JavaScript 函数及其执行过程，你需要深入了解不同类型的函数及其执行时的内部细节。

本文将通过生动的比喻和实际代码示例，带你彻底搞懂 JavaScript 函数的定义、调用方式以及 this 的指向规则。

## 一、函数类型全解析

函数在 JavaScript 中有多种定义方式，每种方式都有其独特的用途和行为。

- 函数声明：函数声明会提升，也就是说它可以在声明之前调用。
```js
name();  // 在声明之前能调用
function name() {
  // 声明的函数
}
```

- 函数表达式：函数表达式不会提升，只有在定义之后才能被调用。
```js
const name = function() {
  // 函数表达式
};
```

- 箭头函数：没有自己的 this 绑定，它会从外部词法环境继承 this，这使得箭头函数在处理回调时非常方便。
```js
const arrowFunc = () => {
  // 箭头函数
};
```
- 生成器函数：生成器函数返回一个迭代器对象，可以通过 yield 在函数中暂停并恢复执行，用于处理迭代数据或实现异步任务流。
```js
function* generatorFunc() {
  yield 1;
  yield 2;
}
```

- 异步函数：使用 async 和 await 语法处理异步操作，更易读和理解，它返回一个 Promise。
```js
async function asyncFunc() {
  return await somePromise();
}
```

- 构造函数：用于通过 new 关键字创建对象，并通过 this 指向新对象。
```js
function ConstructorFunc() {
  this.name = 'Constructor';
}
const obj = new ConstructorFunc();
```

- 类：是构造函数的语法糖，不能提升，且必须通过 new 调用。
```js
class MyClass {
  constructor() {
    this.name = 'Class';
  }
}
const obj = new MyClass();			
```

- IIFE (立即执行函数表达式) ：创建了一个独立的局部作用域，立即执行，常用于避免全局变量污染。
```js
(function() {
  console.log('IIFE');
})();
```

- 高阶函数：可以接受其他函数作为参数，或返回一个函数，是函数式编程中的基础概念。
```js
function higherOrderFunc(fn) {
  return function() {
    return fn();
  };
}
```

## 二、深入理解函数调用过程
每次函数调用时，JavaScript 引擎会创建一个新的执行上下文，并通过一系列步骤完成上下文切换。这一切都围绕着函数的词法环境和 this 绑定展开。

1. [[Environment]] 和词法环境
> [[Environment]] 是函数的内部属性，保存了函数定义时的词法环境。每个函数的执行上下文都包含了能够访问的所有变量和作用域链。

  执行上下文的创建步骤：
  - 创建新的上下文：当函数被调用时，JavaScript 会为它创建一个新的执行上下文。
  - 创建词法环境：上下文中会包含所有局部变量、函数参数及内部函数。
  - 建立作用域链：使用函数的 [[Environment]]，在词法环境中查找外部变量，从当前函数到外层作用域。

2. [[thisMode]]：决定 this 的行为
> 每个函数内部都有一个叫做 [[thisMode]] 的属性，它控制了 this 的绑定规则。this 的行为根据函数的类型和调用方式不同，可能会指向不同的对象。

  三种 this 绑定模式：
  - lexical（词法作用域）：箭头函数采用这种模式，this 继承自外部上下文。
  - strict（严格模式）：严格模式下，this 按照函数调用时传入的值绑定，可能是 null 或 undefined。
  - global（全局模式）：非严格模式下，this 默认指向全局对象（浏览器中为 window）。

3. this 的动态绑定
> this 的绑定是动态的，具体取决于函数的调用方式：
- 普通函数：this 在非严格模式下指向全局对象，严格模式下可能为 undefined。
- 对象方法：this 指向调用该方法的对象。
- 构造函数：通过 new 调用时，this 指向新创建的对象。
- 箭头函数：不会绑定自己的 this，而是从外部环境继承。
- call/apply/bind：可以手动绑定 this，改变它的指向。

4. 使用箭头函数避免 this 问题
> 由于箭头函数没有自己的 this，它会从定义它的上下文中继承 this，因此你可以使用箭头函数来避免回调函数中 this 指向出错的问题。
```js
function Person() {
  this.age = 0;

  setInterval(() => {
    this.age++;
    console.log(this.age); // 正确引用外部 this
  }, 1000);
}
```
在这里，箭头函数确保了 this 始终指向外部的 Person 实例。

5. 手动绑定 this：call、apply、bind
> 你可以使用 call、apply 和 bind 方法手动设置函数的 this 指向。
```js
function greet() {
  console.log(this.name);
}
const person = { name: 'John' };
greet.call(person); // 输出 John
```

## 三、总结：如何掌控函数执行中的 this
JavaScript 中的函数有多种定义方式，每种方式都有其特定的用途和行为，理解它们的 this 绑定规则至关重要。通过合理使用箭头函数和手动绑定 this，你可以避免许多常见的 this 问题。

记住：this 的指向始终依赖于函数的调用方式，而非它的定义方式！

如果你觉得本文对你有帮助，别忘了收藏和分享！👏