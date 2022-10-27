# HTML

[[toc]]



## 什么是HTML

超文本标记语言 (英语：**H**yper**t**ext **M**arkup **L**anguage，简称：HTML ) 是一种用来结构化 Web 网页及其内容的标记语言。网页内容可以是：一组段落、一个重点信息列表、也可以含有图片和数据表。

HTML 不是一门编程语言，而是一种用于定义内容结构的*标记语言*。HTML 由一系列的**元素（[elements](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)）**组成，这些元素可以用来包围不同部分的内容，使其以某种方式呈现或者工作。一对标签（ [tags](https://developer.mozilla.org/zh-CN/docs/Glossary/Tag)）可以为一段文字或者一张图片添加超链接，将文字设置为斜体，改变字号，等等





## Head头部

在html5的模板中，有一个head标签，该标签里的内容是不会在页面中显示出来。它里面包括了页面的标题`title`

，指向`css`或`js`的链接，指向自定义图标的链接和其他元数据（meta）

::: tip

js一般是不在head中引入的，因为我们一般需要在js中绑定一些元素事件，但是浏览器识别代码的时候，是从上往下解析的，所以解析head部分时，我们body中的元素还没有生成，所以此时的浏览器就会报js的错，一般是在body标签的下面使用script的src来引入外部js文件，如果想要浏览器执行html后再执行头部的js代码，也可以使用`defer`关键字来修饰`script`链接

:::

### meta

一般的元数据通常都会被用作确定文档的编码格式，除此以外，meta标签还可以有以下两种属性

- name：指定元素的类型；它包含什么类型的信息

- content：指定实际的meta内容

  ```html
  <meta name="author" content="Chris Mills">
  <meta name="description" content="The MDN Web Docs Learning Area aims to provide
  complete beginners to the Web with all they need to know to get
  started with developing web sites and applications.">
  ```



指定name和content与页面内容相关的关键字的描述，这样可以使页面在搜索引擎中执行的相关搜索中排名显示得更高，详见SEO优化

其他类型的meta元素：

- 例如，[Open Graph Data](https://ogp.me/)是Facebook发明的一种元数据协议，旨在为网站提供更丰富的元数据。在MDN Web Docs源代码中，你会发现这个：

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

- 这样做的一个影响是，当您在Facebook上链接到MDN Web Docs时，该链接将与图像和描述一起显示：为用户提供更丰富的体验

```html
<meta property="og:image" content="https://developer.mozilla.org/static/img/opengraph-logo.png">
<meta property="og:description" content="The Mozilla Developer Network (MDN) provides
information about Open Web technologies including HTML, CSS, and APIs for both Web sites
and HTML5 Apps. It also documents Mozilla products, like Firefox OS.">
<meta property="og:title" content="Mozilla Developer Network">
```

::: tip

注意：某些浏览器（如 Chrome）会自动修复不正确的编码，因此根据您使用的浏览器，您可能不会看到此问题。无论如何，您仍应在页面上设置 编码，以避免其他浏览器中出现任何潜在问题。`utf-8`

:::



## 预加载

link标签中的rel值当设置为preload时，就表示该资源需要预加载，这些资源会在页面加载生命周期的早期阶段进行预加载。这样可以保证这些资源可被更早使用并减少阻塞页面初次渲染的可能性，从而提升性能。

```html
<link rel="preload" href="./preload.js">
```

::: tip

预加载一般在项目中十分有用，可以在网页访问后执行一些我们想要的代码，例如监控SDK，预加载页面，让网页访问速度更快，这取决于我们项目中网页的定位，同时不仅有preload，还有prefetch和prerender两种不同的预加载，详情请见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types)

:::



## 标签

关于标签，很多常用的标签可以看[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)查询，这里说一些常用的标签：img，audio，video，div等基础标签，关于基础标签，有一个重要的划分线，即行内元素及块级元素

行内元素有：

+ i，em，strong，a，br，img，span，button，input，label



块级元素有：

+ div，acticle，aside，footer，h1-6，header，p，section，ul，table





### iframe

从基本标签中我们可以将图片，视频，音频放到网页上，那么，能不能将网页也放到网页上呢？`iframe`标签允许嵌入其他网页，而同属于嵌入技术的还有`embed`标签和`object`标签，它们则是用于嵌入PDF和SVG

我们可以利用一些网站提供的iframe链接来实现：

```html
<iframe src="https://player.bilibili.com/player.html?aid=19390801&cid=31621681&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe> 
<p>改革春风吹满地</p>
```



iframe元素旨在允许将其Web文档嵌入到当前文档中，这很适合将第三方内容嵌入到网站中，但是这同样带来的风险——恶意攻击，如果有人试图恶意修改网页或其他恶意入侵网页的事时，iframe会成为首当其冲，例如显示用户名和密码等敏感信息。

::: tip

**备注：** [单击劫持](https://en.wikipedia.org/wiki/Clickjacking)是一种常见的 iframe 攻击，黑客将隐藏的 iframe 嵌入到你的文档中（或将你的文档嵌入到他们自己的恶意网站），并使用它来捕获用户的交互。这是误导用户或窃取敏感数据的常见方式。

:::

如果想要将自己的网页变得更加安全，可以在服务器上设置一个不允许嵌入iframe的配置（CSP指令），又或者可以使用https，它会比http更加安全，尽管证书的开销比http高，但安全性总应该是更加优先的。同时，**沙盒化**自己的iframe，想尽可能减少攻击者在你的网站上做坏事的机会，那么你应该给嵌入的内容仅能完成自己工作的权限。





### canvas

canvas标签通常是用来绘制JS中生成的2D和3D图形，它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。Canvas API 主要聚焦于 2D 图形。而同样使用`<canvas>`元素的 [WebGL API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 则用于绘制硬件加速的 2D 和 3D 图形。这两个API都是使用了`canvas`元素

可以通过canvas来操控视频（video），bilibili中的视频操作栏就是利用canvas制作的，同时，我们熟知的弹幕系统就来自canvas，通过每一帧刷新画布来重新绘制canvas来达到视觉上的滑动效果

很多插件都能实现弹幕（barrage）的效果，可以上npm自行查找对应的包

### svg

一般的图片会分为位图和矢量图两种

+ 位图使用像素网格来定义 — 一个位图文件精确得包含了每个像素的位置和它的色彩信息。流行的位图格式包括 Bitmap (`.bmp`), PNG (`.png`), JPEG (`.jpg`), and GIF (`.gif`.)
+ 矢量图使用算法来定义 — 一个矢量图文件包含了图形和路径的定义，电脑可以根据这些定义计算出当它们在屏幕上渲染时应该呈现的样子。 [SVG](https://developer.mozilla.org/zh-CN/docs/Glossary/SVG) 格式可以让我们创造用于 Web 的精彩的矢量图形。

矢量图标在很多情况下非常有用，由于有较小的文件体积，却高度可缩放，所以它们不会在镜头拉近或者放大图像时像素化。

```html
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="black" />
  <circle cx="150" cy="100" r="90" fill="blue" />
</svg>
```

SVG除了上述的功能还有其他优点：

+ 矢量图像中的文本仍然可访问（这也有利于 [SEO](https://developer.mozilla.org/zh-CN/docs/Glossary/SEO)）。
+ SVG 可以很好地适应样式/脚本，因为图像的每个组件都是可以通过 CSS 或通过 JavaScript 编写的样式的元素。



但同时，SVG也是具有一些缺点的：

+ SVG 非常容易变得复杂，这意味着文件大小会增加; 复杂的 SVG 也会在浏览器中占用很长的处理时间。
+ SVG 可能比栅格图像更难创建，具体取决于您尝试创建哪种图像。
+ 旧版浏览器不支持 SVG，因此如果您需要在网站上支持旧版本的 IE，则可能不适合（SVG 从 IE9 开始得到支持）。



::: tip

矢量图形相较于同样的位图，通常拥有更小的体积，因为它们仅需储存少量的算法，而不是逐个储存每个像素的信息

:::

​	