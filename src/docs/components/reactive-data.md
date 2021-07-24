---
title: Reactive Data, Handling arrays and objects
description: Reactive Data, Handling arrays and objects
url: /docs/reactive-data
contributors:
  - jthoms1
---

# 响应式数据

当组件上的 `props` 或 `state` 更改时，模板组件会更新。为了性能和简单性，Stencil 只比较引用的变化，并不会在数组或对象内部的数据发生变化时重新渲染。


## 渲染方法

当组件由于状态更改（ props 或 state 更改）而更新时，会安排运行 [`render()`](templating-jsx) 方法。


## 监听装饰器

当用户更新一个属性时，`Watch` 将触发它所附加的方法，并将 `prop` 的新值和旧值一起传递给该方法。 `Watch` 可用于监听 `props` 并对其进行处理。当组件最初加载时，`Watch` 装饰器不会触发。


```tsx
import { Prop, Watch } from '@stencil/core';

export class LoadingIndicator {
  @Prop() activated: boolean;

  @Watch('activated')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
  }
}
```


## 处理数组和对象

要更新数组或对象数据，请使用以下方式，这些技术正迅速成为现代 JavaScript 工具箱的核心部分。

### 更新数组

对于数组，标准的数组操作，例如 `push()` 和 `unshift()` 不会触发组件更新。与之相反，应使用非可变数组运算符，因为它们返回新数组。其中包括 `map()` 和 `filter()`，以及 ES6 扩展运算符语法。

例如，要将新数据添加到数组，需要使用现有值和新值创建一个新数组：

```tsx
@State() items: string[];

// 当前数组
this.items = ['ionic', 'stencil', 'webcomponents'];

// 更新数组
this.items = [
  ...this.items,
  'awesomeness'
]
```

`...this.items` 语法是 JavaScript 的一个相对较新的功能，它可以在适当的位置“扩展”给定的对象。阅读有关 Spread 运算符的更多信息 [此处](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)。

### 更新对象

扩展运算符也可用于更新对象。与数组一样，改变对象不会触发 Stencil 中的视图更新，但返回新的对象可以。下面是一个例子：

```tsx
@State() myCoolObject;

// 当前对象
this.myCoolObject = {first: '1', second: '2'}

// 更新对象
this.myCoolObject = { ...myCoolObject, third: '3' }
```
