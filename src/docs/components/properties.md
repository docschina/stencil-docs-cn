---
title: 属性装饰器
description: 属性装饰器
url: /docs/properties
contributors:
  - jthoms1
Translators:
  - Howie126313
---

# 属性装饰器

`Props` 是在标签上拥有向组件内部传值功能的自定义属性。子组件不应该关心或引用父组件的值，因此应该使用 `Props` 将数据从父组件向下传递到子组件。组件需要使用 `@Prop()` 装饰器显式声明它们期望接收的 `Props`。可以是 `number`, `string`, `boolean`, `Object` 或者 `Array`。默认情况下，当设置了用 `@Prop()` 装饰器装饰的属性时，组件将重新渲染。

```tsx
import { Prop } from '@stencil/core';

...
export class TodoList {
  @Prop() color: string;
  @Prop() favoriteNumber: number;
  @Prop() isSelected: boolean;
  @Prop() myHttpService: MyHttpService;
}
```

在`TodoList` 类中，可以通过`this` 操作符访问`Props`。

```tsx
logColor() {
  console.log(this.color)
}
```

在外部 `Props` 设置在元素上。

> 在 HTML 中，设置属性必须要使用 dash-case 的方式命名:

```markup
<todo-list color="blue" favorite-number="24" is-selected="true"></todo-list>
```

在 JSX 中设置属性使用驼峰命名:

```markup
<todo-list color="blue" favoriteNumber={24} isSelected="true"></todo-list>
```

它们也可以通过 JS 获取元素访问。

```tsx
const todoListElement = document.querySelector('todo-list');
console.log(todoListElement.myHttpService); // MyHttpService
console.log(todoListElement.color); // blue
```

## Prop 配置

`@Prop(opts?: PropOptions)` 装饰器接受一个可选参数来指定某些选项，例如 `mutability`、DOM 属性的名称或该属性的值是否应该展示到DOM。

```tsx
export interface PropOptions {
  attribute?: string;
  mutable?: boolean;
  reflect?: boolean;
}
```

### Prop 值的变化

`Prop` 在组件逻辑内部 _默认_ 是不可变的。一旦用户在外部设置了一个值，组件就不能在内部更新它。

但是，可以通过将 `Prop` 声明为 **mutable** 来明确允许从组件内部改变 `Prop`，如下例所示：

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {

  @Prop({ mutable: true }) name: string = 'Stencil';

  componentDidLoad() {
    this.name = 'Stencil 0.7.0';
  }
}
```

### properties 和 attributes

`properties` 和组件 `attributes` 有很强的联系，但不一定是一回事。`attributes` 是一个 HTML 概念，而 `properties` 是面向对象编程中固有的 JS 概念。

在 Stencil 中，应用于 **property** 的 `@Prop()` 装饰器将设置 Stencil 编译器也监听 DOM `attribute` 的变化。

通常属性的 `property` 与属性的 `attribute` 相同，但情况并非总是如此。以下组件为例：
```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop() isValid: boolean;
  @Prop() controller: MyController;
}
```

该组件有 **3 个 properties**，但编译器将**仅创建 2** 个 `attributes`：`value` 和 `is-valid`。

```markup
<my-cmp value="Hello" is-valid></my-cmp>
```

请注意，`controller` 类型不是原始类型，因为 DOM 属性只能是字符串，所以关联 DOM 属性 `controller` 是没有意义的。

同时，`isValid` 属性遵循 _camelCase_ 命名，但 `attributes` 不区分大小写，因此属性名称默认为`is-valid`。

幸运的是，可以使用`@Prop()` 装饰器的 `attribute` 选项更改这种“默认”行为：


```tsx
import { Component, Prop } from '@stencil/core';

@Component({ tag: 'my-cmp' })
class Component {
  @Prop() value: string;
  @Prop({ attribute: 'valid' }) isValid: boolean;
  @Prop({ attribute: 'controller' }) controller: MyController;
}
```

通过使用此选项，我们可以明确哪些 `properties` 具有关联的 DOM `attribute` 及其名称。


### 将 Properties 值同步到 Attributes

在某些情况下，保持 `Prop` 与属性同步可能很有用。在这种情况下，您可以将 `@Prop()` 装饰器中的 `reflect` 选项设置为 `true`，因为它默认为 `false`：

```tsx
@Prop({
  reflect: true
})
```

当 `prop` 设置为 `reflect` 时，这意味着它们的值将在 DOM 中作为 HTML 属性渲染：

以下组件为例：

```tsx
@Component({ tag: 'my-cmp' })
class Cmp {
  @Prop({ reflect: true }) message = 'Hello';
  @Prop({ reflect: false }) value = 'The meaning of life...';
  @Prop({ reflect: true }) number = 42;
}
```

当在 DOM 中渲染时，是这样的：

```markup
<my-cmp message="Hello" number="42"></my-cmp>
```
请注意，设置为`reflect(true)` 的属性呈现为 `attributes`，而未设置为“reflect”的属性则不会。

虽然未设置为reflect”的属性，例如“value”，不会呈现为 `attributes`，但这并不意味着它不存在 -  property `value` 的值仍然为 `The meaning of life...` ：

```tsx
const cmp = document.querySelector('my-cmp');
console.log(cmp.value); // it prints 'The meaning of life...'
```

## Prop 默认值和监听

设置一个默认值:

```tsx
import { Prop } from '@stencil/core';

...
export class NameElement {
  @Prop() name: string = 'Stencil';
}
```

要监听 `Prop`，可以使用 [@Watch()](reactive-data/#watch-decorator) 装饰器：

```tsx
import { Prop, Watch } from '@stencil/core';

...
export class TodoList {
  @Prop() name: string = 'Stencil';

  @Watch('name')
  validateName(newValue: string, oldValue: string) {
    const isBlank = typeof newValue !== 'string' || newValue === '';
    const has2chars = typeof newValue === 'string' && newValue.length >= 2;
    if (isBlank) { throw new Error('name: required') };
    if (!has2chars) { throw new Error('name: has2chars') };
  }
}
```
