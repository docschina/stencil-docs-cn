---
title: Styling Components
description: Styling Components
url: /docs/styling
contributors:
  - jthoms1
  - shreeshbhat
---

# 样式组件

## Shadow DOM

### 什么是 Shadow DOM

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) 是一种内置于浏览器中的 API，允许进行 DOM 封装和样式封装。 Shadow DOM 将我们的组件与周围环境隔离开来。这意味着我们不需要担心我们的 CSS 的范围是否正确，也不需要担心我们的内部 DOM 会被我们组件之外的任何东西干扰。

### 浏览器支持

Shadow DOM 在下列浏览器中原生支持:

- Chrome
- Firefox
- Safari
- Opera

在不支持 Shadow DOM 的浏览器中，我们回退到 scoped-CSS。这为您提供了随 Shadow DOM 一起提供的样式封装，但无需加载巨大的 Shadow DOM polyfill。

> 对什么是作用域 CSS 感到困惑？别担心，我们会[稍后解释](#scoped-css) 详细说明。

### 在 Stencil 中的 Shadow DOM

Shadow DOM is not currently turned on by default for web components built with Stencil. To turn on Shadow DOM in a web component built with Stencil, you can use the `shadow` param in the component decorator. Below is an example of this:

对于使用 Stencil 构建的 Web 组件，Shadow DOM 默认未打开。如果需要打开，配置组件装饰器中的 `shadow` 参数。下面是一个例子：

```tsx
@Component({
  tag: 'shadow-component',
  styleUrl: 'shadow-component.css',
  shadow: true
})
export class ShadowComponent {

}
```

### Shadow DOM 的注意事项

- QuerySelector：当使用 Shadow DOM 并且您想查询 Web 组件内的元素时，您必须使用 `this.el.shadowRoot.querySelector()`。因为 Web 组件中的所有 DOM 都在 Shadow DOM 创建的 shadowRoot 中。

- 全局样式：要使用 Shadow DOM 对组件进行外部样式设置，您必须使用 [CSS 自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) 或建议的 [CSS Shadow Parts ]（https://meowni.ca/posts/part-theme-explainer/）。

- 通常，您会将样式包装在组件的标签名称中，如下所示：

```css
my-element {
  color: black;
}
my-element div {
  background: blue;
}
```

启用 Shadow DOM 后，shadow root 中的元素是有作用域的，并且组件外部的样式不适用。因此，组件内的 CSS 选择器可以被简化，上面的例子可以是：

```css
:host {
  color: black;
}
div {
  background: blue;
}
```

### 作用域 CSS

在当前不支持 Shadow DOM 的浏览器中，使用 Stencil 构建的 Web 组件将回退到使用作用域 CSS 而不是加载体积较大的 Shadow DOM polyfill。 Scoped CSS 通过在运行时为每个样式附加一个 data 属性来自动将 CSS 范围限定。

## 全局样式

虽然 Stencil 鼓励开发人员编写适用于每个组件的样式，但有时需要具有适用于整个文档的全局样式，而不管使用哪些组件。

为此，`stencil.config.ts` 带有一个可选的 [`globalStyle` 设置](https://stencil.docschina.org/docs/config#globalstyle)，它指向一个样式表路径。

```tsx
export const config: Config = {
  namespace: 'app',
  globalStyle: 'src/global/global.css',
  outputTarget: [{
    type: 'www'
  }]
}
```

编译器将在 `global.css` 上运行相同的压缩、自动前缀和插件，并为 [`www`](https://stencil.docschina.org/docs/www) 和 [`dist`](https ://stenciljs.com/docs/distribution) 输出目标。生成的文件将始终具有 `.css` 扩展名并被命名为指定的 `namespace`。

在上面的例子中，由于命名空间是`app`，生成的全局样式文件将位于：`./www/build/app.css`。

> 这个文件必须 **手动导入** 到你的应用程序的 `index.html` 中，你可以在 `src/index.html` 中找到它：

```tsx
<link rel="stylesheet" href="/build/app.css">
```

请记住，应该为 **global** 样式保留全局样式，即，您应该尽量避免使用它来设置组件的样式，相反，一些有趣的用例可以是：

- 主题：定义跨应用程序使用的 CSS 变量
- 使用 `@font-face` 加载字体
- 应用广泛的字体系列
- 样式正文背景
- CSS 重置


## CSS 变量

### 什么是 CSS 变量?

[CSS 变量](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) 很像 [Sass 变量](https://ionicframework.com/docs/theming/sass- variables/)，但内置于浏览器中。 CSS 变量允许您指定可在您的应用程序中使用的 CSS 属性。

### 用例

CSS 变量的一个用例是颜色。如果您的应用程序有一个主要品牌颜色在您的应用程序中使用，那么您可以为它创建一个变量，然后在应用程序中需要该颜色的任何地方使用该变量，而不是在应用程序中的每个地方都使用相同的颜色.此外，如果您需要更改此颜色，您只需更改变量，然后它就会在您的应用程序中更新。

### 在 Stencil 中使用 CSS 变量

以下是在 Stencil 中使用 CSS 变量的推荐步骤：

- 创建一个 CSS 文件来保存您的变量定义。我们通常建议在 `src/global/` 中创建一个 `variables.css` 文件
- 然后你可以把这个配置 `globalStyle: 'src/global/variables.css'` 放到你的 `stencil.config.ts` 文件中。

在此之后！就可以可以开始定义变量了。

### 定义 CSS Variables

这是定义 CSS 变量的示例：

```css
/* 在我们的文件 src/global/variables.css file 中 */ 

:root {
  --app-primary-color: #488aff;
}
```

在这个例子中，我们定义了一个名为 `--app-primary-color` 的 CSS 变量，它被设置为颜色 `#488aff`。这个例子中的 `:root` 选择器是一个 [CSS 伪类](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)，它定义了您的项目（通常是 `<html>`），以便该变量可以在您的应用程序中使用。

### 使用 CSS 变量

这是使用我们上面定义的 CSS 变量的示例：

```css
h1 {
  color: var(--app-primary-color)
}
```

这会将我们在 CSS 变量中定义的颜色（在本例中为 `#488aff`）应用到我们的 `h1` 元素。

### IE 兼容性


IE11 本身不支持 CSS 变量，但是 stencil 确实提供了 polyfill，然而 JS 不可能 polyfill CSS 功能。

对于原生支持它的浏览器，CSS 变量的模板 polyfill 有很多限制，并且会产生大量的性能开销。

- 全局 CSS 变量只能在 `:root` 或 `html` 中声明，它们不能是动态的。
- 只有 `shadow` 或 `scoped` 组件的样式表可以有动态 CSS 变量。
- 组件中的 CSS 变量只能在 `:host(...)` 选择器中定义。

```css
:host() {
  /* This works */
  --color: black;
}
:host(.white) {
  /* This works */
  --color: white;
}
.selector {
  /* This DOES NOT work in IE11 */
  --color: red;
}
```

- 组件中的 CSS 变量可以在任何选择器中使用 (`var(--thing)`)。

在 IE11 中使用 CSS 变量的性能开销在 CPU 时间和内存方面有所提升。这是因为为了“模拟”CSS 变量的动态特性，polyfill 需要动态生成不同的样式表 PER 实例。例如，如果 DOM 中有 200 个 `my-cmp` 元素，polyfill 将附加 200 个类似的 `<style>` 标签来为每个元素设置样式。

IE11 处理的样式表总量会快速增长，消耗大量内存，并且每次样式失效都需要大量 CPU。
