---
title: Stencil - A Compiler for Web Components
description: Stencil has a number of add-ons that you can use with the build process.
url: /docs/introduction
contributors:
  - jthoms1
---

# Stencil: 用于生成 Web Components 和高性能 Web 应用程序的编译器

Stencil 是用来生成 Web Components（更具体来说就是自定义元素）并构建高性能的 Web 应用程序的编译器。 Stencil 将最流行框架的最佳概念组合成一个简单的构建时工具。

Stencil 具有一下功能：

- 虚拟 DOM
- 异步渲染（受 React Fiber 启发）
- 动态数据绑定
- TypeScript
- JSX
- 静态站点生成 (SSG)

然后生成包含这些功能的标准 Web Components 和 Web 应用程序。

Stencil 生成符合标准的 Web Components，因此它们可以直接与许多流行的框架一起使用，也可以在没有框架的情况下使用。 Stencil 还在 Web Components 之上启用了许多关键功能，特别是预渲染和对象作为属性（而不仅仅是字符串）。

与直接使用自定义元素相比，Stencil 提供了额外的 API，使编写快速组件变得更简单。虚拟 DOM、JSX 和异步渲染等 API 使得创建快速、强大的组件更加轻松，同时仍保持与 Web Components 的 100% 兼容性。

热更新和内置的 dev Server 也给开发人员带来了更好的体验。

同时 Stencil 也可用于构建高性能 Web 应用程序，提供高级功能，例如静态站点生成和强大的缓存。

## 为什么使用 Stencil?

Stencil 由 [Ionic Framework](http://ionicframework.com/) 创建，旨在帮助构建更快、更强大的组件，这些组件适用于所有主要框架。

虽然 Ionic 主要针对 Cordova 应用程序，但渐进式 Web 应用程序作为 Web 开发人员快速增长的目标的出现需要一种不同的 Web 应用程序开发性能方法。凭借 Ionic 对传统框架和捆绑技术的经典使用，该团队正在努力满足渐进式 Web 应用程序的延迟和代码大小需求，这些应用程序在快速和慢速网络上，跨各种平台和设备都运行良好。

此外，框架碎片化造成了 Web 开发互操作性的噩梦，导致一个框架构建的组件无法与另一个框架一起使用。

Web Components 为这两个问题提供了解决方案，将更多的工作推给浏览器以获得更好的性能，针对所有框架都可以使用的标准组件模型。

然而，仅靠 Web Components 是不够的。构建快速的 Web 应用程序需要以前锁定在传统 Web 框架内的创新。 Stencil 旨在将这些功能从传统框架中提取出来，并将它们带入快速新兴的 Web 组件标准。
