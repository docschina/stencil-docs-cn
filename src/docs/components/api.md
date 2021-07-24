---
title: Component API
description: Component API
url: /docs/api
contributors:
  - manucorporat
  - Mawulijo
  - hashcrof
  - ZenPylon
  - danjohnson95
  - rezaabedian
  - CookieCookson
---

# 组件 API

stencil 提供的一组 API 包括装饰器、生命周期钩子和渲染。


## 装饰器

装饰器是 stencil 用于处理有关组件的元数据、公开的属性、属性和方法、也可以是发出的事件甚至相关样式表，用于编译时构造组件。
收集完元数据后，装饰器都会从输出中删除，因此不会产生任何运行时的开销。

- [@Component()](component#component-decorator) 声明一个新的 Web 组件
- [@Prop()](properties#prop-decorator) 声明一个公开的属性/属性
- [@State()](state#state-decorator) 声明组件的内部状态
- [@Watch()](reactive-data#watch-decorator) 声明一个在属性或状态改变时运行的 hook
- [@Element()](host-element#element-decorator) 声明对宿主元素的引用
- [@Method()](methods#method-decorator) 声明一个公开的公共方法
- [@Event()](events#event-decorator) 声明组件可能发出的 DOM 事件
- [@Listen()](events#listen-decorator) 监听 DOM 事件


## 生命周期 hooks

- [connectedCallback()](component-lifecycle#connectedcallback-)
- [disconnectedCallback()](component-lifecycle#disconnectedcallback-)
- [componentWillLoad()](component-lifecycle#componentwillload-)
- [componentDidLoad()](component-lifecycle#componentdidload-)
- [componentShouldUpdate(newValue, oldValue, propName): boolean](component-lifecycle#componentshouldupdate)
- [componentWillRender()](component-lifecycle#componentwillrender-)
- [componentDidRender()](component-lifecycle#componentdidrender-)
- [componentWillUpdate()](component-lifecycle#componentwillupdate-)
- [componentDidUpdate()](component-lifecycle#componentdidupdate-)
- **[render()](templating-jsx)**


## 应用加载事件

除了特定于组件的生命周期钩子之外，当应用程序及其所有子组件完成加载时，将发出一个名为 `appload`的特殊事件。可以在 `window` 对象上对它监听。

如果您在同一页面上有多个应用程序，您可以通过检查 `event.detail.namespace` 来确定哪个应用程序发出了该事件。这将是您在 Stencil 配置中设置的 [namespace config option](/docs/config/testing#namespace) 的值。

```tsx
window.addEventListener('appload', (event) => {
  console.log(event.detail.namespace);
});
```

## 其他

- [**Host**](host-element): Host 是一个功能组件，可以在渲染函数的根部使用它来为宿主元素本身设置属性和事件侦听器。

- [**h()**](templating-jsx): 在 `render()` 中用于将 JSX 转换为虚拟 DOM 元素。

- [**readTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): 创建 DOM-read 任务。提供的回调将在执行 DOM 读取的最佳时刻执行，而不会导致布局抖动。

- [**writeTask()**](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing): 创建 DOM-write 任务。提供的回调将在执行 DOM 更改的最佳时刻执行，而不会导致布局抖动。

- **forceUpdate()**: 即使状态没有改变，也安排给定实例或元素的新渲染。注意 `forceUpdate()` 不是同步的，可能会在下一帧中执行 DOM 渲染。

- getAssetPath(): 获取本地资源的路径。 具体的使用阅读 [Local Assets](/docs/local-assets#component-s-assetsdirs) 。
- setMode()
- getMode()
- getElement()
