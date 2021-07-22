---
title: My First Component
description: My First Component
url: /docs/my-first-component
contributors:
  - jthoms1
  - simonhaenisch
---

# 第一个组件

Stencil 组件是通过添加一个带有 `.tsx` 扩展名的新文件来创建的，例如 `my-first-component.tsx`，并将它们放置在 `src/components` 目录中。
必须使用 `.tsx` ，因为 Stencil 组件是使用 [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) 和 TypeScript 构建的。

以下是 Stencil 组件的例子：

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-first-component',
})
export class MyComponent {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
```
> 没有彻底理解怎么去做？别担心，我们后面会解释每一个细节点。


经过编译，这个组件就可以像任何其他标签一样在 HTML 中使用。

```markup
<my-first-component name="Max"></my-first-component>
```

> Web Components 的标签中必须有一个 "-"。 `firstComponent` 会被识别为无效的标签名称。

当渲染后，浏览器将显示`My name is Max`。

## 这期间发生了什么?

让我们深入了解。

首先我们看到的是 `@Component` 装饰器。
该装饰器向 Stencil 编译器提供有关组件的元数据。
信息，例如要使用的标签和外部样式，可以在此处设置并由编译器获取。

 `@Component()` 下是标准的 JavaScript 类。
在这里，大量代码使 Stencil 组件栩栩如生。
您可以在此处编写函数或提供业务逻辑。

我们必须声明一个返回 JSX 的渲染函数,组件才能在屏幕上渲染。
如果您不确定 JSX 是什么，请不要担心，我们将在 <stencil-route-link url="/docs/templating">模板相关文档</stencil-route-link>。
简单的理解是我们的渲染函数需要返回一个渲染 DOM 的表达式。

类上的`name` 属性也应用了一个装饰器，`@Prop()`。
这个装饰器负责告诉编译器该属性对组件是公共的，并且应该由用户设置。
我们像这样设置属性：

```markup
<my-first-component name="Max"></my-first-component>
```
Any property decorated with `@Prop()` is also automatically watched for changes.
任何用 `@Prop()` 修饰的属性都会被监听修改。
如果 `name` 属性发生变更，组件将再次触发它的 `render` 函数，更新显示的内容。

## 组件生成器

Stencil CLI 可以为您生成新组件。如果你使用了其中的一个程序，你可以简单地在你的项目中运行 `generate` npm 脚本启动，这将启动模板生成器。

```shell
npm run generate
```

或者直接使用 `generate` 命令（简称 `g`）调用 Stencil CLI。如果没有全局安装 `stencil`，在命令前加上 `npx`。

```shell
stencil generate
```

您可以选择将组件标记名称直接传递给命令。请记住，组件标记名称需要小写并至少包含一个连字符。第二步，生成器会询问你要生成哪些文件。支持引导样式表以及规范和 e2e 测试以及组件文件。

组件都将 `src/components` 目录中生成。在其中，将创建一个与您提供的组件标记名称同名的文件夹，并在该文件夹中生成文件。也可以指定一个或多个子文件夹来生成组件。

例如，如果您指定 `pages/page-home` 作为组件标签名称，则文件将在 `src/components/pages/page-home` 中生成。

```shell
stencil generate pages/page-home
```

```plain
src
 |- components
     |- pages
         |- page-home
             |- page-home.css
             |- page-home.e2e.ts
             |- page-home.spec.ts
             |- page-home.tsx
```
