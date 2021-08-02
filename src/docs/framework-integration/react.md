---
title: React Integration with Stencil
description: React Integration with Stencil
url: /docs/react
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - ErikSchierboom
  - brentertz
  - danawoodman
---
# React

对于使用 `create-react-app` 脚本构建的应用程序，包含组件库的最简单方法是从 `index.js` 文件调用`defineCustomElements()`。请注意，在这种情况下，如果您的目标是 Edge 或 IE11，则需要 `applyPolyfills`。

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// test-component is the name of our made up Web Component that we have
// published to npm:
import { applyPolyfills, defineCustomElements } from 'test-components/loader';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

applyPolyfills().then(() => {
  defineCustomElements();
});
```

遵循上述步骤将使您的 Web 组件能够在 React 中使用，但是还必须考虑一些额外的复杂性。https://custom-elements-everywhere.com/ 包含当前问题的概要。

## 属性和事件

React 目前在使用标准 HTML 自定义元素时最大的缺陷是包含非标量数据（即不是字符串或数字的数据）的属性没有正确传递，自定义事件没有正确处理。 这两个问题的解决方案是将自定义元素包装在一个 React 组件中，获取自定义元素的 `ref`，并使用 `ref` 来设置非标量属性并通过 `addEventListener 添加事件监听器 `。 这是一个示例，展示了它如何用于属性传递：

```tsx
import React, { useRef, useEffect } from 'react';
import { Forecast } from '../models';
import { iconPaths } from '../util';

const DailyForecast: React.FC<{ forecast: Forecast; scale: string }> = ({ forecast, scale }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    (elementRef.current as any)!.iconPaths = iconPaths;
    (elementRef.current as any)!.forecasts = forecast;
  }, [forecast]);

  return <kws-daily-forecast scale={scale} ref={elementRef}></kws-daily-forecast>;
};

export default DailyForecast;
```

在这个例子中，有三个属性：`forecast` 是一个对象数组，`iconPaths` 是一个对象，而 `scale` 是一个字符串。 由于 `scale` 是一个字符串，所以可以正常处理。 但是，其他两个属性是非标量的，必须通过 `ref` 设置为自定义元素。 像这样包装自定义元素可以防止您必须为您可能需要的每个 `kws-daily-forecast` 实例获取 `ref`，因为您将改为使用 `DailyForecast` React 组件：

```tsx
<DailyForecast scale={scale} forecast={f}></DailyForecast>
```

## 绑定

在 React 组件中手动包装所有自定义元素是一种很好的做法，但很快就会变得乏味。 使用 Stencil 的绑定功能，基于 Stencil 的 Web 组件被包装在一个 React 组件中，使它们可以立即作为 React 组件使用。

Stencil 的 React 绑定修复了 React 的 Web 组件支持的主要问题，包括无法正确传递属性。开箱即用，React 只能将字符串和数字传递给组件，而不能侦听自定义事件。通过绑定，所有属性都可以正确传递，包括函数、对象和数组。绑定还通过创建一个名为“on<EventName>”的 `prop` 来处理自定义事件。最后，包含类型，使代码更可靠且更易于重构。这些特性允许 React 开发人员与 Web 组件交互，就好像它们是 React 组件一样。

### 起步

如果您要将 Stencil 组件编译为多个框架库，建议创建一个包含 Stencil 库和每个框架库的 monorepo 项目，以便于维护。 完整的参考项目见[stencil-ds-plugins-demo](https://github.com/ionic-team/stencil-ds-plugins-demo)。

在这个例子中，`component-library` 是一个 Stencil 库，`component-library-react` 是一个 React 库，其中将生成基于 Stencil 的 React 组件。

创建一个 monorepo 目录，然后将任何现有的 Stencil 组件存储库移动到 monorepo 项目中:

```bash
mkdir component-mono
mv component-library component-mono/component-library
```

### React 组件库设置

首先，我们需要设置包含 Stencil 生成的 React 组件的 React 库。您可以创建自己的 React 项目结构或使用 [Stencil React template repo](https://github.com/ionic-team/stencil-ds-react-template) 来引导它。建议这个 repo 作为你的 Stencil 组件库的兄弟，所以在 Stencil monorepo 中，克隆项目：

```bash
git clone https://github.com/ionic-team/stencil-ds-react-template
```

在 `package.json` 中，如果你已经在 npm 上发布了 Stencil 库，请将 `component-library` 依赖项名称更改为你的库名称，然后运行 `npm install`。

如果未在 npm 上发布任何库和/或您想在本地构建和测试，请删除 `component-library` 依赖项。接下来，切换到 Stencil 库目录并运行 `npm link`。改回 React 库并运行 `npm link <library>`，其中 `library` 是您的 Stencil 库名称。最后，运行 `npm install`。

### Stencil Config 设置

配置基本的 React 库后，下一步是配置 Stencil 以输出 React 组件。切换到您的 Stencil 组件库目录，然后安装 React 输出目标：

```bash
npm install @stencil/react-output-target --save-dev
```

接下来，打开 `stencil.config.ts` 然后将 React 添加到输出目标列表中：

```tsx
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'demo',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'component-library',
      proxiesFile: '../component-library-react/src/components.ts',
      includeDefineCustomElements: true,
    }),
    {
      type: 'dist',
    },
  ],
};
```

#### componentCorePackage

这是您的核心 Stencil 库的包名称，其中仅包含在 npm 上发布的 Web 组件。这个包被 React 包作为依赖项引用。例如，Ionic Framework 的核心库是`@ionic/core`，是`@ionic/react` 的一个依赖。

#### proxiesFile

这是由 outputTarget 生成的输出文件。此文件应引用不同的包位置。在这里的 monorepo 示例中，我们选择了同级目录的 src 目录 - stencil-ds-react-template - 包名为`component-library-react`。在 Stencil 构建期间，会创建一个 React 包，该包导出此文件中定义的所有组件。

#### includeDefineCustomElements

在此处指定 true（推荐）意味着使用 React 应用程序不必手动导入和调用 `index.js` 中的 `defineCustomElements()`。

配置 React 支持后，运行 `npm run build` 来创建 Stencil React 绑定。您将在 `component-library-react` 的 dist 文件夹中看到新生成的文件。

接下来，将目录更改为 `stencil-ds-react-template` 然后安装依赖项并构建项目：

```bash
npm install
npm run build
```

如果需要，可以在 npm 上发布 React 库，然后将其添加为项目依赖项。

如果你不想在 npm 上发布库、或者你想在 React 应用程序中本地构建和测试它，请使用 `npm link` 链接项目，然后将目录更改为你的 React 应用程序并运行 `npm link component-library-react`。

### 用法

由于 Stencil 生成的 React 库实际上是一个常规的 React 库，因此可以像使用任何 React 库一样使用它。 从包中导入组件：

```tsx
import { DemoComponent } from 'component-library-react';
```
