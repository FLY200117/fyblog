# Deno入门





## 什么是Deno

Deno 是一个简单、先进且安全的 JavaScript 和 TypeScript 运行时环境，其基于 V8 引擎并采用 Rust 编程语言构建。

1. 默认安全设置。除非 显式开启，否则不能访问文件、网络，也不能访问运行环境。
2. 天生支持 TypeScript。
3. 只有一个唯一的可执行文件。
4. 自带实用工具，例如依赖检查器 (`deno info`) 和代码格式化工具 (`deno fmt`)。
5. 有一套经过审核（审计）的标准模块， 确保与 Deno 兼容： [deno.land/std](https://deno.land/std)
6. 有大量的 [企业对使用 Deno 感兴趣](https://github.com/denoland/deno/wiki#companies-interested-in-deno)



::: tip

上面都是Deno官网对Deno的解释，Ryan Dahl就是Deno的创始人，那么我们熟知的NodeJS其实也是他创作的，Node在近几年已经开始变得越来越受欢迎，但同时也暴露出了它自身的缺陷，于是，Dahl为了解决之前存在的所有问题，可以将Deno当成是Node的升级版

:::



## 安装Deno

Shell（Linux，Max）：

```
curl -fsSL https://deno.land/install.sh | sh
```

PowerShell（windows）：

```
iwr https://deno.land/install.ps1 -useb | iex
```



安装完后可以使用deno --help来查看相关指令



## REPL

在命令行中输入deno，会帮我们开启一个REPL，该模式下，我们的终端上的显示会变得不一样，最上面显示的是当前deno的版本号，下面一句是如何退出REPL模式，一共有三种：`ctrl+d`，`ctrl+c`，`close()`

在该模式下，我们可以输入js代码来帮助我们测试



## 执行ts脚本

deno为我们提供了远程执行脚本的能力，直接在命令行中输入下面代码，就能执行deno放在官网github仓库中的welcoome文件

```
deno run https://deno.land/std/examples/welcome.ts
```



又或者直接在本地文件中导入远程脚本

```typescript
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";

console.log("http://localhost:8000/");
serve((req) => new Response("Hello World\n"), { port: 8000 });
```

该代码会从网上导入serve模块，并且在本地的cache中生产当前依赖，在下一次运行时本地依赖的优先级会比远程的优先级高，deno会优先选择本地文件运行，我们可以在命令行中输入deno.info来查看本地的依赖

+ Deno_Dir location: deno本地总目录
+ Remote modules cache（远程缓存模块）：放在deps文件夹下
+ npm modules cache（本地npm缓存）：在npm文件夹中
+ Emitted modules cache（已发送的模块缓存）：在gen文件夹中
+ Language server registries cache（语言服务器注册表缓存）：在registries文件夹中
+ Origin storage（原点存储）：在location_data文件夹中



执行本地的ts文件

```
deno run ./index.ts
```

> 本地的文件存储在gen文件夹中，并且会将文件保存在gen/file中，然后再以文件夹的形式将运行的代码的绝对路径给保存下来，而ts文件也会传存为`.ts.js`文件和`.ts.meta`文件

::: tip

需要执行本地文件时，在vscode中安装deno插件，然后使用`ctrl+shift+p`调出控制台，在其输入deno，选择`Deno: Initialize Workspace Configuration`即可清除文件中的警告，或者手动在项目根目录下创建`.vscode`文件夹，在里面的`settings.json`文件中配置

{

​    "deno.enable": true,

​    "deno.unstable": true

}  即可

:::



如果我们直接在本地文件中修改代码，执行运行是能产生效果的，但是如果我们希望重新编译TypeScript，即强制刷新缓存，可以添加`--reload`标志，来告诉deno需要重新刷新指定文件，更多



## TCP Echo Server

deno官网就为我们提供了一个TCP服务的例子：

```typescript
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";

console.log("http://localhost:8000/");
serve((req) => new Response("Hello World\n"), { port: 8000 });
```

在命令行中直接run该代码会获得一个警告：

```
Uncaught PermissionDenied: Requires net access to "0.0.0.0:8080", run again with the --allow-net flag 
const listener = Deno.listen({ port: 8080 });
```

出现警告的原因是Deno是一个运行时，默认使用安全环境执行代码，故所有请求外部资源的代码都不会被执行，我们可以添加`--allow-net` 的标志来让deno执行外部代码

```
deno run --allow-net ./index.ts
```







## HTTP Server

新起一个ts文件，然后输入下面代码：

```typescript
import { serve } from "https://deno.land/std@v0.50.0/http/server.ts";

const PORT = 8080;
const s = serve({ port: PORT });

console.log(` Listening on <http://localhost>:${PORT}/`);

for await (const req of s) {
  req.respond({ body: "Hello world" });
}
```

输入启动命令后，我们在地址栏上输入http://localhost:8080地址，就可以看到Hello world内容了