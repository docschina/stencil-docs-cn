---
title: Stencil Web Component Browser Support
description: Out-of-the-box browser support provided by Stencil web components.
url: /docs/browser-support
contributors:
  - adamdbradley
  - kevinports
  - jthoms1
  - arjunyel
---

# 浏览器的支持

Stencil 构建了在所有广泛使用的桌面和移动浏览器中本地或接近本地运行的 Web 组件。

<div class="bs-chart">
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Chrome 60+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Safari 10.1+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Firefox 63+
      </div>
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        Edge 79+
      </div>
    </div>
    <div class="bs-chart__group-label">
      全部原生支持
    </div>
  </div>
  <div class="bs-chart__group">
    <div class="bs-chart__cards">
      <div class="bs-chart__card">
        <app-icon name="checkmark"></app-icon>
        IE 11, Edge 16-18
      </div>
    </div>
    <div class="bs-chart__group-label">
      通过 polyfills 支持
    </div>
  </div>
</div>

Web Components 是一组以 Custom Elements v1 规范为中心的标准化浏览器 API，这是一种跨浏览器方式来定义和创建本质上新的 HTML 标签，并且是现已失效的 v0 规范的继承者。

Chrome、Firefox 和 Safari（包括 iOS）原生支持 Custom Elements！ Edge 中的支持目前正在开发中。

对于没有原生支持的浏览器，可以帮助开发人员可以通过 polyfill 无缝地使用自定义元素，并且性能开销很小。

Stencil 使用动态 loader 仅在需要它的浏览器上加载自定义元素 polyfill。有了这个 polyfill，Stencil 的浏览器支持 Chrome（和所有基于 chrome 的浏览器）、Safari、Firefox、Edge 和 IE11。

|                                                                | Chrome 60+                             | Safari 10.1+                           | Firefox 63+                            | Edge 79+                               | Edge 16-18                             | IE 11                               |
| -------------------------------------------------------------- | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :---------------------------------: |
| [CSS Variables](https://caniuse.com/#feat=css-variables)       | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon> |
| [Custom Elements](https://caniuse.com/#feat=custom-elementsv1) | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon>    | <app-icon name="circle"></app-icon> |
| [Shadow Dom](https://caniuse.com/#feat=shadowdomv1)            | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon>    | <app-icon name="circle"></app-icon> |
| [es2017](https://caniuse.com/#feat=async-functions)            | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon> |
| [ES Modules](https://caniuse.com/#feat=es6-module)             | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="checkmark"></app-icon> | <app-icon name="circle"></app-icon> |

<div class="align-right">
  <app-icon name="circle"></app-icon> <span class="caption">Stencil compiles with polyfills for features not supported natively</span>
</div>

<style>
  .bs-chart,
.bs-chart__cards,
.bs-chart__card {
  display: flex;
}

.bs-chart {
  margin: 40px 0;
  justify-content: space-between;
}

.bs-chart__group + .bs-chart__group,
.bs-chart__card + .bs-chart__card {
  margin-left: 8px;
}

.bs-chart__group:first-child .bs-chart__card {
  background: #39B54A;
}

.bs-chart__group:last-child .bs-chart__card {
  background: #96D01A;
}

.bs-chart__card {
  width: 110px;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  color: #fff;
  padding: 8px;
  font-size: 11px;
  font-weight: 600;
}

.bs-chart__card app-icon {
  background: rgba(255, 255, 255, 0.15);
  padding: 8px;
  border-radius: 100px;
  margin: 6px 0 8px;
}

.bs-chart__card app-icon svg {
  fill: #fff;
}

.bs-chart__group-label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #646464;
  margin-top: 6px;
}

@media screen and (max-width: 872px) {
  .bs-chart__card {
    width: 100%;
  }

  .bs-chart,
  .bs-chart__group,
  .bs-chart__cards {
    flex-direction: column;
  }

  .bs-chart__group + .bs-chart__group {
    margin-left: 0;
    margin-top: 20px;
  }

  .bs-chart__card + .bs-chart__card {
    margin-left: 0;
    margin-top: 8px;
  }
}
</style>