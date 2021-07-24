---
title: Decorators
description: Decorators
url: /docs/component
contributors:
  - jthoms1
---

# 组件装饰器

每个 Stencil 组件必须使用来自 `@stencil/core` 包的 `@Component()` 装饰器进行装饰。在最简单的情况下，开发人员必须为组件提供一个 HTML 标签名称。通常，还会使用`styleUrl`，或者`styleUrls`，其中可以为不同的应用程序模式/主题提供多个不同的样式表。

styleUrl(s) 需要使用 `.css` 文件的相对路径。

```tsx
import { Component } from '@stencil/core';

@Component({
  tag: 'todo-list',
  styleUrl: 'todo-list.css'
})
export class TodoList {

}
```

## 组件配置

`@Component(opts: ComponentOptions)` 需要一个包含所有组件级功能的必需对象。
`tag` 名称是唯一必需的属性，还有很多其他的属性：

```tsx
export interface ComponentOptions {
  /**
   * Web 组件的标记名称。原则上，标签名称必须是全局唯一的，
   * 因此，建议为同一集合中的所有组件选择唯一的前缀。
   *
   * 此外，标签名称必须包含“-”
   */
  tag: string;

  /**
   * 如果为“true”，则组件将使用作用域样式表。类似于 shadow-dom，
   * 但没有原生隔离。默认为`false`。
   */
  scoped?: boolean;

  /**
   * 如果为 true ，组件将使用原生 shadow-dom 封装，如果浏览器将回退到作用域样式
   * 对于不支持 shadow-dom 的环境，默认为`false`。
   */
  shadow?: boolean;

  /**
   * 某些外部样式表文件的相对 URL。它应该是一个 `.css` 文件，除非有
   * 外部插件像`@stencil/sass`。
   */
  styleUrl?: string;

  /**
   * 与 styleUrl 类似，但允许为不同的模式指定不同的样式文件。
   */
  styleUrls?: string[] | d.ModeStyles;

  /**
   * 包含内联 CSS 而不是使用外部样式表的字符串。
   * 性能特征与使用外部样式表相同。
   *
   * 注意，不能使用 sass，或 less，只允许使用 `styles` 的 `css`，如果需要更高级的功能，请使用 `styleUrl`。
   */
  styles?: string;

  /**
   * 包含组件所需资源文件夹相关链接的数组。
   */
  assetsDirs?: string[];

  /**
   * @deprecated 改用`assetsDirs`
   */
  assetsDir?: string;
}
```


## 嵌入或嵌套组件

通过将 HTML 标签添加到 JSX 代码，可以轻松组合组件。由于组件只是 HTML 标记，因此无需导入任何内容即可在另一个 Stencil 组件中使用 Stencil 组件。

这是在另一个组件中使用一个组件的示例：

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-embedded-component'
})
export class MyEmbeddedComponent {
  @Prop() color: string = 'blue';

  render() {
    return (
      <div>My favorite color is {this.color}</div>
    );
  }
}
```

```tsx
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-parent-component'
})
export class MyParentComponent {

  render() {
    return (
      <div>
        <my-embedded-component color="red"></my-embedded-component>
      </div>
    );
  }
}
```

`my-parent-component` 在 `render()` 函数中包含对 `my-embedded-component` 的嵌套使用。
