# Electron

## Electron是什么？
Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium](https://www.chromium.org/) 和 [Node.js](https://nodejs.org/) 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验

Electron 是网页应用 (web apps) 的一个原生包装层，在 Node.js 环境中运行

## 创建一个Electron应用

首先，先初始化一个新建项目

```
npm init
```



然后，在package.json中设置启动脚本（scripts下的start）

```js
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT",
  "scripts": {
    "start": "electron ."
  },
  "devDependencies": {
    "electron": "^19.0.0"
  }
}
```



然后新建main.js，配置一下main.js	

```js
const { app, BrowserWindow } = require('electron')

// 创建窗口函数，里面的win可以配置一些常用的设置；例如窗口大小
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  // 窗口中需要显示的html，或者是一个url网址
  win.loadFile('index.html')
}

// 在app.whenReady()的回调中调用窗口初始化函数
app.whenReady().then(() => {
  createWindow()
})
```



`win.loadFile`是将前面html页面嵌入到窗口中，我们简单设置一个页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    hello world
</body>
</html>
```



这样，在打开的Electron应用上就能显示html了，一个简单的Electron应用就完成了



Electron 程序是通过 npm 包创建的。 应将 Electron 依赖安装到 `devDependencies` ，然后在 package.json 中设置一个脚本来运行。

执行命令后，Electron 程序会运行在 package.json 文件的 `main` 字段设置的入口文件。 这个入口文件控制着 Electron 的**主进程**，后者运行于 Node.js 实例，负责应用的生命周期、展示原生窗口、执行特殊操作和管理渲染进程。

**渲染器进程**（简称渲染器）负责展示图形内容。 可以将渲染的网页指向 web 地址或本地 HTML 文件。 渲染器和常规的网页行为很相似，访问的 web API 也相同。



## 使用预加载脚本



### 什么是预加载脚本

Electron 的主进程是一个拥有着完全操作系统访问权限的 Node.js 环境。 除了 [Electron 模组](https://www.electronjs.org/zh/docs/latest/api/app) 之外，你也可以使用 [Node.js 内置模块](https://nodejs.org/dist/latest/docs/api/) 和所有通过 npm 安装的软件包。 另一方面，出于安全原因，渲染进程默认跑在网页页面上，而并非 Node.js里

为了将 Electron 的不同类型的进程桥接在一起，我们需要使用被称为 **预加载** 的特殊脚本





### 使用预加载脚本来增强渲染器

预加载脚本像 Chrome 扩展的 [内容脚本](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)（Content Script）一样，会在渲染器的网页加载之前注入。 如果你想向渲染器加入需要特殊权限的功能，可以通过 [contextBridge](https://www.electronjs.org/zh/docs/latest/api/context-bridge) 接口定义 [全局对象](https://developer.mozilla.org/en-US/docs/Glossary/Global_object)



新建一个preload.js文件，然后在前面实例化的浏览器窗口对象`win`下去配置属性`webPreferences`，在该对象中设置一个名为preload属性，它的值是当前preload的绝对路径，所以一般会使用node模块下的path来获取preload文件的绝对路径

```js
webPreferences: {
    preload: path.resolve(__dirname,'./preload.js')
}
```



这样，预加载脚本就设置好了，可以开始在脚本里面编写代码了



当前预加载脚本是在渲染进程中的，和主进程不一样，我们可以在预加载脚本中设置一些值或者一些函数，然后通过ipc通信来向主进程传递信息

```js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 能暴露的不仅仅是函数，我们还可以暴露变量
})
```



这样，我们就能全局访问预加载脚本传递过来的值了，新建一个renderer.js文件，然后通过前面的html将该文件作为外部脚本引入即可，在当前脚本就可以在window全局下访问预加载脚本传递过来的值了

```js
const information = document.getElementById('info')
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`
```





### 进程之间通信

Electron 的主进程和渲染进程有着清楚的分工并且不可互换。 这代表着无论是从渲染进程直接访问 Node.js 接口，亦或者是从主进程访问 HTML 文档对象模型 (DOM)，都是不可能的。当然，如果非要在渲染进程中访问Node接口也不是不能，可以通过在win中配置下面属性即可，但官方不推荐这样做，因为他们之间有着清除明确的分工

```js
webPreferences: {
   nodeIntegration: true,
   contextIsolation: false
},
```





官网解决这一问题的方法是使用进程间通信 (IPC)。可以使用 Electron 的 `ipcMain` 模块和 `ipcRenderer` 模块来进行进程间通信。 为了从你的网页向主进程发送消息，你可以使用 `ipcMain.handle` 设置一个主进程处理程序（handler），然后在预处理脚本中暴露一个被称为 `ipcRenderer.invoke` 的函数来触发该处理程序（handler）。

下面是官网的例子：

