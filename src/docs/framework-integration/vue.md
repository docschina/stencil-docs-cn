---
title: VueJS Integration with Stencil
description: VueJS Integration with Stencil
url: /docs/vue
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - brysalazar12
  - iskanderbroere
---

# Vue

为了在 Vue 应用程序中使用自定义元素库，必须修改应用程序以定义自定义元素并通知 Vue 编译器在编译期间忽略哪些元素。 这一切都可以在 `main.js` 文件中完成。

假设你已经预先运行了 `npm install --save test-components`，并且 `test-component` 是我们发布到 npm 的组成的 Web 组件的名称，你将这些组件导入到 'main.js ' 文件中：

- 导入模块
- 告诉 Vue 忽略自定义元素标签 (参考 [docs](https://vuejs.org/v2/api/#ignoredElements))
- 将 Stenciljs 组件代码绑定到 window 对象

```tsx
import Vue from 'vue';
import App from './App.vue';

import { applyPolyfills, defineCustomElements } from 'test-components/loader';

Vue.config.productionTip = false;

// Tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed
// 'test'
Vue.config.ignoredElements = [/test-\w*/];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  render: h => h(App)
}).$mount('#app');
```

然后这些组件应该在任何 Vue 组件中可用

```tsx
render() {
  return (
    <div>
      <test-stencil-component></test-stencil-component>
    </div>
  )
}
```

Vue 提供了几种不同的方式来在应用程序中安装和使用框架。上述集成 Stencil 自定义元素库的技术已经在一个 Vue 应用程序上进行了测试，该应用程序使用 `vue-cli` 创建，ES2015 和 Webpack 作为主要选项。如果应用程序是使用其他选项生成的，类似的技术应该可以工作。
