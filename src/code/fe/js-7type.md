---
title: JavaScript 的 7 种类型
icon: t
date: 2024-09-22 16:47:32
category:
  - 前端
  - js
tag:
  - js
---

JavaScript 有 7 种数据类型：undefined、null、Boolean、String、Number、Symbol 和 Object。每一种类型都有其独特的特点和使用场景。通过深入学习这些类型，我对以下几点有了更深刻的理解：

## 学习收获
- String 编码与 Unicode 字符的关系
> 理解了 String 的编码和方法都是基于 UTF-16 码点，这也让我更清楚地掌握了码点和 Unicode 字符之间的区别。

- Number 的特殊处理
> 了解了 Number 在除零时处理 +0 和 -0 时的不同表现，并学会了如何使用 Number.EPSILON 进行精确的浮点数比较。

- Symbol 的认知拓展
> Symbol 类型带来了全新的视角，尤其是在对象属性键的应用上。

- Object 和原型链深入理解了 JavaScript 的原型链机制以及对象的继承结构。


## 7 种 JavaScript 类型详解

1. undefined
- 当一个变量被声明但未赋值时，其默认值是 undefined。
- undefined 也是一个全局对象的属性，可以通过 window.undefined 访问。

2. null
- null 是 JavaScript 的一个关键字，语义表示“空值”。
- 通常用于显式赋值，表示“无”或“空对象”。

3. Boolean
- 只有两个值：true 和 false，用于表示布尔状态。

4. String
- String 是不可变的文本序列，基于 UTF-16 编码。
- 一个 Unicode 字符可能由多个 UTF-16 码点（称为“代理对”）构成，比如 emoji 表情符号。
- JavaScript 中的字符串操作方法都是基于 UTF-16 码点。例如，length 返回的是 UTF-16 码点的数量，而不是实际字符的数量。比如："a👄️b".length 的结果是 5。
- 可以通过 Array.from(str) 或 for (let ch of str) 来正确遍历包含代理对的字符串。

5. Number
- JavaScript 中的数字类型既可以表示整数也可以表示浮点数。
- 特殊值包括：
  - NaN（Not-a-Number）：表示无效的数字运算结果，NaN 和任何值比较，包括自己，都是 false。
  - Infinity 和 -Infinity：表示正无穷和负无穷，通常在除以零或数值过大时产生。
  - +0 和 -0：基于 IEEE 754 浮点数标准，+0 和 -0 是不同的值，虽然通常它们的表现相同，但在某些运算中会有所区别，比如：1 / -0 === -Infinity。可以使用 Object.is(0, -0) 来区分 0 和 -0。
- 精度问题：
  - JavaScript 中能精确表示的整数范围是 -0x1fffffffffffff 到 0x1fffffffffffff 之间的整数。
  - 由于浮点数的精度问题，像 0.1 + 0.2 === 0.3 这样的比较会返回 false，解决方案是使用 Number.EPSILON 进行精确比较：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON。

6. Symbol
- Symbol 是 JavaScript 的一种原始数据类型，具有不可变和唯一性。
- Symbol 可以用作对象的非字符串键，不会被 for...in 或 Object.keys() 枚举出来，也不会与其他属性冲突。
- 可以使用 Symbol.for(key) 创建全局共享的 Symbol。
- Symbol 无法隐式转换为字符串，但可以使用 String(symbol) 获取其描述。

7. Object
- Object 是 JavaScript 的引用类型，表示键值对的集合，键可以是字符串或 Symbol。
- 可以动态地添加或删除属性。
- 原型链与继承：JavaScript 中的对象可以继承其他对象的属性和方法。每个对象都有一个内部链接指向另一个对象（称为原型），当访问某个属性或方法时，如果在对象本身找不到，就会沿着原型链向上查找。


## 总结

通过对这些基本类型的重新梳理和深入理解，我对 JavaScript 的基础有了更深刻的认知，也希望这些内容能帮助更多的开发者加深对 JavaScript 类型的理解。