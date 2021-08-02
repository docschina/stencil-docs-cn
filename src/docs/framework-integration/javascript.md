---
title: Components without a Framework
description: Components without a Framework
url: /docs/javascript
contributors:
  - mhartington
  - jthoms1
  - adamdbradley
  - BDav24
---

# 不依赖框架的组件

将使用 Stencil 构建的组件集成到没有 JavaScript 框架的项目中是很简单的。如果您使用的是简单的 HTML 页面，您可以通过脚本标签添加您的组件。例如，如果我们向 npm 发布了一个组件，我们可以像这样通过 CDN 加载该组件：

```markup
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic.js"></script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

或者，如果您想利用 ES 模块，您可以使用 import 语句包含组件。 _注意 type="module" 仅适用于现代浏览器（不适用于 IE11 或 Edge 12-18）。_

```markup
<html>
  <head>
    <script type="module">
      import { defineCustomElements } from 'https://cdn.jsdelivr.net/npm/@ionic/core/loader/index.es2017.mjs';
      defineCustomElements();
    </script>
  </head>
  <body>
    <ion-toggle></ion-toggle>
  </body>
</html>
```

## 从非 JSX 元素传递对象 prop

### 手动设置 prop

```tsx
import { Prop } from '@stencil/core';

export class TodoList {
  @Prop() myObject: object;
  @Prop() myArray: Array<string>;
}
```

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.myObject = {};
  todoListElement.myArray = [];
</script>
```

### 监听 prop 的改变

```tsx
import { Prop, State, Watch } from '@stencil/core';

export class TodoList {
  @Prop() myObject: string;
  @Prop() myArray: string;
  @State() myInnerObject: object;
  @State() myInnerArray: Array<string>;

  componentWillLoad() {
    this.parseMyObjectProp(this.myObject);
    this.parseMyArrayProp(this.myArray);
  }

  @Watch('myObject')
  parseMyObjectProp(newValue: string) {
    if (newValue) this.myInnerObject = JSON.parse(newValue);
  }

  @Watch('myArray')
  parseMyArrayProp(newValue: string) {
    if (newValue) this.myInnerArray = JSON.parse(newValue);
  }
}
```

```tsx
<todo-list my-object="{}" my-array="[]"></todo-list>
```
