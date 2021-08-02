---
title: Ember Integration with Stencil
description: Ember Integration with Stencil
url: /docs/ember
contributors:
  - jthoms1
  - adamdbradley
---

# Ember

多亏了 `ember-cli-stencil` 插件，在 Ember 中使用 Stencil 组件非常容易。它主要处理：

- 将所需文件导入您的 `vendor.js`
- 将组件定义复制到您的 `assets` 目录中
- 可选择性地生成包装器组件以提高与旧 Ember 版本的兼容性

首先安装 Ember 插件

```bash
ember install ember-cli-stencil
```

现在，当您构建应用程序时，您的依赖项中的 Stencil 集合将被自动发现并拉入您的应用程序。您可以开始使用您的 `hbs` 文件中的自定义元素，无需进一步的工作。有关更多信息，请查看 [`ember-cli-stencil` 文档](https://github.com/alexlafroscia/ember-cli-stencil)。
