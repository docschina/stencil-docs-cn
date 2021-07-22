---
title: Getting Started
description: Getting Started
url: /docs/getting-started
contributors:
  - jthoms1
---

# 快速开始

## 开始一个新项目

Stencil 需要最新的 LTS 版本 [NodeJS](https://nodejs.org/) 和 npm。在开始之前，请确保您已经安装和/或更新了 Node。

> 需要使用 npm 6及以上版本。

```bash
 npm init stencil
```

Stencil 可用于创建独立组件或整个应用程序。运行init后,您将收到一个提示，以便您可以选择要启动的项目类型。

```bash
? Pick a starter › - Use arrow-keys. Return to submit.

❯  ionic-pwa     Everything you need to build fast, production ready PWAs
   app           Minimal starter for building a Stencil app or website
   component     Collection of web components that can be used anywhere
```


## 更新 Stencil

要获得最新版本的 @stencil/core，您可以运行：

```bash
npm install @stencil/core@latest --save-exact
```
