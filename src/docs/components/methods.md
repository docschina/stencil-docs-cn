---
title: 方法装饰器
description: 方法装饰器
url: /docs/methods
contributors:
  - jthoms1
  - manucorporat
Translators:
  - Howie126313
---

# 方法装饰器

`@Method()` 装饰器用于修饰公共的 API 方法。用 `@Method()` 装饰器装饰的函数可以直接从元素调用，即，它们旨在从外部调用！

> 开发人员应该尽量少依赖公开暴露的方法，而是尽可能默认使用属性和事件。随着应用程序的扩展，我们发现通过 `@Prop` 而不是公共方法更容易管理和传递数据。

```tsx
import { Method } from '@stencil/core';

export class TodoList {

  @Method()
  async showPrompt() {
    // show a prompt
  }
}
```

像这样调用方法：

> 在尝试调用组件的外部方法之前，开发人员应确保使用自定义元素已经注册渲染。可通过 `whenDefined` 方法获取自定义元素渲染状态。

```tsx
(async () => {
  await customElements.whenDefined('todo-list');
  const todoListElement = document.querySelector('todo-list');
  await todoListElement.showPrompt();
})();
```

## 公共方法必须是异步的

Stencil 的体系结构是异步的，这提升了性能优势和易用性。通过使用 `@Method` 装饰器修饰的公共方法会返回一个 `promise`：

- 开发人员可以在下载完成之前调用方法，而无需 `componentOnReady()`，它将方法添加至执行队列并在组件完成加载后解析执行。

- 无论它是否需要延迟加载，交互与组件相同。

- 通过保持组件的公共 API 异步，应用程序可以将组件移动到 [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 并且 API 仍然相同.

- 只有具有 `@Method` 装饰器修饰的公开方法才需要 `promise`，其他组件方法都是组件私有的，不需要异步。

```tsx
// VALID: using async
@Method()
async myMethod() {
  return 42;
}

// VALID: using Promise.resolve()
@Method()
myMethod2() {
  return Promise.resolve(42);
}

// VALID: even if it returns nothing, it needs to be async
@Method()
async myMethod3() {
  console.log(42);
}

// INVALID
@Method()
notOk() {
  return 42;
}
```

## 私有方法

非公共方法仍可用于处理组件的业务逻辑，它们不必返回 `Promise`。

```tsx
class Component {
  // 因为 `getData` 不是 @Method 修饰的公共方法
  // 不需要异步
  getData() {
    return this.someData;
  }
  render() {
    return (
      <div>{this.getData()}</div>
    );
  }
}
```
