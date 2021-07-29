---
title: Framework bindings
description: Framework bindings
url: /docs/framework-bindings
contributors:
  - manucorporat
---

# 框架绑定

不幸的是，将 Web 组件集成到现有应用程序中的体验有时会很棘手。有关此内容的更多信息，请访问 [https://custom-elements-everywhere.com/](https://custom-elements-everywhere.com/)。为了适应各种问题，Stencil 团队创建了新的输出目标插件，以简化流程。

插件为包含的每个框架绑定添加额外的输出目标。这个输出目标将发出一个原生的 angular/react/vue 库，就像你的组件最初是使用这些框架中的任何一个编写的一样。

通过使用 stencil 绑定，您可以构建一次组件，并且 stencil 将发出 angular/react/vue 库，这样组件的使用者就可以享受所有框架功能。

这是一个使用插件的示例项目存储库以供参考：https://github.com/ionic-team/stencil-ds-plugins-demo

- [Angular 绑定](/docs/angular#bindings)
- [React 绑定](/docs/react#bindings)


