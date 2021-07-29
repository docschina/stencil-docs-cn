---
title: Angular Integration with Stencil
description: Angular Integration with Stencil
url: /docs/angular
contributors:
  - jthoms1
  - adamdbradley
  - kensodemann
  - peterpeterparker
  - jeanbenitez
  - mburger81
---

# Angular

在 Angular CLI 项目中使用 Stencil 构建的 Web 组件集合是一个两步过程。 我们需要：

1. 在使用组件的模块中包含 `CUSTOM_ELEMENTS_SCHEMA`。
2. 从 `main.ts` (或其它合适的地方) 调用 `defineCustomElements()`。

## 包含 Custom Elements Schema

在模块中包含 `CUSTOM_ELEMENTS_SCHEMA` 允许在 HTML 标记中使用 web 组件，而编译器不会产生错误。此代码应添加到`AppModule` 和使用您的自定义元素的所有其他模块中。
这是将其添加到 `AppModule` 的示例：

```tsx
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

`CUSTOM_ELEMENTS_SCHEMA` 需要包含在任何使用自定义元素的模块中。

## 调用 defineCustomElements

使用 Stencil 构建的组件集合包含一个 main 函数，用于加载集合中的组件。 该函数称为`defineCustomElements()`，需要在应用程序引导期间调用一次。 一个方便的地方是在 `main.ts` 中：

```tsx
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: loader import location set using "esmLoaderPath" within the output target config
import { defineCustomElements } from 'test-components/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements();
```

## Edge 和 IE11 polyfills

如果您希望您的自定义元素能够在旧浏览器上工作，您应该添加围绕 `defineCustomElements()` 函数的 `applyPolyfills()`。

```tsx
import { applyPolyfills, defineCustomElements } from 'test-components/loader';
...
applyPolyfills().then(() => {
  defineCustomElements()
})

```

## 使用 ViewChild 和 ViewChildren 访问组件

包含后，可以使用 `ViewChild` 和 `ViewChildren` 在您的代码中引用组件，如下例所示：

```tsx
import {Component, ElementRef, ViewChild} from '@angular/core';

import 'test-components';

@Component({
    selector: 'app-home',
    template: `<test-components #test></test-components>`,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    @ViewChild('test') myTestComponent: ElementRef<HTMLTestComponentElement>;

    async onAction() {
        await this.myTestComponent.nativeElement.testComponentMethod();
    }
}

```

## 绑定

Angular 在与 Web 组件集成方面有一个很好的故事，但在开发人员体验方面存在一些问题。通过绑定，Web 组件被包裹在一个 Angular 组件中，然后立即作为 Angular 组件可用。这样做的一些优点是您可以获得组件的类型，并且您还可以在输入上使用 ngmodel。然后，您的开发人员从 Angular 应用程序中使用您的 Web 组件会导入一个实际的 Angular 库，对他们来说，感觉就像是在与 Angular 组件进行交互。

### 安装

```bash
npm install @stencil/angular-output-target --save-dev
```


### Stencil Config 设置

要使用 AngularOutputPlugin，首先将其导入到您的 stencil.config.ts 文件中。然后将其添加为 OutputTarget。

```tsx
import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'demo',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: 'dist',
    },
  ],
};
```

#### componentCorePackage

这是核心模板包的 NPM 包名称。在 Ionic 的情况下，我们选择了“@ionic/core”。 这是发布的包，其中仅包含您的 Web 组件。然后这个包被 Angular 包用作依赖项

#### proxiesFile

这是由 outputTarget 生成的输出文件。此文件应引用不同的包位置。在示例情况下，我们选择同级目录的 src 目录。 然后我们将创建一个 Angular 包，该包导出此文件中定义的所有组件。

#### valueAccessorConfigs

为了让 ngmodel 处理输入组件，我们需要定义有关输入组件的某些信息。不幸的是，Stencil 编译器无法推断组件的意图，因为这是一个非常概念化的想法。

### Angular 组件库的设置

Github 上提供了一个示例组件库包，以便您可以开始使用。这个 repo 很可能是你的 Stencil 组件库的兄弟。https://github.com/ionic-team/stencil-ds-angular-template

### 用法

```tsx
import { ComponentLibraryModule } from 'component-library-angular';

@NgModule({
  ...
  imports: [
    ComponentLibraryModule
  ],
  ...
})
export class AppModule { }
```
