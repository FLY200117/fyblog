# 深入Electron中的进程

从上文的学习中，可以了解到Electron中主要分为两个进程，一个是主进程，一个是渲染进程





## 流程模型

Electron 继承了来自 Chromium 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器

而Chromium则是谷歌浏览器背后的引擎，是一种**浏览器引擎**，而它的内核则是webkit，该内核是目前公认最快的网页浏览方式



### 为什么不是一个单一的进程？

网页浏览器是个极其复杂的应用程序。除了显示网页内容的主要能力之外，他们还有许多次要的职责，例如：管理众多窗口 ( 或 标签页 ) 和加载第三方扩展

在早期，浏览器通常使用单个进程来处理所有这些功能。 虽然这种模式意味着您打开每个标签页的开销较少，但也同时意味着一个网站的崩溃或无响应会影响到整个浏览器





### 多进程模型

为了解决这个问题，Chrome 团队决定让每个标签页在自己的进程中渲染， 从而限制了一个网页上的有误或恶意代码可能导致的对整个应用程序造成的伤害。 然后用单个浏览器进程控制这些标签页进程，以及整个应用程序的生命周期。 下方来自 [Chrome 漫画](https://www.google.com/googlebooks/chrome/) 的图表可视化了此模型：

![chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png (C:/Users/86186/Desktop/Vue学习图片/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png) (electronjs.org)](https://www.electronjs.org/zh/assets/images/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png)

这和Electron应用程序的结构非常相似，作为一个应用程序开发者，我们控制着两种不同类型的进程：主进程以及渲染进程。而这就有点类似谷歌浏览器和它的渲染器





### 主进程

每个Electron应用都有一个单一的主进程，作为应用程序的入口点，主进程在node环境下运行，这就意味着它具有node模块下各种强大API的功能



#### 窗口管理

主进程的主要目的是使用 [`BrowserWindow`](https://www.electronjs.org/zh/docs/latest/api/browser-window) 模块创建和管理应用程序窗口



`BrowserWindow` 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。 您可从主进程用 window 的 [`webContent`](https://www.electronjs.org/zh/docs/latest/api/web-contents) 对象与网页内容进行交互

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

由于 `BrowserWindow` 模块是一个 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)， 所以您也可以为各种用户事件 ( 例如，最小化 或 最大化您的窗口 ) 添加处理程序。

当一个 `BrowserWindow` 实例被销毁时，与其相应的渲染器进程也会被终止





#### 应用程序生命周期

主进程还能通过 Electron 的 [`app`](https://www.electronjs.org/zh/docs/latest/api/app) 模块来控制您应用程序的生命周期，通过app.on给app绑定各种事件的回调函数，例如销毁`window-all-closed`事件，更多有关生命周期的API可以通过官网查看



#### 原生API

为了使Electron的功能不仅仅限于对网页内容的封装，主进程也添加了自定义的API来与用户的作业系统进行交互。 Electron 有着多种控制原生桌面功能的模块，例如菜单、对话框以及托盘图标。





### 渲染进程

每个 Electron 应用都会为每个打开的 `BrowserWindow` ( 与每个网页嵌入 ) 生成一个单独的渲染器进程。 洽如其名，渲染器负责 *渲染* 网页内容。 所以实际上，运行于渲染器进程中的代码是须遵照网页标准的 (至少就目前使用的 Chromium 而言是如此) 

因此，一个浏览器窗口中的所有的用户界面和应用功能，都应与您在网页开发上使用相同的工具和规范来进行攥写。

虽然解释每一个网页规范超出了本指南的范围，但您最起码要知道的是：

- 以一个 HTML 文件作为渲染器进程的入口点。
- 使用层叠样式表 (Cascading Style Sheets, CSS) 对 UI 添加样式。
- 通过 `<script>` 元素可添加可执行的 JavaScript 代码。

此外，这也意味着渲染器无权直接访问 `require` 或其他 Node.js API。 为了在渲染器中直接包含 NPM 模块，您必须使用与在 web 开发时相同的打包工具 (例如 `webpack` 或 `parcel`)





### Preload脚本

预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码 。 这些脚本虽运行于渲染器的环境中，却因能访问 Node.js API 而拥有了更多的权限。

预加载脚本可以在 `BrowserWindow` 构造方法中的 `webPreferences` 选项里被附加到主进程

```js
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  webPreferences: {
    preload: 'path/to/preload.js',
  },
})
//...
```

因为预加载脚本与浏览器共享同一个全局 [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) 接口，并且可以访问 Node.js API，所以它通过在全局 `window` 中暴露任意 API 来增强渲染器，以便你的网页内容使用



虽然预加载脚本与其所附着的渲染器在共享着一个全局 `window` 对象，但您并不能从中直接附加任何变动到 `window` 之上，因为 [`contextIsolation`](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation) 是默认的

语境隔离（Context Isolation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中。

取而代之，官网新取了 [`contextBridge`](https://www.electronjs.org/zh/docs/latest/api/context-bridge) 模块来安全地实现交互

```js
// preload.js

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})
```

```js
// renderer.js

console.log(window.myAPI)
// => { desktop: true }
```

此功能对两个主要目的來說非常有用：

- 通过暴露 [`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer) 帮手模块于渲染器中，您可以使用 进程间通讯 ( inter-process communication, IPC ) 来从渲染器触发主进程任务 ( 反之亦然 ) 。
- 如果您正在为远程 URL 上托管的现有 web 应用开发 Electron 封裝，则您可在渲染器的 `window` 全局变量上添加自定义的属性，好在 web 客户端用上仅适用于桌面应用的设计逻辑 





## 上下文隔离



### 上下文隔离是什么？

上下文隔离功能将确保您的 `预加载`脚本 和 Electron的内部逻辑 运行在所加载的 [`webcontent`](https://www.electronjs.org/zh/docs/latest/api/web-contents)网页 之外的另一个独立的上下文环境里。 这对安全性很重要，因为它有助于阻止网站访问 Electron 的内部组件 和 您的预加载脚本可访问的高等级权限的API 。

这意味着，实际上，您的预加载脚本访问的 `window` 对象**并不是**网站所能访问的对象。 例如，如果您在预加载脚本中设置 `window.hello = 'wave'` 并且启用了上下文隔离，当网站尝试访问`window.hello`对象时将返回 undefined。

自 Electron 12 以来，默认情况下已启用上下文隔离，并且它是 *所有应用程序*推荐的安全设置





### 安全事项

单单开启和使用 `contextIsolation` 并不直接意味着所做的一切都是安全的。 例如，此代码是 **不安全的**

```js
// preload.js

// ❌ 错误使用
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了一个没有任何参数过滤的高等级权限 API 。 这将允许任何网站发送任意的 IPC 消息，这不会是你希望发生的。 相反，暴露进程间通信相关 API 的正确方法是为每一种通信消息提供一种实现方法

```js
// preload.js

// ✅ 正确使用
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```



### 与Typescript一起使用

如果想要用Typescript构建Electron应用程序，需要给通过 context bridge 暴露的 API 添加类型。 渲染进程的 `window` 对象将不会包含正确扩展类型，除非给其添加了 [类型声明](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

例子：

```typescript
// preload.ts

contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

可以创建一个 `renderer.d.ts` 类型声明文件，并且全局增强 `Window` 接口。

```typescript
// renderer.d.ts

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

  以上所做皆是为了确保在您编写渲染进程的脚本时， TypeScript 编译器将会知晓`electronAPI`合适地在您的全局`window`对象中





## 进程间通信

进程间通信 (IPC) 是在 Electron 中构建功能丰富的桌面应用程序的关键部分之一。 由于主进程和渲染器进程在 Electron 的进程模型具有不同的职责，因此 IPC 是执行许多常见任务的唯一方法，例如从 UI 调用原生 API 或从原生菜单触发 Web 内容的更改





### IPC通道

在 Electron 中，进程使用 [`ipcMain`](https://www.electronjs.org/zh/docs/latest/api/ipc-main) 和 [`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer) 模块，通过开发人员定义的“通道”传递消息来进行通信。 这些通道是 **任意** （可以随意命名它们）和 **双向** （可以在两个模块中使用相同的通道名称）的





### 模式1：渲染进程到主进程（单向）

要将单向IPC消息从渲染进程发送到主进程，官方提供了`ipcRenderer.send`API来发送消息，然后在主进程使用`ipcMain.on`API接收。通常使用此模式从 Web 内容调用主进程 API



#### 1.使用ipcMain.on API监听事件

```js
// main.js

const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

//...

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.on('set-title', handleSetTitle)
  createWindow()
}
//...
```

上面的 `handleSetTitle` 回调函数有两个参数：一个 [IpcMainEvent](https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-event) 结构和一个 `title` 字符串。 每当消息通过 `set-title` 通道传入时，此函数找到附加到消息发送方的 BrowserWindow 实例，并在该实例上使用 `win.setTitle` API。





#### 2.通过预加载脚本暴露ipcRenderer.send

要将消息发送到上面创建的监听器，可以使用 `ipcRenderer.send` API。 默认情况下，渲染器进程没有权限访问 Node.js 和 Electron 模块。 作为应用开发者，需要使用 `contextBridge` API 来选择要从预加载脚本中暴露哪些 API。

在预加载脚本中添加以下代码，向渲染器进程暴露一个全局的 `window.electronAPI` 变量 

```js
// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})
```





#### 3.构建渲染器进程UI

在 BrowserWindow 加载的我们的 HTML 文件中，添加一个由文本输入框和按钮组成的基本用户界面，为了使这些元素具有交互性，我们将在导入的 `renderer.js` 文件中添加几行代码，以利用从预加载脚本中暴露的 `window.electronAPI` 功能：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    Title: <input id="title"/>
    <button id="btn" type="button">Set</button>
    <script src="./renderer.js"></script>
  </body>
</html>
```

```js
// renderer.js

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')
setButton.addEventListener('click', () => {
    const title = titleInput.value
    window.electronAPI.setTitle(title)
});
```







### **模式2.渲染器进程到主进程（双向）**

双向 IPC 的一个常见应用是从渲染器进程代码调用主进程模块并等待结果。 这可以通过将 [`ipcRenderer.invoke`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args) 与 [`ipcMain.handle`](https://www.electronjs.org/zh/docs/latest/api/ipc-main#ipcmainhandlechannel-listener) 搭配使用来完成



代码和上述的代码类似，只是将相关API替换，过程一样：

监听事件-----> 通过预加载脚本暴露API -----> 构建渲染器进程UI



#### 对比旧方法

`ipcRenderer.invoke` API 是在 Electron 7 中添加的，作为处理渲染器进程中双向 IPC 的一种开发人员友好的方式。 但这种 IPC 模式存在几种替代方法。



`ipcRenderer.send`API也可以用于双向通信 ，这是在 Electron 7 之前通过 IPC 进行异步双向通信的推荐方式

```js
// preload.js

// 您也可以使用 `contextBridge` API
// 将这段代码暴露给渲染器进程
const { ipcRenderer } = require('electron')

ipcRenderer.on('asynchronous-reply', (_event, arg) => {
  console.log(arg) // 在 DevTools 控制台中打印“pong”
})
ipcRenderer.send('asynchronous-message', 'ping')
```

```js
// main.js

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印“ping”
  // 作用如同 `send`，但返回一个消息
  // 到发送原始消息的渲染器
  event.reply('asynchronous-reply', 'pong')
})
```

但是这种方法有几个缺点：

- 需要设置第二个参数`ipcRenderer.on` 监听器来处理渲染器进程中的响应。 使用 `invoke`，将获得作为 Promise 返回到原始 API 调用的响应值
- 没有显而易见的方法可以将 `asynchronous-reply` 消息与原始的 `asynchronous-message` 消息配对。 如果您通过这些通道非常频繁地来回传递消息，则需要添加其他应用代码来单独跟踪每个调用和响应



由于上述API的缺点问题，官方曾提出`ipcRenderer.sendSync`新API来解决问题。`ipcRenderer.sendSync` API 向主进程发送消息，并 *同步*  等待响应

```js
// preload.js

// 您也可以使用 `contextBridge` API
// 将这段代码暴露给渲染器进程
const { ipcRenderer } = require('electron')

const result = ipcRenderer.sendSync('synchronous-message', 'ping')
console.log(result) // 在 DevTools 控制台中打印“pong”
```

```js
// main.js

const { ipcMain } = require('electron')
ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // 在 Node 控制台中打印“ping”
  event.returnValue = 'pong'
})
```

这份代码的结构与 `invoke` 模型非常相似，但出于性能原因，我们建议**避免使用此 API**。 它的同步特性意味着它将阻塞渲染器进程，直到收到回复为止



故invoke模型是官网迭代优化的解决方案







### 模式3：主进程到渲染进程（单向）

将消息从主进程发送到渲染器进程时，需要指定是哪一个渲染器接收消息。 消息需要通过其 [`WebContents`](https://www.electronjs.org/zh/docs/latest/api/web-contents) 实例发送到渲染器进程。 此 WebContents 实例包含一个 [`send`](https://www.electronjs.org/zh/docs/latest/api/web-contents#contentssendchannel-args) 方法，其使用方式与 `ipcRenderer.send` 相同



#### 1.使用webcontents模块发送消息

对于此演示，我们需要首先使用 Electron 的 `Menu` 模块在主进程中构建一个自定义菜单，该模块使用 `webContents.send` API 将 IPC 消息从主进程发送到目标渲染器

```js
// main.js

const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainWindow.webContents.send('update-counter', 1),
          label: 'Increment',
        },
        {
          click: () => mainWindow.webContents.send('update-counter', -1),
          label: 'Decrement',
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')
}
//...
```



#### 2.通过预加载脚本暴露ipcRenderer.on

与前面的渲染器到主进程的示例一样，我们使用预加载脚本中的 `contextBridge` 和 `ipcRenderer` 模块向渲染器进程暴露 IPC 功能:

```js
// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
})
```

加载预加载脚本后，渲染器进程应有权访问 `window.electronAPI.onUpdateCounter()` 监听器函数。





#### 3.构建渲染器进程UI

为了将它们联系在一起，我们将在加载的 HTML 文件中创建一个接口，其中包含一个 `#counter` 元素，我们将使用该元素来显示值。最后，为了更新 HTML 文档中的值，我们将添加几行 DOM 操作的代码，以便在每次触发 `update-counter` 事件时更新 `#counter` 元素的值：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Menu Counter</title>
  </head>
  <body>
    Current value: <strong id="counter">0</strong>
    <script src="./renderer.js"></script>
  </body>
</html>
```

```js
// renderer.js

const counter = document.getElementById('counter')

window.electronAPI.onUpdateCounter((_event, value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue
})
```



在上面的代码中，我们将回调传递给从预加载脚本中暴露的 `window.electronAPI.onUpdateCounter` 函数。 第二个 `value` 参数对应于我们传入 `webContents.send` 函数的 `1` 或 `-1`，该函数是从原生菜单调用的





### 模式4：渲染器进程到另一个渲染器进程

没有直接的方法可以使用 `ipcMain` 和 `ipcRenderer` 模块在 Electron 中的渲染器进程之间发送消息。 为此，您有两种选择：

- 将主进程作为渲染器之间的消息代理。 这需要将消息从一个渲染器发送到主进程，然后主进程将消息转发到另一个渲染器。
- 从主进程将一个 [MessagePort](https://www.electronjs.org/zh/docs/latest/tutorial/message-ports) 传递到两个渲染器。 这将允许在初始设置后渲染器之间直接进行通信。





### 对象序列化

Electron 的 IPC 实现使用 HTML 标准的 [结构化克隆算法](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) 来序列化进程之间传递的对象，这意味着只有某些类型的对象可以通过 IPC 通道传递。

特别是 DOM 对象（例如 `Element`，`Location` 和 `DOMMatrix`），Node.js 中由 C++ 类支持的对象（例如 `process.env`，`Stream` 的一些成员）和 Electron 中由 C++ 类支持的对象（例如 `WebContents`、`BrowserWindow` 和 `WebFrame`）无法使用结构化克隆序列化







## 进程沙盒化

Chromium的一个关键安全特性是，进程可以在沙盒中执行。 沙盒通过限制对大多数系统资源的访问来减少恶意代码可能造成的伤害 — 沙盒化的进程只能自由使用CPU周期和内存。 为了执行需要额外权限的操作，沙盒处的进程通过专用通信渠道将任务下放给更大权限的进程。

在Chromium中，沙盒化应用于主进程以外的大多数进程。 其中包括渲染器进程，以及功能性进程，如音频服务、GPU 服务和网络服务。



### Electron中的沙盒行为

在 Electron 中沙盒进程 *大部分地* 表现都与 Chromium 差不多， 但因为介面是 Node.js 的关系 Electron 有一些额外的概念需要考虑。



#### 渲染器进程

当 Electron 中的渲染进程被沙盒化时，它们的行为与常规 Chrome 渲染器一样。 一个沙盒化的渲染器不会有一个 Node.js 环境。

因此，在沙盒中，渲染进程只能透过 进程间通讯 (inter-process communication, IPC) 委派任务给主进程的方式， 来执行需权限的任务 (例如：文件系统交互，对系统进行更改或生成子进程) 。



#### Preload脚本

为了让渲染进程能与主进程通信，附属于沙盒化的渲染进程的 preload 脚本中仍可使用一部分以 Polyfill 形式实现的 Node.js API。 有一个与 Node 中类似的 `require` 函数提供了出来，但只能载入 Electron 和 Node 内置模块的一个子集：

- `electron` (仅限渲染器进程模块)
- [`事件`](https://nodejs.org/api/events.html)
- [`timers`](https://nodejs.org/api/timers.html)
- [`url`](https://nodejs.org/api/url.html)

此外，以下 Node.js 基础对象也填充到了 preload 脚本的全局上下文中：

- [`Buffer`](https://nodejs.org/api/buffer.html)
- [`process`](https://www.electronjs.org/zh/docs/latest/api/process)
- [`clearImmediate`](https://nodejs.org/api/timers.html#timers_clearimmediate_immediate)
- [`setImmediate`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args)

`require` 函数只是一个功能有限的 Ployfill 实现，并不支持把 preload 脚本拆成多个文件然后作为 [CommonJS 模块](https://nodejs.org/api/modules.html#modules_modules_commonjs_modules) 来加载。 若需要拆分 preload 脚本的代码，可以使用 [webpack](https://webpack.js.org/) 或 [Parcel](https://parceljs.org/) 等打包工具。

注意，因为 `preload` 脚本的运行环境本质上比沙盒化渲染进程的拥有更高的特权，除非开启了 [`contextIsolation`](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation)，否则高特权的 API 仍有可能被泄漏给渲染进程中的不信任代码





### 配置沙盒

对于大多数应用程序，沙箱是最好的选择。在某些与沙盒不兼容的用例中（例如，在渲染器中使用本机节点模块时），可以为特定进程禁用沙盒。这会带来安全风险，尤其是在未发送的进程中存在任何不受信任的代码或内容时



#### 为单个进程禁用沙盒

在Electron中，可以使用BrowserWindow构造函数中的sandbox:false首选项按进程禁用渲染器沙盒

```js
// main.js

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('https://google.com')
})
```

当Nodejs集成在renderer进程禁用时，沙盒也会禁用。可以通过选择BrowserWindow中的nodeIntegration选项为true来开启Node集成

```js
// main.js

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadURL('https://google.com')
})
```



#### 全局启动沙盒

官方也提供了`app.enableSandbox`API来强制沙盒化所有渲染器，注意，此API必须在应用的ready事件之前调用

```js
// main.js

app.enableSandbox()
app.whenReady().then(() => {
  // any sandbox:false calls are overridden since `app.enableSandbox()` was called.
  const win = new BrowserWindow()
  win.loadURL('https://google.com')
})
```





## Electron中的消息端口

[`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort)是一个允许在不同上下文之间传递消息的Web功能。 就像 `window.postMessage`, 但是在不同的通道上。