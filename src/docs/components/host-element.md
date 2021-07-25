---
title: Working with host elements
description: Working with host elements
url: /docs/host-element
contributors:
  - jthoms1
---

# 使用 host 元素

Stencil 组件在其 `render` 方法中[使用 JSX](templating-jsx) 以声明方式渲染其子组件。大多数时候，`render()` 函数描述了即将被渲染的子元素，但它也可以用来渲染宿主元素本身的属性。


## `<Host>`

`Host` 功能组件可用于渲染函数的根元素，以设置宿主元素本身的属性和事件侦听器。这就像任何其他 JSX 一样工作：

```tsx
// Host is imported from '@stencil/core'
import { Component, Host, h } from '@stencil/core';

@Component({tag: 'todo-list'})
export class TodoList {
  @Prop() open = false;
  render() {
    return (
      <Host
        aria-hidden={this.open ? 'false' : 'true'}
        class={{
          'todo-list': true,
          'is-open': this.open
        }}
      />
    )
  }
}
```

如果 `this.open === true`, 将渲染:
```tsx
<todo-list class="todo-list is-open" aria-hidden="false"></todo-list>
```

同理, 如果 `this.open === false`:

```tsx
<todo-list class="todo-list" aria-hidden="true"></todo-list>
```

`<Host>` 是一个虚拟组件，一个由 stencil 公开的虚拟 API，用于声明性地设置宿主元素的属性，它永远不会在 DOM 中呈现，即你永远不会在 Chrome Dev Tools 中看到 `<Host>` 实例。

### `<Host>` 可当做 `<Fragment>` 使用

`<Host>` 也可以在需要在根组件渲染多个组件时使用，例如：

通过类似这样的 `render()` 方法来实现：

```tsx
@Component({tag: 'my-cmp'})
export class MyCmp {
  render() {
    return (
      <Host>
        <h1>Title</h1>
        <p>Message</p>
      </Host>
    );
  }
}
```

此 JSX 将渲染以下 HTML：

```markup
<my-cmp>
  <h1>Title</h1>
  <p>Message</p>
</my-cmp>
```

即使我们不使用 `<Host>` 来渲染宿主元素中的任何属性，它也是一个有用的 API，可以在根元素渲染许多元素。
## Element 装饰器

`@Element()` 装饰器是用来访问类实例中的宿主元素。将返回一个 `HTMLElement` 的实例，因此可以在此处使用标准的 DOM 方法/事件。

```tsx
import { Element } from '@stencil/core';

...
export class TodoList {

  @Element() el: HTMLElement;

  getListHeight(): number {
    return this.el.getBoundingClientRect().height;
  }
}
```

如果您需要更新宿主元素以响应 `prop` 或 `state` 更改，您应该使用 `<Host>` 元素在 `render()` 方法中执行此操作。

## 样式

在 [样式页面](https://stenciljs.com/docs/styling#shadow-dom-in-stencil) 上查看有关样式的完整信息。

CSS 可以通过在 `@Component` 装饰器中定义的组件标签应用于 `<Host>` 元素。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css'
})
...
```

my-cmp.css:

```css
my-cmp {
  width: 100px;
}
```

### Shadow DOM

需要注意的是，在使用 shadow DOM 时对 `<Host>` 元素进行样式设置并不完全相同。你必须使用 `:host`，而不是使用 `my-cmp` 元素选择器。

```tsx
@Component({
  tag: 'my-cmp',
  styleUrl: 'my-cmp.css',
  shadow: true
})
...
```

my-cmp.css:

```css
:host {
  width: 100px;
}
```
