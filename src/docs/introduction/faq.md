---
title: Stencil Frequently Asked Questions
description: Stencil is a developer-focused toolchain for building reusable, scalable component libraries, applications and design systems.
url: /docs/faq
contributors:
  - adamdbradley
---

# FAQ

## 介绍

### Stencil 是什么？

Stencil 是一个以开发人员为中心的工具链，用于构建可复用、可扩展的组件库、应用程序和设计系统。它提供了一个编译器，可以生成高度优化的 Web Components 组件，并将最流行框架的最佳概念结合到一个简单的构建时工具中。

Stencil 专注于使用 Web 标准构建组件。它被世界各地的开发人员和组织使用，并且是 [100% 免费并且 MIT 开源](https://github.com/ionic-team/stencil/blob/master/LICENSE.md)。

### Stencil 做了什么？

Stencil 帮助开发人员和团队构建和共享自定义组件。由于 Stencil 生成符合标准的 Web Components， Stencil 构建的组件可以直接与许多流行的框架一起使用，甚至可以在没有框架的情况下使用，因为它们只是 Web Components。 Stencil 还在 Web Components 之上启用了许多关键功能，特别是预渲染和对象作为属性传递（而不仅仅是字符串）。


### Stencil 的用户是谁？

Stencil 适用于希望构建可跨团队、框架和大型组织共享的自定义组件库和设计系统的开发人员和团队。

设计师也可以使用 Stencil，满足将他们的原始设计愿景以高保真度始终如一地交付给所有用户的需求。


### Stencil 的作者是谁？

Stencil 是一个由 [Ionic 核心团队](https://ionicframework.com/) 发起的开源项目，以及来自社区的贡献。

### 为什么制作 Stencil ？

Stencil 由 Ionic Framework 团队创建，旨在使我们自己的组件库更快、更小并与所有主要框架兼容。 Web Components 提供了一种解决方案，将更多的工作推给浏览器以获得更好的性能，并针对所有框架都可以使用的基于标准的组件模型。


### 谁在用 Stencil？

Stencil 最初是为 Ionic Framework 开发的，并且已经是一个非常成功的基于 WebComponents 的设计系统/UI 框架。 Web Components 现在在数以千计的应用商店应用中，并且每年有近 400 万个新的 Ionic Framework 项目被创建。


### Stencil 与传统框架相比如何？

Web Component 生态系统有各种各样的参与者，每个参与者对 Web Components 可以做什么和应该做什么都有不同的长期愿景。

有些人认为 Web Components 应该取代第三方应用程序框架，而另一些人则认为 Web Components 更适合样式设计节点，不应该参与应用程序组件系统的业务。也有许多框架开发人员没有看到 Web Components 的意义，或者认为它们是对前端创新的侮辱。

有了 Stencil，我们的愿景就在中间。从长远来看，应用开发团队继续使用他们选择的框架。我们设想这些框架会继续变得更好、更小、更高效，对定位和使用 Web Components 的支持越来越好——随着公司继续将它们用于共享设计系统，大型团队将使用越来越多的 Web 组件。

与此同时，我们认为 Web Components 不可或缺的功能是解决那些组件分布和设计系统问题。然而，我们也相信 90% 的市场一开始都没有这些问题，所以目前关于 Web Components 优点的争论有点徒劳。


### 为什么 Stencil 被认为与框架无关？

也许 Web Components 最吸引人的好处是它们让您的开发团队能够灵活地选择底层工具和框架——以及这些框架的版本——以及他们喜欢的工具。如前所述，实现通用设计系统的一大挑战是让您的所有开发团队仅对一组技术进行标准化。有了 Web Components，每个团队都可以使用最适合他们的东西，让他们完全自由地使用他们喜欢的工具——无论是现在还是未来。


## Stencil 提供了什么？

### Stencil 有组件库吗？

使用最广泛的 Stencil 组件库是 Ionic Framework，但 Stencil 本身只是一个工具链，并没有提供自己的组件库。如果您正在构建应用程序，我们鼓励您首先查看 Ionic 组件。


### Stencil 是一个框架吗？

Stencil 有意不充当独立框架，而是一种工具，它允许开发人员在许多项目、团队和大型组织中扩展与框架无关的组件。 Stencil 的超能力之一是它的灵活性：它的组件可以独立使用，也可以在传统框架中使用。


### Stencil 是否带有测试框架？

是的，Stencil 为单元测试和端到端测试提供了一组丰富的 API。 [了解有关使用 Stencil 进行测试的更多信息](/docs/testing-overview)。



## 技术


### 为什么 Stencil 使用 web components ？

通过使用一致的 Web 标准，Web Components 不依赖于特定的框架运行时来执行。随着框架更改其 API，Web Components 不会更改，从而允许原始源继续在浏览器中本地工作。

尽管我们喜欢今天的热门框架，但谁知道明天会带来什么？通过选择 Web Components，您可以帮助自己免受技术流失的威胁。


### Stencil 如何优化组件文件大小和启动？

传统框架提供运行时 API，开发人员可以选择每个组件使用哪些 API。但是，这意味着每个功能都需要对每个组件可用，以防组件可能会或可能不会使用 API。

使用 Stencil，编译器能够对每个组件执行静态分析，以了解正在使用和未使用哪些 API。通过这样做，Stencil 能够自定义每个构建以准确使用每个组件所需的内容，从而以实现组件的运行时高度优化和最小的尺寸。

由于 Stencil 使用编译器，因此可以在新的改进和功能可用时调整代码。源代码可以继续使用相同的公共 API 和语法编写，而编译器可以调整代码以进一步利用现代功能，而无需重新编写。


### Stencil 使用什么模板语法？

Stencil 并没有创造另一种需要记录和学习的模板语法，而是选择了可以说是最常用的模板语法：JSX。由于 React 的流行，全球数以百万计的开发人员已经熟悉 JSX，这使得开发人员更容易快速上手 Stencil。此外，使用传统的运行时模板语法，API 的任何更改通常都需要重写组件。

需要注意的是，JSX 和 VDom 不一定是同一个东西。一个是模板语法（JSX），另一个是渲染器（VDom）。 Stencil 使用了一个更小且高度优化的 VDom，但是渲染器的“如何”工作和要进行的改进都在 JSX 之后。所有这一切都是为了编译器的优势，允许用户使用众所周知的 JSX 语法编写代码，同时让内部结构进一步优化。


### 为什么 Stencil 允许延迟加载组件？

延迟加载组件有助于减少应用程序启动时间、减小包大小并改进分发。

例如，Ionic Framework 包含近 100 个 UI 组件，这些组件都是使用 Stencil 构建的。如果没有延迟加载，Ionic 的入口文件大约为 800kb。使用延迟加载，所有 Ionic 的脚本只有 5kb。这包括用于 iOS 和 Material Design 以及动画和手势库的组件。由于 Ionic 能够动态加载使用的内容，启动时间大大减少，用户只加载应用程序第一次绘制所需的内容。

同时，使用 Stencil 构建的组件仍然可以被传统打包器导入和使用。它们也可以被预渲染（包括 shadow dom）在 Node 环境中运行，并且可以在任何框架中使用。

组件库的使用者可能会使用一个组件、几个组件或所有组件。在任何这些场景中，只需添加脚本标签即可使用组件库，延迟加载可确保快速启动且带宽占用低。

你还可以在 [如何使用 Stencil 延迟加载 Web 组件](/blog/how-lazy-loading-web-components-work) 中了解有关延迟加载的更多信息。


### 为什么 Stencil 不扩展 HTMLElement？

Web Component 规范的一部分是扩展 HTMLElement 。但是，由于一些原因，Stencil 不需要这样做。具体来说，HTMLElement 将源代码锁定为仅在浏览器中工作，而不是使逻辑不受任何 API 的影响。 Stencil 编译器能够针对不同的输出目标优化许多不同版本的组件，一种简化方法是将 HTMLElement 排除在外。


### 为什么 Stencil 组件是用 TypeScript 编写的？

Stencil 最初是为 Ionic 构建的，根据我们的经验，TypeScript 是在多个团队之间维护大型代码库的宝贵工具。


### Stencil 运行时有哪些依赖项？

没有任何依赖项。 Stencil 生成的代码不依赖于 Stencil，而是生成高度优化的、无框架的、独立的代码，在浏览器中本地运行。


### Stencil 编译器有哪些依赖项？

TypeScript ， 仅此此而已。


### 数据可以传递给 Web Components 吗？

就像网页中的任何其他 DOM 元素一样，任何以数组、对象、字符串和数字形式存在的数据都可以传递给元素属性。 Stencil 是从头开始设计的，以确保应用程序开发人员可以解锁此功能。

错误地声称只有字符串可以传递给自定义元素的一种误解来自 React 的 VDom 版本。开箱即用，React 只能将字符串和数字传递给组件，而不能侦听自定义事件。使用 Stencil，组件看起来就像是 React 组件，并且所有属性都可以正确传递，包括函数、对象和数组。绑定还通过创建一个名为“on<EventName>”的道具来处理自定义事件。这些允许 React 开发人员与 Web 组件交互，就好像它们是 React 组件一样。


### Stencil 是用什么技术构建的？

Stencil 编译器是用 TypeScript 构建的，并且 [发布在 npm 上](https://www.npmjs.com/package/@stencil/core)。它的发行版包括类型，使开发人员可以更轻松地使用 Stencil API。


## 能力

### 在哪里可以使用 Stencil 组件？

使用 Web Components 的一大优势是您的组件库将适用于所有项目，而不仅仅是桌面 Web 应用程序。

例如，使用像 Ionic 这样的混合移动框架，您可以在几乎任何平台或设备上部署 Web 组件，从原生 iOS 和 Android 应用程序，到 Electron 和桌面 Web 应用程序，甚至是渐进式 Web 应用程序。


### Web Components 有哪些限制？

[Web 组件](https://developer.mozilla.org/en-US/docs/Web/Web_Components) 规范是很基础的，本身不提供框架质量的开发人员体验。 Web Components 运行在一组相当原始的标准上，因此您需要一点帮助才能使它们满足您的目标。

其中一些限制包括：

当尝试在应用程序中使用纯原生 Web Components 时，默认情况下不支持服务器端渲染和渐进增强等功能，并且
一些过时的客户端不支持 Web Components 标准。

此外，虽然 Web Components 在技术上适用于任何框架，但存在一些限制，例如缺乏类型支持和输入绑定，以及将属性传递给组件的挑战，如上所述。

好消息是，在 Stencil 等开源工具的帮助下，可以克服所有这些挑战。 Stencil 包含 Angular、React 和 Vue 的框架绑定，因此您可以轻松地将 Web 组件库导入任何框架，并像它们在该框架中一样与它们进行交互，并使用您习惯的所有功能。

### 什么是框架绑定？

虽然 Web Components 可以与任何 JavaScript 框架配对，但 Stencil 具有内置的专用绑定，可提供企业团队在使用 Angular、React 和 Vue 构建应用程序时所需要的更高级的功能。

### Stencil 为 Web Components 添加了哪些功能？

Web Components 本身不足以提供高质量的开发体验。构建快速的 Web 应用程序需要在之前闭锁的传统 Web 框架内的创新。 Stencil 旨在将这些功能从传统框架中提取出来，并将它们带入快速新兴的 Web Component 标准组件。

与直接使用 Web Components 相比，Stencil 提供了额外的 API，使编写快速组件变得更简单。虚拟 DOM、JSX 和异步渲染等 API 使快速、强大的组件易于创建，同时仍保持与 Web Components 的 100% 兼容性。


### 哪些浏览器可以支持 Stencil 组件？

Stencil 适用于现代浏览器和 Internet Explorer 11。

[了解有关浏览器支持的更多信息](/docs/browser-support)。


### Stencil 提供哪些 polyfills？

为了让 Stencil 在 Internet Explorer 11 及更高版本上运行，需要一些 polyfill。幸运的是，Stencil 对于现代浏览器不必下载任何 polyfill。

此外，现代浏览器能够在本地使用最新功能，而无需转换为 ES5（并使代码更易于调试）。例如，所有 ES 2017 功能（如 async/await）均在本机运行。

## Stencil 项目

### 我可以从哪里获得支持？

如果这是您第一次构建设计系统，或者您是 Stencil 的新手，请[联系](https://ionicframework.com/sales?product_of_interest=Design%20Systems) 与我们的一位解决方案工程师进行咨询了解如何实现目标并充分利用平台。

### 我如何参与？

Stencil 是一个开源项目，我们鼓励您做出贡献。您可以首先在 GitHub 上创建问题、提交功能请求并帮助解决错误。如果您对贡献感兴趣，请参阅我们的 [贡献者指南](https://github.com/ionic-team/ionic/blob/master/.github/CONTRIBUTING.md) 并查看我们的 [问题跟踪器]( https://github.com/ionic-team/stencil/issues）。


### Stencil 是开源的吗？

是的，Stencil 是开源的，其源代码可以在 [GitHub 上找到](https://github.com/ionic-team/stencil)。欢迎来自社区的贡献。

### Stencil 使用哪个软件许可协议？

Stencil 的软件 [许可协议是 MIT](https://github.com/ionic-team/stencil/blob/master/LICENSE)。


### 谁负责 Stencil 的工作？

大部分开发工作由 [Ionic](https://github.com/ionic-team/ionic) 的工程师完成。如果您对 Stencil 感到兴奋，我们鼓励您加入社区并做出贡献！最好的开始是 [Stencil Slack Channel](https://stencil-worldwide.herokuapp.com/)。

