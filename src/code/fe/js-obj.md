---
title: 彻底搞懂 JavaScript 对象：从基础到进阶，带你一次掌握！
shortTitle: 彻底搞懂 JavaScript 对象
icon: o
date: 2024-09-23 11:37:32
category:
  - 前端
  - js
tag:
  - js
order: 20
---

JavaScript 中的对象究竟是什么？它不仅是键值对的集合，还是支撑整个语言运行的核心之一。无论是小白还是有经验的开发者，掌握 JavaScript 对象都是提升技能的关键。

在这篇文章中，我将带你深入探索 JavaScript 对象的属性、原型机制，甚至是 new 操作符背后的秘密。学习这些内容后，你不仅能更轻松地写出高效的代码，还能更好地理解 JavaScript 是如何工作的。

## 一、对象属性的秘密
JavaScript 对象的属性分为两类：数据属性 和 访问器属性。

1. 数据属性
每个数据属性都有4个重要特性：
- value：存储的值，简单理解就是你为属性赋的具体值。
- writable：控制属性值是否可以被修改。
- enumerable：决定这个属性能否被 for...in 或 Object.keys() 枚举出来。
- configurable：这个属性是否可以被删除或修改（除了 writable ）。

2. 访问器属性
访问器属性不直接存储值，而是通过 getter 和 setter 控制数据：
- get：当读取属性时，触发此函数。
- set：当设置属性时，触发此函数。
- enumerable 和 configurable 与数据属性类似。

你可以通过 Object.defineProperty() 动态定义访问器属性，让对象变得更加灵活。

## 二、原型与原型链
JavaScript 的对象是基于原型继承的。每个对象都有一个隐藏的内部属性 [[Prototype]]，指向它的原型对象。当你访问一个属性时，浏览器会先在对象本身查找，找不到的话，就会沿着原型链一直向上查找，直到找到为止。

了解原型链可以帮助你理解 JavaScript 的继承机制，让你写出更具扩展性和效率的代码。

实用技巧：
- 使用 Object.create(proto) 创建一个指定原型的对象。
- Object.getPrototypeOf(obj) 可以获取对象的原型。
- Object.setPrototypeOf(obj, proto) 设置对象的原型为指定的 proto。


## 三、创建对象的三种方式
- 字面量创建：let obj = {};
- 构造函数创建：let obj = new Object();
- Object.create()：指定原型对象创建新的对象。
```javascript
let prototypeObj = { a: 1 };
let obj = Object.create(prototypeObj);
```
通过这些方法，你可以根据具体需求灵活创建 JavaScript 对象。


## 四、new 操作符的幕后工作
当你使用 new 操作符创建对象时，背后其实发生了很多神秘的事情：

1. 创建一个新的空对象。
1. 将构造函数的 prototype 赋值给新对象的 __proto__。
1. 将构造函数中的 this 绑定到新对象。
1. 执行构造函数的代码。
1. 如果构造函数没有返回值，new 将自动返回新创建的对象。


## 总结
通过这篇文章，我们全面学习了 JavaScript 对象的属性类型、原型机制和 new 操作符的背后执行流程。掌握这些知识，不仅能让你的代码更加简洁高效，还能让你深入理解 JavaScript 的工作原理。

如果你觉得这篇文章有帮助，别忘了点赞和分享，帮助更多人轻松掌握 JavaScript 对象！🚀

### 我的收获：
- **发现了数据属性的4个特性**：以前没注意到属性还有这些隐藏的细节！
- **第一次了解访问器属性**：原来属性也能这么“智能”。
- **理清了对象的继承机制**：终于搞明白原型链是怎么回事了！
- **弄懂了 new 操作符的整个执行过程**：从创建到返回，一步步揭秘。