```js
// preload.js

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // 能暴露的不仅仅是函数，我们还可以暴露变量
})
```



然后，在主进程中设置你的 `handle` 监听器。 我们在 HTML 文件加载*之前*完成了这些，所以才能保证在你从渲染器发送 `invoke` 调用之前处理程序能够准备就绪

```js
// main.js
const { ipcMain } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
}
```



将发送器与接收器设置完成之后，现在你可以将信息通过刚刚定义的 `'ping'` 通道从渲染器发送至主进程当中

```js
// renderer.js
const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}

func()
```



## 添加功能

上述我们已经体验到Electron应用了，通过上述的学习可以知道Electron大概从两个方向上进行开发：

1. 增加渲染进程的网页应用代码复杂度
2. 深化与操作系统和 Node.js 的集成



了解这两个大概念之间的区别十分重要。 就第一点而言，Electron 特供的资源是非必要的。 在 Electron 中建立一个漂亮的待办列表只是将你的 Electron BrowserWindow 指向一个漂亮的待办列表网络应用。 说到底，你还是使用在 Web 开发中相同的工具 (HTML, CSS, JavaScript) 来构建你的渲染器 UI。 因此，Electron 的文档不会很详细的探讨如何使用标准的 Web 工具进行开发。

另一方面，Electron 同时提供了丰富的工具集，可以让你和桌面环境整合起来。从建立托盘图标到添加全局的快捷方式，再到显示原生的菜单，都不在话下。 Electron 还赋予你在主进程中访问 Node.js 环境的所有能力。 这组能力使得 Electron 应用能够从浏览器运行网站中脱胎换骨，并且是 Electron 文档的重点



## 打包应用

当我们完成项目后，需要将electron项目打包成真正的应用程序，这里官方推荐的是使用`Electron Forge`

Electron 的核心模块中没有捆绑任何用于打包或分发文件的工具。 如果在开发模式下完成了一个 Electron 应用，需要使用额外的工具来打包应用程序 (也称为**可分发文件**) 并分发给用户 。 可分发文件可以是安装程序 (例如 Windows 上的 MSI) 或者绿色软件 (例如 macOS 上的 `.app` 文件)。

