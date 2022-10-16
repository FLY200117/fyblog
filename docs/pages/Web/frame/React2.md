# 进阶目录

[[toc]]

在了解Fiber之前，需要知道的是现在流行的VDOM（Virtual DOM），以下是官网给出的对VDOM的解释：Virtual DOM 是一种编程概念。在这个概念里， UI 以一种理想化的，或者说“虚拟的”表现形式被保存于内存中，并通过如 ReactDOM 等类库使之与“真实的” DOM 同步。这一过程叫做[协调](https://zh-hans.reactjs.org/docs/reconciliation.html)。



Vue和其他主流框架底层都是运用了VDOM，原因是因为浏览器底层对DOM的直接操作过于浪费，所以将真实DOM映射成下面这种形式：

```js
{
	ElementType: 'div',
	class: 'className',
	att: {
		props: {...}
	},
	style: {...}
}
```

通过这样的"虚拟"DOM去`统一`的操作DOM，在这基础上，还增加了`diff`算法，这里就不过多讲述`diff`算法，由VDOM这一技术陆陆续续又衍生了许多其他技术，这里就不过多讲解。



注意：**Shadow DOM和VDOM并不一样**，前者是一种浏览器技术，主要是在web组件中封装变量和CSS，而VDOM则更像是JS库基于浏览器API实现的概念，**与其将 “Virtual DOM” 视为一种技术，不如说它是一种模式**





## Reconciliation

### 设计动机

在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树。在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树。React 需要基于这两棵树之间的差别来判断如何高效的更新 UI，以保证当前 UI 与最新的树保持同步



此算法有一些通用的解决方案，即生成将一棵树转换成另一棵树的最小操作次数。然而，即使使用[最优的算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)，该算法的复杂程度仍为 O(n 3 )，其中 n 是树中元素的数量



如果在 React 中使用该算法，那么展示 1000 个元素则需要 10 亿次的比较。这个开销实在是太过高昂。于是 React 在以下两个假设的基础之上提出了一套 O(n) 的启发式算法：

1. 两个不同类型的元素会产生出不同的树；
2. 开发者可以使用 `key` 属性标识哪些子元素在不同的渲染中可能是不变的。

在实践中，我们发现以上假设在几乎所有实用的场景下都成立。



### Diffing算法

当对比两棵树时，React首先比较两棵树的根节点。不同类型的根节点元素会有不同的形态



#### 对比不同类型的元素

当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。举个例子，当一个元素从 `<a>` 变成 `<img>`，从 `<Article>` 变成 `<Comment>`，或从 `<Button>` 变成 `<div>` 都会触发一个完整的重建流程



当卸载一棵树时，对应的 DOM 节点也会被销毁。组件实例将执行 `componentWillUnmount()` 方法。当建立一棵新的树时，对应的 DOM 节点会被创建以及插入到 DOM 中。组件实例将执行 `UNSAFE_componentWillMount()` 方法，紧接着 `componentDidMount()` 方法。所有与之前的树相关联的 state 也会被销毁



在根节点以下的组件也会被卸载，它们的状态会被销毁。比如，当比对以下更变时：

```html
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```



React 会销毁 `Counter` 组件并且重新装载一个新的组件。



#### 对比同一类型的元素

当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：

```html
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

通过对比这两个元素，React 知道只需要修改 DOM 元素上的 `className` 属性。



  当更新 `style` 属性时，React 仅更新有所更变的属性。比如：

```html
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

通过对比这两个元素，React 知道只需要修改 DOM 元素上的 `color` 样式，无需修改 `fontWeight`。



在处理完当前节点之后，React 继续对子节点进行递归。





#### 对比同类型的组件元素

当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持 state 一致。React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 `UNSAFE_componentWillReceiveProps()`、`UNSAFE_componentWillUpdate()` 以及 `componentDidUpdate()` 方法。



下一步，调用 `render()` 方法，diff 算法将在之前的结果以及新的结果中进行递归。



#### 对子节点进行递归

默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation



在子元素列表末尾新增元素时，更新开销比较小。比如：

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

  React 会先匹配两个 `<li>first</li>` 对应的树，然后匹配第二个元素 `<li>second</li>` 对应的树，最后插入第三个元素的 `<li>third</li>` 树



如果只是简单的将新增元素插入到表头，那么更新开销会比较大。比如：

```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

  React 并不会意识到应该保留 `<li>Duke</li>` 和 `<li>Villanova</li>`，而是会重建每一个子元素。这种情况会带来性能问题





#### Keys

为了解决上述问题，React 引入了 `key` 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下示例在新增 `key` 之后，使得树的转换效率得以提高：

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在 React 知道只有带着 `'2014'` key 的元素是新元素，带着 `'2015'` 以及 `'2016'` key 的元素仅仅移动了



可以新增一个 ID 字段到模型中，或者利用一部分内容作为哈希值来生成一个 key。这个 key 不需要全局唯一，但在**列表**中需要保持唯一

最后，你也可以使用元素在数组中的下标作为 key。这个策略在元素不进行重新排序时比较合适，如果有顺序修改，diff 就会变慢

当基于下标的组件进行重新排序时，组件 state 可能会遇到一些问题。由于组件实例是基于它们的 key 来决定是否更新以及复用，如果 key 是一个下标，那么修改顺序时会修改当前的 key，导致非受控组件的 state（比如输入框）可能相互篡改，会出现无法预期的变动



## Fiber

Fiber 是 React 16 中新的协调引擎。它的主要目的是使 Virtual DOM 可以进行增量式渲染。Fiber 是对 React 核心算法的重构，facebook 团队使用两年多的时间去重构 React 的核心算法，在React16 以上的版本中引入了 Fiber 架构



### Fiber的重要型

在浏览器中，页面是一帧帧绘制出来的，渲染的帧率与设备的刷新率保持一致，一般情况下是1s 60次，当每秒内绘制的帧数（FPS）超过60时，页面渲染是流畅的，当小于60的时候则会出现一定的卡顿现象

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f288e9135ed414d871ad2fd2715d85d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

1. 首先需要处理输入时间，能让用户得到最早的反馈
2. 处理定时器，需要检查定时器是否到时间，并执行对应的回调
3. 接下来处理Begin Frame（开始帧），即每一帧的时间，包括 window.resize、scroll、media query change 等
4. 接下来执行请求动画帧 requestAnimationFrame（rAF），即在每次绘制之前，会执行 rAF 回调
5. 紧接着进行 Layout 操作，包括计算布局和更新布局，即这个元素的样式是怎样的，它应该在页面如何展示
6. 接着进行 Paint 操作，得到树中每个节点的尺寸与位置等信息，浏览器针对每个元素进行内容填充
7. 到这时以上的六个阶段都已经完成了，接下来处于空闲阶段（Idle Peroid），可以在这时执行 requestIdleCallback 里注册的任务（后面会详细讲到这个 requestIdleCallback ，它是 React Fiber 实现的基础）



js引擎和页面渲染引擎是在同一个渲染线程之内，两者是互斥关系。如果在某个阶段执行任务特别长，例如在定时器阶段或`Begin Frame`阶段执行时间非常长，时间已经明显超过了16ms，那么就会阻塞页面的渲染，从而出现卡顿现象。



在 react16 引入 Fiber 架构之前，react 会采用先序递归对比虚拟DOM树，找出需要变动的节点，然后同步更新它们，这个过程 react 称为`reconcilation`（协调）。在`reconcilation`期间，react 会一直占用浏览器资源，会导致用户触发的事件得不到响应。实现的原理如下所示

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/994d70ab12f14d079e6c0b98d0e1b326~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



这种遍历是递归调用，执行栈会越来越深，而且不能中断，中断后就不能恢复了。递归如果非常深，就会十分卡顿。如果递归花了100ms，则这100ms浏览器是无法响应的，代码执行时间越长卡顿越明显。传统的方法存在不能中断和执行栈太深的问题。



因此，为了解决以上的痛点问题，React希望能够彻底解决主线程长时间占用问题，于是引入了 Fiber 来改变这种不可控的现状，把渲染/更新过程拆分为一个个小块的任务，通过合理的调度机制来调控时间，指定任务执行的时机，从而降低页面卡顿的概率，提升页面交互体验。通过Fiber架构，让`reconcilation`过程变得可被中断。适时地让出CPU执行权，可以让浏览器及时地响应用户的交互。



React16中使用了 Fiber，但是 Vue 是没有 Fiber 的，为什么呢？原因是二者的优化思路不一样：

- Vue 是基于 template 和 watcher 的组件级更新，把每个更新任务分割得足够小，不需要使用到 Fiber 架构，将任务进行更细粒度的拆分
- React 是不管在哪里调用 setState，都是从根节点开始更新的，更新任务还是很大，需要使用到 Fiber 将大任务分割为多个小任务，可以中断和恢复，不阻塞主进程执行高优先级的任务





### 什么是Fiber

Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。



#### 执行单位

Fiber 可以理解为一个执行单元，每次执行完一个执行单元，react 就会检查现在还剩多少时间，如果没有时间则将控制权让出去。React Fiber 与浏览器的核心交互流程如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78a602cbc87342628ace49abb5d20c39~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



首先 React 向浏览器请求调度，浏览器在一帧中如果还有空闲时间，会去判断是否存在待执行任务，不存在就直接将控制权交给浏览器，如果存在就会执行对应的任务，执行完成后会判断是否还有时间，有时间且有待执行任务则会继续执行下一个任务，否则就会将控制权交给浏览器。这里会有点绕，可以结合上述的图进行理解



Fiber 可以被理解为划分一个个更小的执行单元，它是把一个大任务拆分为了很多个小块任务，一个小块任务的执行必须是一次完成的，不能出现暂停，但是一个小块任务执行完后可以移交控制权给浏览器去响应用户，从而不用像之前一样要等那个大任务一直执行完成再去响应用户



#### 数据结构

Fiber 还可以理解为是一种数据结构，React Fiber 就是采用链表实现的。每个 Virtual DOM 都可以表示为一个 fiber，如下图所示，每个节点都是一个 fiber。一个 fiber包括了 child（第一个子节点）、sibling（兄弟节点）、return（父节点）等属性，React Fiber 机制的实现，就是依赖于以下的数据结构

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/74fe5e7d1dc449568448b462abcbff6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)





### requestAnimationFrame（绘制动画API）

在 Fiber 中使用到了[requestAnimationFrame](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame)，它是浏览器提供的绘制动画的 api 。它要求浏览器在下次重绘之前（即下一帧）调用指定的回调函数更新动画





### requestIdleCallback（后台执行API）

[requestIdleCallback](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestIdleCallback) 也是 react Fiber 实现的基础 api 。我们希望能够快速响应用户，让用户觉得够快，不能阻塞用户的交互，`requestIdleCallback`能使开发者在主事件循环上执行后台和低优先级的工作，而不影响延迟关键事件，如动画和输入响应。正常帧任务完成后没超过16ms，说明有多余的空闲时间，此时就会执行`requestIdleCallback`里注册的任务



具体的执行流程如下，开发者采用`requestIdleCallback`方法注册对应的任务，告诉浏览器我的这个任务优先级不高，如果每一帧内存在空闲时间，就可以执行注册的这个任务。另外，开发者是可以传入`timeout`参数去定义超时时间的，如果到了超时时间了，浏览器必须立即执行，使用方法如下：`window.requestIdleCallback(callback, { timeout: 1000 })`。浏览器执行完这个方法后，如果没有剩余时间了，或者已经没有下一个可执行的任务了，React应该归还控制权，并同样使用`requestIdleCallback`去申请下一个时间片。具体的流程如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/043bc29786cd4053a056f95d3256cb2e~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

`window.requestIdleCallback(callback)`的`callback`中会接收到默认参数 deadline ，其中包含了以下两个属性：

- timeRamining 返回当前帧还剩多少时间供用户使用
- didTimeout 返回 callback 任务是否超时



这里需要注意的是，浏览器一帧的严格时间并不是16ms，是可以动态控制的，如果子任务时间超过了一帧的剩余时间，则会一直卡在这里执行，直到代码执行完毕。如果代码存在死循环，则浏览器会卡死，如果此帧的剩余时间大于0（有空余时间）或者已经超时，且当时存在任务，则直接执行该任务。如果没有剩余时间，则应该放弃执行任务控制权，把执行权交还给浏览器。如果多个任务执行总时间小于空闲时间的话，是可以在一帧内执行多个任务的。



### Fiber链表结构设计

Fiber结构是使用链表实现的，`Fiber tree`实际上是个单链表树结构，详见[ReactFiber.js源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fblob%2Fmaster%2Fpackages%2Freact-reconciler%2Fsrc%2FReactFiber.new.js)，在这里我们看看Fiber的链表结构是怎样的，了解了这个链表结构后，能更快地理解后续 Fiber 的遍历过程。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b440a981e4c040b2ab3523f065bffea7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

以上每一个单元包含了`payload`（数据）和`nextUpdate`（指向下一个单元的指针），定义结构如下：

```js
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload // payload 数据
    this.nextUpdate = nextUpdate // 指向下一个节点的指针
  }
}
```

接下来定义一个队列，把每个单元串联起来，其中定义了两个指针：头指针`firstUpdate`和尾指针`lastUpdate`，作用是指向第一个单元和最后一个单元，并加入了`baseState`属性存储React中的state状态。如下所示：

```js
class UpdateQueue {
  constructor() {
    this.baseState = null // state
    this.firstUpdate = null // 第一个更新
    this.lastUpdate = null // 最后一个更新
  }
}
```

接下来定义两个方法：插入节点单元（enqueueUpdate）、更新队列（forceUpdate）。插入节点单元时需要考虑是否已经存在节点，如果不存在直接将`firstUpdate`、`lastUpdate`指向此节点即可。更新队列是遍历这个链表，根据`payload`中的内容去更新`state`的值。

```js
class UpdateQueue {
  //.....
  
