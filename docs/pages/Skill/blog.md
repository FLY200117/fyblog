# 博客网站

一个博客网站搭建的文章：

搭建一个博客，首先就是该网站的定位，如果是CSR，那就选择正常的前后端框架，如果想要SSG静态生成提供的性能上的优势，那可以选择主流框架下的博客框架或者一些好用的博客框架，这里框架的选型就不一一介绍了，对自己哪个框架熟悉就选哪个，或者如果你都不想用V或者R，也有一些很好用的框架，请[自行搜索](https://juejin.cn/search?query=%E5%8D%9A%E5%AE%A2%E6%A1%86%E6%9E%B6&type=0)

网站解决完后，我们需要部署到服务器上，市面上有很多成熟的云厂商，他们都提供了一系列强大的部署能力，由于是博客网站，如果我们选择的是SSG框架，那么需要搜索支持SSG的云厂商，博客框架中也有部署说明



# 框架选型

框架上的选型，我选择的是[Vuepress2](https://v2.vuepress.vuejs.org/zh/)



## 项目创建

首先，我们需要创建一个博客文件夹，然后初始化并创建项目

```sh
mkdir vuepress2
cd vuepress2

git init
npm init

npm install -D vuepress@next
```



::: tips

如果npm安装不了的，可以使用下面命令：`npm install -D vuepress@next --registry=https://registry.npmmirror.com/`

:::



然后，需要在`package.json`中添加脚本

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```



将默认的临时目录和缓存目录添加到`.gitignore`文件中

```
node_modules
.temp
.cache
```



创建一个文件夹docs，里面创建一个新的README.md文件，然后输入# hello world，最后让我们运行脚本来看看结果如何：`npm run docs:dev`

![1672373422420](C:/Users/86186/Desktop/Vue学习图片/1672373422420.png)



这样，我们的博客基础就创建完成了



## 丰富项目

vuepress提供了许多强大的功能，下面我们就来使用其来丰富我们的项目。



vuepress的生态圈极其庞大，里面有各种各样的主题，如果想要查找他们，可以前往`npmjs`中搜索`keywords:vuepress-theme`，[链接在此](https://www.npmjs.com/search?q=keywords:vuepress-theme)



下面我们示范的是官网提供的默认主题



在`docs`下再新建一个`.vuepress`文件夹，在里面放入配置文件`config.js`,项目的结构如下：

```text
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignoret
└─ package.json
```



在config文件中配置基础内容



```js
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
})
```



接下来丰富下我们的主页，主页的内容是在README.md中的，所以我们只需要更改该文件即可，这里使用官网推荐的README文件

```Frontmatter
---
home: true
heroImage: /images/home.jpg
heroImageDark: /images/home2.jpg
heroText: 成长指南
tagline: 分享技术
features:
- title: 简洁开发
  details: 该文档主要使用Vuepress开发
- title: 享受技术
  details: 在这里能看到我在程序员道路上的学习与分享，欢迎各位技术大佬相互交流。
- title: 交个朋友
  details: 爱打篮球和游戏，撸铁和美食也是我的最爱，欢迎各位码友线下🤺
footer: "WeChat:  yufei200117 | Copyright © 2022-present Evan You"
---
```

这里的图片资源主要来源于.vuepress文件下的public目录下的images文件，这里因为层级有点多，我直接放上目录结构

```text
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  │  └─ public
│  │  │  └─ images
│  │  │  │  └─ home.jpg
│  └─ README.md
├─ .gitignoret
└─ package.json
```



然后使用默认主题配置博客的navbar

这里的link是以docs为根目录的，所以我们在docs下创建一个pages来作为文章的管理文件，在里面放入一篇test1.md，然后再写入# test1d的内容，再在link中写入即可

```js
export default defineUserConfig({
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  theme: defaultTheme({
      navbar: [
          {
              text: '主页',
              link: '/'
          },
          {
              text: 'test1',
              children: [
                  {
                      text: '1',
                      link: '/pages/test1.md'
                  },
                  {
                    text: '2',
                    link: ''
                  }
              ]
          }
      ]
  })
})
```



进去之后，如果我们想要配置左边的侧边栏，那可以在主题中添加sidebar属性，再在里面进行一个路由关联

```js
sidebar: {
  '/pages/': [
      {
           text: 'test1',
           link: '/pages/test1.md'
      }
  ]
}
```



如果我们想要在博客中添加自定义组件时，markdown语法也能解析vue语法，这是因为每个md文件首先会被编译为html，然后转换为一个Vue单文件组件SFC，所以写在里面的vue语法是能被解析的，所有除了script和style标签包裹的内容都会先被编译为HTML，然后被当作template的内容，我们可以来编写一个demo.md文件

```markdown
_你好， {{ msg }}_

<RedDiv>

_当前计数为： {{ count }}_

</RedDiv>

<button @click="count++">点我！</button>

<script setup>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>

<style>
.red-div {
  color: red;
}
</style>
```



现在我们就能随心所欲的配置我们想要的博客内容了



# 服务器部署

服务端部署有很多方式，这里选用的是Github Pages，和Github Actions

上传项目前，需要更改config文件中的base属性，更改为`'/ 你的仓库名 /'`

```js
  base: '/test/',
```

首先我们创建一个github仓库，然后上传项目，注意配置`.gitignore`文件



然后去获取我们的ACCESS_TOKEN，点击右上角头像，点击Settings -> Developer settings -> Personal access tokens -> Generate new token，然后勾选repo后生成token，将token复制下来，进入Settings -> Secrets -> Actions -> New repository secret，NAME就填ACCESS_TOKEN，value就填刚刚生成的token

点击项目中的Actions，然后新建一个workflow，在里面新建的workflow文件中填入以下内容

```yml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'


      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        run: npm install

      # 运行构建脚本
      - name: Build VuePress site
        run: npm run docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```



最后再回到Setting -> pages中，将Branch中的main换成gh-pages，然后save保存一下，这样我们就可以回到Actions页面查看项目的构建情况，最后部署后的路径可以在pages页面中查看



