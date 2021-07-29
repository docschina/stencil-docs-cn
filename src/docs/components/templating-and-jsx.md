---
title: 使用 JSX
description: 使用 JSX
url: /docs/templating-jsx
contributors:
  - jthoms1
  - simonhaenisch
  - arjunyel
Translators:
  - Howie126313
---

# 使用 JSX

Stencil 组件使用 JSX 渲染，这是一种流行的声明性模板语法。每个组件都有一个 `render` 函数，该函数返回在运行时渲染到 DOM 的组件树。

## 基础

`render` 函数用于将输出的 DOM 渲染到屏幕上。

```tsx
class MyComponent {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is JSX!</p>
      </div>
    );
  }
}
```

在这个例子中，JSX 返回一个 `div`，带有两个子元素：一个 `h1` 和一个 `p`。
### Host 元素

如果要修改 host 元素本身，例如为组件本身添加类或属性，请使用`<Host>` 功能组件。检查更多细节[这里](host-element)


## 数据绑定

组件通常需要渲染动态数据。要在 JSX 中执行此操作，请在变量周围使用 `{ }`：

```tsx
render() {
  return (
    <div>Hello {this.name}</div>
  )
}
```

> 如果你熟悉 ES6 模板变量，JSX 变量非常相似，只是没有 `$`:

```tsx
//ES6
`Hello ${this.name}`

//JSX
Hello {this.name}
```


## 条件渲染

如果我们想有条件地渲染不同的内容，我们可以使用 JavaScript if/else 语句：
在这里，如果没有定义 `name`，我们可以渲染一个不同的元素。

```tsx
render() {
  if (this.name) {
    return ( <div>Hello {this.name}</div> )
  } else {
    return ( <div>Hello, World</div> )
  }
}
```

此外，可以使用 JavaScript 三元运算符创建内联条件：

```tsx
render() {
  return (
    <div>
    {this.name
      ? <p>Hello {this.name}</p>
      : <p>Hello World</p>
    }
    </div>
  );
}
```

**注意：** Stencil 会复用 DOM 元素以获得更好的性能。考虑以下代码：

```tsx
{someCondition
  ? <my-counter initialValue={2} />
  : <my-counter initialValue={5} />
}
```

上述代码的行为与以下代码完全相同：

```tsx
<my-counter initialValue={someCondition ? 2 : 5} />
```

因此，如果 `someCondition` 改变，`<my-counter>` 的内部状态不会被重置，并且它的生命周期方法，例如 `componentWillLoad()` 不会触发。相反，条件只是触发对相同组件的更新。

如果需要在条件中销毁并重新创建组件，可以分配 `key` 属性。这告诉 Stencil 这些组件实际上是不同的元素：

```tsx
{someCondition
  ? <my-counter key="a" initialValue={2} />
  : <my-counter key="b" initialValue={5} />
}
```

这样，如果 `someCondition` 发生变化，你会得到一个新的 `<my-counter>` 组件，它具有全新的内部状态，`componentWillLoad()` 和 `componentDidLoad()` 也会运行。

## 插槽

组件通常需要在其组件树中的特定位置呈现动态子组件，从而允许开发人员在使用我们的组件时提供子内容，并将该子组件放置在适当的位置。

为此，您可以使用 `my-component` 中的 [Slot 标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) 。

```tsx
// my-component.tsx

render() {
  return (
    <div>
      <h2>A Component</h2>
      <div><slot /></div>
    </div>
  );
}

```

然后，如果用户在创建我们的组件 `my-component` 时传递子组件，那么 `my-component` 将放置该组件至上面第二个 `<div>` 内：

```tsx
render(){
  return(
    <my-component>
      <p>Child Element</p>
    </my-component>
  )
}
```

插槽也可以有 `name` 以允许指定插槽输出位置：

```tsx
// my-component.tsx

render(){
  return [
    <slot name="item-start" />,
    <h1>Here is my main content</h1>,
    <slot name="item-end" />
  ]
}
```

```tsx
render(){
  return(
    <my-component>
      <p slot="item-start">I'll be placed before the h1</p>
      <p slot="item-end">I'll be placed after the h1</p>
    </my-component>
  )
}
```

## 循环

可以在 JSX 中创建循环，在创建 JSX 树时使用传统循环，或者在现有 JSX 中内联时使用数组方法（例如“map”）。

