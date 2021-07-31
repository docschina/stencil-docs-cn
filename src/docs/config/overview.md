---
title: 配置
description: 配置
url: /docs/config
contributors:
  - adamdbradley
  - jthoms1
  - flawyte
  - BDav24
  - simonhaenisch
---

# Stencil 配置

在大多数情况下，`stencil.config.ts` 文件不需要任何自定义配置，因为 Stencil 已配置默认值以保证开箱即用。一般来说，最好将配置保持尽可能小。甚至可以完全删除 `stencil.config.ts` 文件，应用程序依然会编译得很好。但同时，编译器可以使用此配置在最低级别进行配置。以下是许多*可选* 配置属性。

举例 `stencil.config.ts`:

```tsx
import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'MyApp',
  srcDir: 'src'
};
```

## 生成 es5

配置是否应生成 ES5 。默认为 `false`，设置为 `true` 开发和生产模式将使用 es5 构建 。将 `buildEs5` 设置为 `prod` 只会在 prod 模式下构建 ES5。基本上，如果应用程序不需要在旧版浏览器（IE11 和 Edge 18 及以下）上运行，则分别使用默认设置是安全的，`buildEs5` 设置为 `false`，这也将加快生产构建时间。除了创建 es5 构建之外，你可能还对其他 __兼容__ 老版本浏览器的配置感兴趣。相关关更多信息，请参阅 [配置 extras](/docs/config-extras)。

```tsx
buildEs5: boolean | 'prod'
```

## bundles

默认情况下，Stencil 将静态分析应用程序并生成所有组件如何互连的组件图。从组件图中，能够最好地决定如何根据组件在应用程序中彼此的使用情况进行分组。通过这样做，它能够将组件捆绑在一起以减少网络请求。而且可以使用 `bundles` 配置手动生成包。

`bundles` 配置是一个对象数组，表示组件如何在延迟加载的包中组合在一起。这个配置很少需要，因为 Stencil 一般都会自动处理。

```tsx
bundles: [
  { components: ['ion-button'] },
  { components: ['ion-card', 'ion-card-header'] }
]
```


## enableCache

*默认值: `true`*

Stencil 将缓存构建结果以加快重载速度。要禁用此功能，请将 `enableCache` 设置为 `false`。

```tsx
enableCache: true
```


## globalScript

全局脚本配置选项为文件路径的字符串。

全局脚本在您的库/应用程序加载之前运行一次，因此您可以执行一些操作，例如设置与外部服务的连接或配置您正在使用的库。

要执行的代码应放置在由全局脚本导出的默认函数中。确保全局脚本中的所有代码都包含在导出的函数中：

```javascript
export default function() { // or export default async function()
  initServerConnection();
}
```

> 导出的函数需要是异步的。

## globalStyle

Stencil 通常将多个组件编译到一个应用程序时，每个组件都有自己的分隔样式。但是，在所有组件和网站中具有“全局”样式的情况仍然很常见。全局 CSS 文件通常可用于设置 [CSS 变量](../components/styling)。

此外，`globalStyle` 配置可用于使用 Sass、PostCss 等预编译样式。

下面是一个示例文件夹结构，其中包含一个名为 `app.css` 的 webapp 全局 css 文件。

```bash
src/
  components/
  global/
    app.css
```

全局样式配置为文件路径的字符串。此构建的输出将转到 `buildDir`。在这个例子中，它会被保存到 `www/build/app.css`。

```tsx
globalStyle: 'src/global/app.css'
```

Check out the [styling docs](https://stencil.docschina.org/docs/styling#global-styles) of how to use global styles in your app.


## hashFileNames

*默认: `true`*

在生产构建期间，每个生成的文件的内容都经过哈希处理以表示内容，并将哈希值用作文件名。如果内容在构建之间没有更新，那么它会收到相同的文件名。当内容更新时，文件名就不同了。通过这样做，已部署的应用程序可以“永久缓存”构建目录并充分利用内容交付网络 (CDN) 和大量缓存文件以实现更快的应用程序。

```tsx
hashFileNames: true
```


## hashedFileNameLength

*默认: `8`*

当 `hashFileNames` 配置设置为 `true` 并且它是一个生产构建时，`hashedFileNameLength` 配置用于确定文件名的哈希值应该是多少个字符。

```tsx
hashedFileNameLength: 8
```


## namespace

*默认: `App`*

`namespace` 配置值是一个 `string`，表示应用程序的命名空间。对于不打算成为可重用组件库的应用程序，`App` 的默认值就可以了。但是，如果应用程序打算作为第三方库使用，例如 `Ionic`，则需要一个唯一的命名空间。

```tsx
namespace: "Ionic"
```


## outputTargets

请参阅[输出文档](/docs/output-targets)。


## plugins

请查阅 [Plugin 文档](/docs/plugins)。


## devServer

请查阅 [Dev-Server 文档](/docs/dev-server)。


## preamble

*默认: `undefined`*

`preamble` 配置值为一个 `string`，表示构建的主文件中的前导码。帮助保留横幅或添加有关生成的构建的相关信息。

```tsx
preamble: 'Built with Stencil'
```


## srcDir

*默认值: `src`*

`srcDir` 配置指定应该包含每个组件的源打字稿文件的目录。 Stencil 应用程序的标准是使用 `src`，这是默认值。

```tsx
srcDir: 'src'
```


## taskQueue

*默认: `async`*

设置模板运行时使用的任务队列。任务队列调度 DOM 读写
跨帧有效渲染并减少布局抖动。默认情况下，
使用 `async` 来设置决定哪个有效
最适合您的用例。在所有情况下，如果您的应用程序有许多 CPU 密集型任务导致
主线程定期锁定，总是建议尝试
[Web Workers](https://stencil.docschina.org/docs/web-workers) 用于这些任务。

* `congestionAsync`：DOM 读写被安排在下一帧以防止布局颠簸。当应用程序任务繁重并且队列变得拥挤时，它将
  将工作拆分到多个帧以防止阻塞主线程。然而，它可以在某些情况下还会引入不必要的回流，尤其是在启动期间。 `拥塞异步`
  非常适合运行动画同时执行密集任务的应用程序
  这可能会锁定主线程。

* `async`：DOM 读取和写入被安排在下一帧以防止布局抖动。在密集的 CPU 任务期间，它不会重新安排渲染发生在下一帧。
  `async` 是大多数应用程序的理想选择，如果应用程序有许多密集型任务导致主线程锁定，建议
  尝试【Web Workers】(https://stencil.docschina.org/docs/web-workers)而不是阻塞异步队列。

* `immediate`：使 writeTask() 和 readTask() 回调同步执行。任务没有安排在下一帧中运行，但请注意至少有一个微任务。
  “立即”设置非常适合不提供长时间运行和流畅的应用程序动画。像异步设置一样，如果应用程序有导致主线程的密集任务
  锁定，建议尝试[Web Workers]（https://stencil.docschina.org/docs/web-workers）。

```tsx
taskQueue: 'async'
```

## testing

请查阅 [testing config 文档](/docs/testing-config)。


## extras

请查阅 [Extras 文档](/docs/config-extras)。