  enqueueUpdate(update) {
    // 当前链表是空链表
    if (!this.firstUpdate) {
      this.firstUpdate = this.lastUpdate = update
    } else {
      // 当前链表不为空
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = update
    }
  }
  
  // 获取state，然后遍历这个链表，进行更新
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      // 判断是函数还是对象，是函数则需要执行，是对象则直接返回
      let nextState = typeof currentUpdate.payload === 'function' ? currentUpdate.payload(currentState) : currentUpdate.payload
      currentState = { ...currentState, ...nextState }
      currentUpdate = currentUpdate.nextUpdate
    }
    // 更新完成后清空链表
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState
  }
}
```

最后实例化一个队列，向其中加入很多节点，再更新这个队列

```js
let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: 'www' }))
queue.enqueueUpdate(new Update({ age: 10 }))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.enqueueUpdate(new Update(state => ({ age: state.age + 1 })))
queue.forceUpdate()
console.log(queue.baseState);
```



### Fiber节点设计

Fiber的拆分单位是fiber（`fiber tree`上的一个节点），实际上就是按虚拟DOM节点拆，我们需要根据虚拟dom去生成 Fiber 树。下文中我们把每一个节点叫做 fiber 。fiber 节点结构如下

```js
{
    
    type: any, // 对于类组件，它指向构造函数；对于DOM元素，它指定HTML tag
    key: null | string, // 唯一标识符
    stateNode: any, // 保存对组件的类实例，DOM节点或与fiber节点关联的其他React元素类型的引用
    child: Fiber | null, // 大儿子
    sibling: Fiber | null, // 下一个兄弟
    return: Fiber | null, // 父节点
    tag: WorkTag, // 定义fiber操作的类型, 详见https://github.com/facebook/react/blob/master/packages/react-reconciler/src/ReactWorkTags.js
    nextEffect: Fiber | null, // 指向下一个节点的指针
    updateQueue: mixed, // 用于状态更新，回调函数，DOM更新的队列
    memoizedState: any, // 用于创建输出的fiber状态
    pendingProps: any, // 已从React元素中的新数据更新，并且需要应用于子组件或DOM元素的props
    memoizedProps: any, // 在前一次渲染期间用于创建输出的props
    // ……     
}
```



fiber节点包括了以下属性：

1. type & key

- fiber的type和key与React元素的作用相同。fiber的type描述了它对应的组件，对于复合组件，type是函数或者类组件本身。对于原生标签，type是一个字符串。随着type的不同，在reconciliation期间使用key来确定fiber是否可以重新使用

2. stateNode

- stateNode 保存对组件的类实例，DOM节点或与 fiber 节点关联的其他 React 元素类型的引用。一般来说，可以认为这个属性用于保存与 fiber 相关的本地状态

3. child & sibling & return

- ###### child 属性指向此节点的第一个子节点（大儿子）。

- sibling 属性指向此节点的下一个兄弟节点（大儿子指向二儿子、二儿子指向三儿子）

- return 属性指向此节点的父节点，即当前节点处理完毕后，应该向谁提交自己的成果。如果 fiber 具有多个子 fiber，则每个子 fiber 的 return fiber 是 parent 



所有 fiber 节点都通过以下属性：child，sibling 和 return来构成一个 fiber node 的 linked list(后面称之为链表)。如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5192251a0a47481aacb6e018b1741655~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

其他的属性还有`memoizedState`（创建输出的 fiber 的状态）、`pendingProps`（将要改变的  props ）、`memoizedProps`（上次渲染创建输出的 props ）、`pendingWorkPriority`（定义 fiber 工作优先级）等等



### Fiber执行原理

从根节点开始渲染和调度的过程可以分为两个阶段：render阶段，commit阶段

- render阶段：该阶段是可中断的，会找出所有节点的变更
- commit阶段：该阶段是不可中断的，会执行所有的变更



#### render阶段

此阶段会找出所有节点的变更，如节点新增、删除、属性变更等，这些变更 react 统称为副作用（effect），此阶段会构建一棵`Fiber tree`，以虚拟dom节点为维度对任务进行拆分，即一个虚拟dom节点对应一个任务，最后产出的结果是`effect list`，从中可以知道哪些节点更新、哪些节点增加、哪些节点删除了



##### 遍历流程

`React Fiber`首先是将虚拟DOM树转化为`Fiber tree`，因此每个节点都有`child`、`sibling`、`return`属性，遍历`Fiber tree`时采用的是后序遍历方法：

1. 如果有大儿子，先遍历大儿子；如果没有大儿子，则表示遍历完成
2. 大儿子： a. 如果有弟弟，则返回弟弟，跳到2 b. 如果没有弟弟，则返回父节点，并标志完成父节点遍历，跳到2 d. 如果没有父节点则标志遍历结束
3. 遍历完所有节点后，自己才完成

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e617a3507074e498318332b579cd634~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)





##### 收集effect list

知道了遍历方法之后，接下来需要做的工作就是在遍历过程中，收集所有节点的变更产出`effect list`，注意其中只包含了需要变更的节点。通过每个节点更新结束时向上归并`effect list`来收集任务结果，最后根节点的`effect list`里就记录了包括了所有需要变更的结果。



收集`effect list`的具体步骤为：

1. 如果当前节点需要更新，则打`tag`更新当前节点状态（props, state, context等）

2. 为每个子节点创建fiber。如果没有产生`child fiber`，则结束该节点，把`effect list`归并到`return`，把此节点的`sibling`节点作为下一个遍历节点；否则把`child`节点作为下一个遍历节点

3. 如果有剩余时间，则开始下一个节点，否则等下一次主线程空闲再开始下一个节点

4. 如果没有下一个节点了，进入`pendingCommit`状态，此时`effect list`收集完毕，结束。

   

收集`effect list`的遍历顺序如下所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36484ed7dca5465695c99f7fe329ed6d~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)



遍历子虚拟DOM元素数组，为每个虚拟DOM元素创建子fiber：

```js
const reconcileChildren = (currentFiber, newChildren) => {
  let newChildIndex = 0
  let prevSibling // 上一个子fiber

  // 遍历子虚拟DOM元素数组，为每个虚拟DOM元素创建子fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex]
    let tag
    // 打tag，定义 fiber类型
    if (newChild.type === ELEMENT_TEXT) { // 这是文本节点
      tag = TAG_TEXT
    } else if (typeof newChild.type === 'string') {  // 如果type是字符串，则是原生DOM节点
      tag = TAG_HOST
    }
    let newFiber = {
      tag,
      type: newChild.type,
      props: newChild.props,
      stateNode: null, // 还未创建DOM元素
      return: currentFiber, // 父亲fiber
      effectTag: INSERT, // 副作用标识，包括新增、删除、更新
      nextEffect: null, // 指向下一个fiber，effect list通过nextEffect指针进行连接
    }
    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber // child为大儿子
      } else {
        prevSibling.sibling = newFiber // 让大儿子的sibling指向二儿子
      }
      prevSibling = newFiber
    }
    newChildIndex++
  }
}
```



定义一个方法收集此 fiber 节点下所有的副作用，并组成`effect list`。注意每个 fiber 有两个属性：

- firstEffect：指向第一个有副作用的子fiber
- lastEffect：指向最后一个有副作用的子fiber

中间的使用`nextEffect`做成一个单链表。

```js
// 在完成的时候要收集有副作用的fiber，组成effect list
const completeUnitOfWork = (currentFiber) => {
  // 后续遍历，儿子们完成之后，自己才能完成。最后会得到以上图中的链条结构。
  let returnFiber = currentFiber.return
  if (returnFiber) {
    // 如果父亲fiber的firstEffect没有值，则将其指向当前fiber的firstEffect
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    // 如果当前fiber的lastEffect有值
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }
      returnFiber.lastEffect = currentFiber.lastEffect
    }
    const effectTag = currentFiber.effectTag
    if (effectTag) { // 说明有副作用
      // 每个fiber有两个属性：
      // 1）firstEffect：指向第一个有副作用的子fiber
      // 2）lastEffect：指向最后一个有副作用的子fiber
      // 中间的使用nextEffect做成一个单链表
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      } else {
        returnFiber.lastEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}
