---
title: Events
description: Events
url: /docs/events
contributors:
  - jthoms1
  - mgalic
  - BDav24
  - mattcosta7
  - noherczeg
---

# 事件

**没有**诸如 *stencil events* 这样的东西，相反，Stencil 鼓励使用 [DOM 事件](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/事件）。
但是，Stencil 确实提供了一个 API 来指定组件可以发出的事件以及组件事件的监听。它通过`Event()` 和`Listen()` 装饰器来实现。

## 事件装饰器

组件可以使用事件推送装饰器推送数据和事件。
设置 [自定义 DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) 以供其他组件处理，请使用 `@Event()` 装饰器。

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

上面的代码将定义一个名为 `todoCompleted` 的自定义 DOM 事件。

`Event(opts: EventOptions)` 装饰器可接受一个选项对象来修饰事件的行为。选项和默认值如下所述。

```tsx
export interface EventOptions {
  /**
   * 用于覆盖默认值自定义事件名称的字符串。
   */
  eventName?: string;
  /**
   * 用来设置事件是否通过 DOM 冒泡的布尔值。
   */
  bubbles?: boolean;

  /**
   * 设置事件是否可取消的布尔值。
   */
  cancelable?: boolean;

  /**
   * 一个布尔值，指示事件是否可以跨越 shadow DOM 和常规 DOM 之间的边界冒泡。
   */
  composed?: boolean;
}
```

举例：

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  // Event called 'todoCompleted' that is "composed", "cancellable" and it will bubble up!
  @Event({
    eventName: 'todoCompleted',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    const event = this.todoCompleted.emit(todo);
    if(!event.defaultPrevented) {
      // if not prevented, do some default handling code
    }
  }
}
```

## 监听装饰器

`Listen()` 装饰器用于监听 DOM 事件，包括从 `@Events` 分派的事件。

在下面的示例中，假设子组件 `TodoList` 使用 `EventEmitter` 发出 `todoCompleted` 事件。

```tsx
import { Listen } from '@stencil/core';

...
export class TodoApp {

  @Listen('todoCompleted')
  todoCompletedHandler(event: CustomEvent<Todo>) {
    console.log('Received the custom todoCompleted event: ', event.detail);
  }
}
```

### 监听配置

`@Listen(eventName, opts?: ListenOptions)` 包含第二个可选参数，可用于配置 DOM 事件侦听器的附加方式。

```tsx
export interface ListenOptions {
  target?: 'body' | 'document' | 'window';
  capture?: boolean;
  passive?: boolean;
}
```

可配置参数为 `target`, `capture` and `passive`:


#### target

回调也可以处理 host 本身以外的注册事件。
`target` 选项用于更改事件监听器的附加范围，用于设置监听事件应用程序范围。
在下面的示例中，我们将监听从 `window` 发出的滚动事件：

```tsx
  @Listen('scroll', { target: 'window' })
  handleScroll(ev) {
    console.log('the body was scrolled', ev);
  }
```

#### passive

默认情况下，Stencil 使用几种启发式方法来确定它是否必须附加一个 `passive` 事件监听器。 `passive` 选项可用于更改默认行为。
请查看 [https://developers.google.com/web/updates/2016/06/passive-event-listeners](https://developers.google.com/web/updates/2016/06/passive-event -listeners) 以获取更多信息。

#### capture

带有 `@Listen` 的` capture` 默认值为 false。
当事件侦听器设置为 `capture` 为 true 时，表示将在“捕获阶段”期间调度事件。
查看 [https://www.quirksmode.org/js/events_order.html](https://www.quirksmode.org/js/events_order.html) 了解更多信息。

```tsx
  @Listen('click', { capture: true })
  handleClick(ev) {
    console.log('click');
  }
```

## 键盘事件

对于键盘事件，可在 `@Listen()` 中使用标准的 `keydown` 事件，并使用 `event.keyCode` 或 `event.which` 获取键码，或使用 `event.key` 获取字符串表示的键盘按钮。

```tsx
@Listen('keydown')
handleKeyDown(ev: KeyboardEvent){
  if (ev.key === 'ArrowDown'){
    console.log('down arrow pressed')
  }
}
```
有关事件键字符串的更多信息，请参见 [w3c 规范](https://www.w3.org/TR/uievents-key/#named-key-attribute-values)。

## 在 JSX 中使用事件

在模板编译的应用程序或组件中，您还可以直接在 JSX 中将监听器绑定到事件。这与普通 DOM 事件（例如 `onClick` ）非常相似。

让我们使用上面的 TodoList 组件：

```tsx
import { Event, EventEmitter } from '@stencil/core';

...
export class TodoList {

  @Event() todoCompleted: EventEmitter<Todo>;

  todoCompletedHandler(todo: Todo) {
    this.todoCompleted.emit(todo);
  }
}
```

我们现在可以使用以下语法直接在 JSX 中的组件上监听此事件：

```tsx
<todo-list onTodoCompleted={ev => this.someMethod(ev)} />
```

## 监听来自非 JSX 元素的事件

```tsx
<todo-list></todo-list>
<script>
  const todoListElement = document.querySelector('todo-list');
  todoListElement.addEventListener('todoCompleted', event => { /* 监听回调 */ })
</script>
```
