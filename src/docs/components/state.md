---
title: 内部状态
description: 通过组件内的 State() 使用内部状态
url: /docs/state
contributors:
  - jthoms1
Translators:
  - Howie126313
---

# 状态装饰器

`@State()` 装饰器可用于管理组件的内部数据。这意味着用户不能从组件外部修改这些数据，但组件可以修改。对 `@State()` 属性的任何更改都会导致组件的 `render` 函数再次被调用。

## 举例

这个例子使用了 `State` 和 `Listen` 装饰器。我们定义了一个名为 `open` 的类属性并用 `@State` 装饰它。使用`@Listen` 响应点击事件

切换 `open` 的值。

```tsx
import { Component, State, Listen, h } from '@stencil/core';

@Component({
  tag: 'my-toggle-button'
})

export class MyToggleButton {
  @State() open: boolean;

  @Listen('click', { capture: true })
  handleClick() {
    this.open = !this.open;
  }

  render() {
    return <button>
      {this.open ? "On" : "Off"}
    </button>;
  }
}
```

对于更高级的使用，状态可以是复杂的类型。在下面的例子中，我们维护了一个 `Todo` 类型值的列表。

```tsx
import { State } from '@stencil/core';

type Todo = {
  done: boolean,
  description: string,
}

export class TodoList {

  @State() completedTodos: Todo[];

  completeTodo(todo: Todo) {
    // 这导致 render 函数再次调用
    this.completedTodos = [...this.completedTodos, todo];
  }
}
```

## 什么时候使用？

并非所有内部状态都需要用 `@State()` 进行修饰，事实上，如果您确定该值不会更改或不需要触发重新渲染，那就不应该使用：

```tsx
class Component {

  // 如果不想因为 `cacheData` 改变而导致重新渲染,
  // 没有必要使用 @State
  cacheData = SOME_BIG_DATA;

  // 如果希望 value 改变时重新渲染
  @State() value;
}
```
