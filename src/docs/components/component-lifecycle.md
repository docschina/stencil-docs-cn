---
title: 组件生命周期
description: 组件生命周期
url: /docs/component-lifecycle
contributors:
  - jthoms1
Translators:
  - Howie126313
---

# 组件生命周期方法

组件有许多生命周期方法，可用于了解组件何时“即将”和“已经”加载、更新和渲染。这些方法可以添加到组件中，以便在正确的时间挂钩操作。

在组件类中实现以下方法之一，Stencil 将自动以正确的顺序调用它们：

<lifecycle-chart></lifecycle-chart>


## connectedCallback()

每次组件连接到 DOM 时调用。
当组件第一次连接时，这个方法会在 `componentWillLoad` 之前调用。

需要注意的是，这个方法可以被多次调用，每次元素在 DOM 中都被 **attached** 或​​ **moved** 时都会调用。对于每次在 DOM 中附加或移动元素时都需要运行的逻辑，使用此生命周期方法被认为是最佳实践。

```tsx
const el = document.createElement('my-cmp');
document.body.appendChild(el);
// connectedCallback() 调用
// componentWillLoad() 调用 (第一次)

el.remove();
// disconnectedCallback()

document.body.appendChild(el);
// connectedCallback() 再次调用, 但是 `componentWillLoad()` 并没有调用。
```

这个 `lifecycle` 钩子遵循与 [Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 所描述的含义相同。

## disconnectedCallback()

每次组件从 DOM 断开连接时调用，即它可以被分派多次，不要与“onDestroy”类事件混淆。

这个 `lifecycle` 钩子遵循与 [Custom Elements Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 所描述的含义相同。

## componentWillLoad()

在组件第一次连接到 DOM 之后调用一次。由于此方法只调用一次，因此是异步加载数据的好地方。

可以返回一个 `promise`，可用于等待第一次渲染完成。

## componentDidLoad()

在组件完全加载并第一次调用 `render()` 后调用一次。


## componentShouldUpdate()

当组件的 `Prop` 或 `State` 属性更改并且即将请求重新渲染时，将调用此钩子。这个钩子接收三个参数：新值、旧值和改变状态的名称。它应该返回一个布尔值来指示组件是否应该重新渲染(`true`)或(`false`)。

需要注意的几件事是，此方法不会在初始渲染之前执行，即当组件第一次渲染到 dom 时，也不会在下一帧执行。

假设组件的以下两个 props 同步更改：

```tsx
component.somePropA = 42;
component.somePropB = 88;
```

因为这个钩子的执行可能是有条件的，依靠它来观察 prop 的变化不是最好的方法，最好的方法是使用 `@Watch` 装饰器。

## componentWillRender()

在没次 `render()` 调用前被调用。

返回一个 `promise`，可用于等待接下来的渲染。

## componentDidRender()

在每次 `render()` 执行完成后被调用。


## componentWillUpdate()

由于某些 `Prop()` 或 `State()` 发生了变化，导致组件即将更新时调用。
它永远不会在 `render()` 期间被调用。

返回一个 `promise`，可用于等待下一次渲染。


## componentDidUpdate()

在组件更新后立即调用。
它永远不会在第一次 `render()` 期间被调用。


## 渲染中的状态

始终建议在 `componentWillRender()` 中进行任何渲染状态更新，因为这是在 `render()` 方法 _之前_ 调用的方法。或者使用 `componentDidLoad()`、`componentDidUpdate()` 和 `componentDidRender()` 方法更新渲染状态将导致再次重新渲染，但是这对性能来说并不理想。

如果状态 _必须_ 在 `componentDidUpdate()` 或 `componentDidRender()` 中更新，它有可能使组件陷入无限循环。如果在`componentDidUpdate()` 中更新状态是不可避免的，那么该方法还应该提供一种方法来检测道具或状态是否“dirty”（数据实际上不同还是与以前相同）。通过进行脏检查，`componentDidUpdate()` 能够避免渲染相同的数据，从而再次调用`componentDidUpdate()`。


## 嵌套结构的生命周期

生命周期方法的一个有用特性,它们也考虑了子组件的生命周期。例如，如果父组件 `cmp-a` 有一个子组件 `cmp-b`，那么在 `cmp-b` 完成加载之前，不会将 `cmp-a` 视为“已加载”。换一种说法就是最深的组件首先完成加载，然后`componentDidLoad()`调用冒泡。

同样重要的是要注意，即使 Stencil 可以[延迟加载组件](/blog/how-lazy-loading-web-components-work)，并且具有异步渲染，生命周期方法仍然会以正确的顺序调用。因此，虽然顶级组件可能已经加载，但它的所有生命周期方法仍然以正确的顺序调用，这意味着它将等待子组件完成加载。完全相反的情况也是如此，其中子组件可能已经准备就绪而父组件尚未准备就绪。

在下面的示例中，我们有一个简单的组件嵌套。编号列表显示了生命周期方法将触发的顺序。

```markup
  <cmp-a>
    <cmp-b>
      <cmp-c></cmp-c>
    </cmp-b>
  </cmp-a>
```

1. `cmp-a` - `componentWillLoad()`
2. `cmp-b` - `componentWillLoad()`
3. `cmp-c` - `componentWillLoad()`
4. `cmp-c` - `componentDidLoad()`
5. `cmp-b` - `componentDidLoad()`
6. `cmp-a` - `componentDidLoad()`

即使某些组件可能已加载或未加载，整个组件层次结构也会等待其子组件完成加载和渲染。


## 异步生命周期方法

生命周期方法还可以返回 `promise`，允许该方法异步检索数据或执行任何异步任务。一个很好的例子是获取要在组件中呈现的数据。例如，您正在阅读的这个站点在呈现之前首先获取内容数据。但是因为`fetch()` 是异步的，所以`componentWillLoad()` 返回一个`Promise` 以确保其父组件在其所有内容已渲染之前不被视为“loaded”，这一点很重要。

下面是一个简单的例子，展示了 `componentWillLoad()` 如何让它的父组件等待它完成,加载它的数据。

```tsx
componentWillLoad() {
  return fetch('/some-data.json')
    .then(response => response.json())
    .then(data => {
      this.content = data;
    });
}
```


## 举例

这个简单的例子显示了一个时钟并每秒更新一次当前时间。将组件添加到 DOM 时启动计时器。一旦它从 DOM 中移除，计时器就会停止。

```tsx
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'custom-clock'
})
export class CustomClock {

  timer: number;

  @State() time: number = Date.now();

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.time = Date.now();
    }, 1000);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.time).toLocaleTimeString();

    return (
      <span>{ time }</span>
    );
  }
}
```

> 这是运行的示例。如果您想查看它的实际效果，只需使用开发工具检查它即可。

> <custom-clock/>