```

接下来定义一个递归函数，从根节点出发，把全部的 fiber 节点遍历一遍，产出最终全部的`effect list`：

```js
// 把该节点和子节点任务都执行完
const performUnitOfWork = (currentFiber) => {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber) // 让自己完成
    if (currentFiber.sibling) { // 有弟弟则返回弟弟
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return // 没有弟弟，则找到父亲，让父亲完成，父亲会去找他的弟弟即叔叔
  }
}
```







#### commit阶段

commit 阶段需要将上阶段计算出来的需要处理的副作用一次性执行，此阶段不能暂停，否则会出现UI更新不连续的现象。此阶段需要根据`effect list`，将所有更新都 commit 到DOM树上。



##### 根据一个 fiber 的 effect list 更新视图

根据一个 fiber 的`effect list`列表去更新视图（这里只列举了新增节点、删除节点、更新节点的三种操作）：

```js
const commitWork = currentFiber => {
  if (!currentFiber) return
  let returnFiber = currentFiber.return
  let returnDOM = returnFiber.stateNode // 父节点元素
  if (currentFiber.effectTag === INSERT) {  // 如果当前fiber的effectTag标识位INSERT，则代表其是需要插入的节点
    returnDOM.appendChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === DELETE) {  // 如果当前fiber的effectTag标识位DELETE，则代表其是需要删除的节点
    returnDOM.removeChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === UPDATE) {  // 如果当前fiber的effectTag标识位UPDATE，则代表其是需要更新的节点
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text) {
        currentFiber.stateNode.textContent = currentFiber.props.text
      }
    }
  }
  currentFiber.effectTag = null
}
```



##### 根据全部fiber的effect list 更新视图

写一个递归函数，从根节点出发，根据`effect list`完成全部更新：

```js
const commitRoot = () => {
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  currentRoot = workInProgressRoot // 把当前渲染成功的根fiber赋给currentRoot
  workInProgressRoot = null
}
```



##### 完成视图更新

接下来定义循环执行工作，当计算完成每个 fiber 的`effect list`后，调用 commitRoot 完成视图更新：

```js
const workloop = (deadline) => {
  let shouldYield = false // 是否需要让出控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1 // 如果执行完任务后，剩余时间小于1ms，则需要让出控制权给浏览器
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render阶段结束')
    commitRoot() // 没有下一个任务了，根据effect list结果批量更新视图
  }
  // 请求浏览器进行再次调度
  requestIdleCallback(workloop, { timeout: 1000 })
}
```



到这时，已经根据收集到的变更信息，完成了视图的刷新操作。