Electron Forge 是一个处理 Electron 应用程序打包与分发的一体化工具。 在工具底层，它将许多现有的 Electron 工具 (例如 [`electron-packager`](https://github.com/electron/electron-packager)、 [`@electron/osx-sign`](https://github.com/electron/osx-sign)、[`electron-winstaller`](https://github.com/electron/windows-installer) 等) 组合到一起，因此您不必费心处理不同系统的打包工作



### 向Forge导入项目

将 Electron Forge 的 CLI 工具包安装到项目的 `devDependencies` 依赖中，然后使用现成的转化脚本将项目导入至 Electron Forge

```
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

转换脚本完成后，Forge 会将一些脚本添加到您的 `package.json` 文件中

```js
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  //...
```



此外，需要注意的是，package.json 的 `devDependencies` 下安装了一些其他的包，并且添加了一个 `config.forge` 字段，其中包含了一组 makers 插件配置。 **Makers** 是一个可以从您的源代码创建可分发文件的 Forge 插件。 您可以在现有的配置中看到多个 makers 插件，其中每个都对应着一个目标操作系统





### 创建一个可分发版本

要创建可分发文件，请使用项目中的 `make` 脚本，该脚本最终运行了 `electron-forge make` 命令。

```
npm run make
```

该 `make` 命令包含两步：

1. 它将首先运行 `electron-forge package` ，把您的应用程序 代码与 Electron 二进制包结合起来。 完成打包的代码将会被生成到一个特定的文件夹中。
2. 然后它将使用这个文件夹为每个 maker 配置生成一个可分发文件。

在脚本运行后，您应该看到一个 `out` 文件夹，其中包括可分发文件与一个包含其源码的文件夹

`out/make` 文件夹中的应用程序应该可以启动了！ 现在，您已经创建了你的第一个 Electron 程序。



### 重要提示：对代码签名

将桌面应用程序分发给终端用户前，我们 *强烈推荐* 您对 Electron 应用进行 **代码签名**。 代码签名是交付桌面应用程序的重要组成部分，并且它对于应用程序的自动更新功能来说是必需的

代码签名是一种可用于证明桌面应用程序是由已知来源创建的安全技术。 Windows 和 macOS 拥有其特定的代码签名系统，这将使用户难以下载或启动未签名的应用程序

如果已经拥有适用于 Windows 和 macOS 的代码签名证书，可以直接添加到 Forge 配置中。 否则，请参阅完整的 [代码签名](https://www.electronjs.org/zh/docs/latest/tutorial/code-signing) 文档以了解证书购买以及应用程序代码签名的详细流程

在 macOS 上，代码签名是在应用程序打包时完成的。 而在 Windows 中，则是对可分发文件进行签名操作。

 window：

```js
{
  //...
  "config": {
    "forge": {
      //...
      "makers": [
        {
          "name": "@electron-forge/maker-squirrel",
          "config": {
            "certificateFile": "./cert.pfx",
            "certificatePassword": "this-is-a-secret"
          }
        }
      ]
      //...
    }
  }
  //...
}
```

mac：

```js
{
  //...
  "config": {
    "forge": {
      //...
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "hardened-runtime": true,
          "entitlements": "entitlements.plist",
          "entitlements-inherit": "entitlements.plist",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix.fun",
          "appleIdPassword": "this-is-a-secret"
        }
      }
      //...
    }
  }
  //...
}
```







## 发布和更新





### 使用update.electronjs.org

Electron 官方在 [https://update.electronjs.org](https://update.electronjs.org/) 上为开源应用程序提供了免费的自动更新服务。 使用它有以下几点要求：

- 你的应用在 macOS 或 Windows 上运行
- 你的应用有一个公开的 GitHub 仓库
- 应用程序需要发布到 [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository) 中
- 应用程序需要完成 [签名](https://www.electronjs.org/zh/docs/latest/tutorial/code-signing)



至此，假设已经将代码上传到GitHub仓库中



### 发布一个Github版本

Electron Forge 的 [Publisher](https://www.electronforge.io/config/publishers) 插件可以自动将打包的应用程序分发到各种来源



#### 生成个人访问令牌

未经许可，Forge无法发布到Github上的任意库中，需要传入一个经过身份验证的令牌来使Forge能够访问个人的Github仓库。最简单的方式是使用public_repo作用域[创建一个新的个人访问令牌（PAT）](https://github.com/settings/tokens/new)



#### 设置Github发布者



##### 安装模块

安装插件Forge Github Publisher到项目的依赖项`devDependencies`

```
npm install --save-dev @electron-forge/publisher-github
```



##### 在Forge中配置发布者

一旦安装了它，就需要在Forge配置中进行设置。Forge的PublisherGitHubConfig API文档中记录了完整的选项列表

```js
// package.js
{
  //...
  "config": {
    "forge": {
      "publishers": [
        {
          "name": "@electron-forge/publisher-github",
          "config": {
            "repository": {
              "owner": "github-user-name",
              "name": "github-repo-name"
            },
            "prerelease": false,
            "draft": true
          }
        }
      ]
    }
  }
  //...
}
```





##### 设置身份验证token

同时，还需要让发布服务器知道设置的身份验证令牌。默认情况下，它将使用存储在GITHUB_TOKEN环境变量中的值，设置完后，发布设置就已经配置完了



#### 运行发布命令

添加Forge的发布命令到package.json的脚本命令中

```js
// package.json
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make",
    "publish": "electron-forge publish"
  },
  //...
```

当前命令会运行设置好的配置，并将可分发文件发布到新的Github版本

```
npm run publish
```

默认情况下，这将只为主机操作系统和体系结构发布一个可分发的文件。您可以通过将--arch标志传递给Forge命令来发布不同的体系结构。

此版本的名称将与项目中的版本字段相对应的package.json文件



##### 在Github上发布

本地发布可能会很痛苦，尤其是因为只能为主机操作系统创建可分发文件（即您不能从macOS发布Window.exe文件）。

解决方案是通过诸如GitHub Actions之类的自动化工作流发布应用程序，该工作流可以在Ubuntu、macOS和Windows上运行云中的任务。这正是Electron Fiddle所采用的方法。您可以参考Fiddle的Build and Release管道和Forge配置以了解更多详细信息



### 检测更新程序代码

现在我们已经通过GitHub发布了一个功能性的发布系统，现在需要告诉Electron应用程序在新版本发布时下载更新。Electron应用程序通过autoUpdater模块实现这一点，该模块从更新服务器提要中读取数据，以检查是否有新版本可供下载。

update.electronjs.org服务提供与更新程序兼容的提要。例如，Electron Fiddle v0.28.0将检查端点https://update.electronjs.org/electron/fiddle/darwin/v0.28.0查看是否有更新的GitHub版本可用。

在您的发行版发布到GitHub后，update.electronjs.org服务应该适用于您的应用程序。剩下的唯一步骤是使用autoUpdater模块配置提要。

为了简化这个过程，Electron团队维护了update-Electron-app模块，该模块为update.electronjs设置了autoUpdater样板。org在一个函数调用中-无需配置。本模块将搜索update.electronjs。与项目匹配的package.json中的“repository”字段。

首先，将模块作为运行时依赖项安装

```
npm install update-electron-app
```



然后，导入该包并在主线程中立马调用它

```js
// main.js

require('update-electron-app')()
```

这样就完成了该包自动检测更新代码，应用程序打包后，它将针对发布的每个新Github版本进行自我更新