在下面的例子中，我们将假设组件有一个名为 `todos` 的属性，它是一个 todo 对象数组。我们将在数组上使用 [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 函数来遍历地图中的每个项目，并将其转换为其他内容 - 在本例中为 JSX。

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
        </div>
      )}
    </div>
  )
}
```

`map` 函数的每一步都会创建一个新的 JSX 子树，并将其添加到 `map` 返回的新数组中，然后在其上方的 JSX 树中渲染。

If your list is dynamic, i. e., it's possible to change, add, remove or reorder items, you should assign a unique `key` to each element to give it a stable identity. This enables Stencil to reuse DOM elements for better performance. The best way to pick a key is to use a string that uniquely identifies that list item among its siblings (often your data will already have IDs).

如果您的列表是动态的。例如:可以更改、添加、删除或重新排序项目，您应该为每个元素分配一个唯一的 `key` 以赋予其稳定的身份。这使 Stencil 能复用 DOM 元素以获得更好的性能。选择 `key` 的最佳方法是使用一个字符串，该字符串在其兄弟项中唯一标识该列表项（通常您的数据已经具有 ID）。

> 不要使用 `map` 函数的索引变量作为 `key`。它不代表一个项目的稳定身份，因为如果列表的顺序发生变化或者如果您在列表的开头添加了一个项目，它会发生变化。因此它不适合作为 `key`。

```tsx
render() {
  return (
    <div>
      {this.todos.map((todo) =>
        <div key={todo.uid}>
          <div>{todo.taskName}</div>
          <div>{todo.isCompleted}</div>
          <button onClick={() => this.remove(todo)}>X</button>
        </div>
      )}
    </div>
  )
}
```

数组中使用的 `key` 在其同级中应该是唯一的，但不需要是全局唯一的。

## 处理用户输入

Stencil 使用原生的 [DOM 事件](https://developer.mozilla.org/en-US/docs/Web/Events)。

这是处理按钮单击的示例。请注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 的使用。

```tsx
...
export class MyComponent {
  private handleClick = () => {
    alert('Received the button click!');
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click Me!</button>
    );
  }
}
```

这是另一个监听输入 `change` 的例子。请注意 [箭头函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 的使用。

```tsx
...
export class MyComponent {
  private inputChanged = (event: Event) => {
    console.log('input changed: ', (event.target as HTMLInputElement).value);
  }

  render() {
    return (
      <input onChange={this.inputChanged}/>
    );
  }
}
```


## 复杂的模板内容

到目前为止，我们已经看到了如何仅返回单个根元素的示例。我们也可以在根元素中嵌套元素

如果需要一个组件有多个最外侧元素，`render` 函数可以返回一个数组。

注意 `<div>` 元素之间的逗号。

```tsx
render() {
  return ([
  // first top level element
  <div class="container">
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>,

  // second top level element, note the , above
  <div class="another-container">
    ... more html content ...
  </div>
  ]);
}
```

也可以使用 `innerHTML` 将内容直接内联到元素中。例如，当动态加载 svg 然后想要在 `div` 内呈现它时，这会很有帮助。这就像在普通 HTML 中一样：

```markup
<div innerHTML={svgContent}></div>
```

## 获取对 DOM 元素

如果你需要直接引用一个元素，就像你通常用 `document.querySelector` 做的那样，你可能想在 JSX 中使用 `ref`。让我们看一个在表单中使用 `ref` 的例子：

```tsx
@Component({
  tag: 'app-home',
})
export class AppHome {

  textInput!: HTMLInputElement;

  handleSubmit = (event: Event) => {
    event.preventDefault();
    console.log(this.textInput.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(el) => this.textInput = el as HTMLInputElement} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

在这个例子中，我们使用 `ref` 来获取对输入 `ref={(el) => this.textInput = el as HTMLInputElement}` 的引用。然后我们可以使用该 `ref` 来做一些事情，比如直接通过 `this.textInput.value` 获取值。


## 避免共享 JSX 节点

渲染器缓存元素查找以提高性能。但是，这样做的副作用是，不应在同一个渲染器中共享完全相同的 JSX 节点。

在下面的例子中，`sharedNode` 变量在 `render()` 函数中被多次重用。渲染器能够通过缓存引用来优化其 DOM 元素查找，但是，这会在重用节点时导致问题。相反，建议始终生成唯一节点，如以下更改示例。

```diff
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  render() {
-    const sharedNode = <div>Text</div>;
    return (
      <div>
-        {sharedNode}
-        {sharedNode}
+        <div>Text</div>
+        <div>Text</div>
      </div>
    );
  }
}
```

实际上可使用创建工厂函数来返回公共 JSX 节点，这样返回的值将是唯一实例。例如：

```tsx
@Component({
  tag: 'my-cmp',
})
export class MyCmp {

  getText() {
    return <div>Text</div>;
  }

  render() {
    return (
      <div>
        {this.getText()}
        {this.getText()}
      </div>
    );
  }
}
```

## 其他资源

- [了解 StencilJS 应用程序的 JSX](https://www.joshmorony.com/understanding-jsx-for-stencil-js-applications/)
