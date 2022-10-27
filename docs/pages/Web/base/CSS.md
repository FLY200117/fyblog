# CSS

[[toc]]





## CSS基础

css（层叠样式表）是用于设置和布置网页，html生成的Dom tree和css生成的style rules相结合就变成了我们看到的网页的形状，css可以被看作是用来表述dom节点的长相的，dom元素字体可以是红色的，大小可以是任意设置的，等等很多rules。css可以创建外观漂亮的网页

![render过程](/images/css/render.png)



::: tip

如果浏览器遇到无法解析的css代码时，会自行选择跳过该样式，继续去解析下一个css样式，这有利于我们解决css对低版本浏览器的兼容问题

:::





一般的css文件有三种形式，一种使外部样式，即使用link链接来导入css文件，另一种使内部样式，即在html文件中的head头部中使用`style`标签来编写css的形式，还有一种是少见的内联样式，即在单个元素标签上通过设置style属性来编写css，但通常不建议这样使用，因为它只能影响一个元素



### 层级与继承

css中的某些属性是存在层级的。在某些时候，在做一个项目过程中你会发现一些应该产生效果的样式没有生效。通常的原因是你创建了两个应用于同一个元素的规则。与[**层叠**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)密切相关的概念是[**优先级**（specificity）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)，决定在发生冲突的时候应该使用哪条规则

浏览器是根据[优先级](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。它基本上是一个衡量选择器具体选择哪些区域的尺度：

- 一个元素选择器不是很具体，则会选择页面上该类型的所有元素，所以它的优先级就会低一些。
- 一个类选择器稍微具体点，则会选择该页面中有特定 `class` 属性值的元素，所以它的优先级就要高一点。



这里也有[**继承**](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inheritance)的概念，也就是在默认情况下，一些 css 属性继承当前元素的父元素上设置的值，有些则不继承。这也可能导致一些和期望不同的结果。例如color，font-family

css为了控制继承提供了五个特殊的通用属性值，每个css属性都接收这个值：

+ `inherit`：设置该属性会使子元素属性和父元素相同。实际上，就是“开启继承”
+ `initial`：将应用于选定元素的属性值设置为该属性的[初始值](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial_value)
+ `revert`：将应用于选定元素的属性值重置为浏览器的默认样式，而不是应用于该属性的默认值。在许多情况下，此值的作用类似于 [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)
+ `revert-layer`：将应用于选定元素的属性值重置为在上一个[层叠层](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)中建立的值。
+ `unset`：将属性重置为自然值，也就是如果属性是自然继承那么就是 `inherit`，否则和 `initial` 一样



::: tip

CSS 的简写属性 [`all`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/all) 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个（`inherit`、`initial`、`unset` 或 `revert`）。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点

:::



通常，我们在设置css时有三个因素需要考虑：

1. 资源顺序
2. 优先级
3. 重要程度



1.如果你有超过一条规则，而且都是相同的权重，那么最后面的规则会应用。可以理解为后面的规则覆盖前面的规则，直到最后一个开始设置样式。资源顺序仅在规则的优先级相同时才体现出来

2.有些规则在最后出现，但是却应用了前面的具有冲突的规则。这是因为前面的有更高的**优先级**——它范围更小，因此浏览器就把它选择为元素的样式。这里需要注意虽然我们考虑的是选择器，以及应用在选中对象上的规则，但不会覆盖所有规则，只覆盖相同的属性。

3.一般来说样式规则的重要程度都是遵循优先级等级的，但是有一个特殊的 CSS 可以用来覆盖所有上面所有优先级计算，不过需要很小心的使用——`!important`。用于修改特定属性的值，能够覆盖普通规则的层叠。



::: tip

**备注：** 覆盖 `!important` 唯一的办法就是另一个 `!important` 具有相同*优先级*而且顺序靠后，或者更高优先级。

:::  



### 选择器

CSS 选择器是 CSS 规则的第一部分。它是元素和其他部分组合起来告诉浏览器哪个 HTML 元素应当是被选为应用规则中的 CSS 属性值的方式。选择器所选择的元素，叫做“选择器的对象”

每个 CSS 规则都以一个选择器或一组选择器为开始，去告诉浏览器这些规则应该应用到哪些元素上，一个选择器可能对应多个元素，但是多个选择器对应相同的元素时，会产生优先级——即哪个规则的优先级高，就会覆盖优先级低的规则

常见的选择器有id选择器，伪类选择器，类选择器等，下面是选择器参考表：

| 选择器                           | 权重  |
| -------------------------------- | ----- |
| !important                       | 10000 |
| 内联样式                         | 1000  |
| ID选择器                         | 100   |
| 伪类选择器，属性选择器，类选择器 | 10    |
| 元素选择器                       | 1     |
| *（通配符）                      | 0     |

::: tip

组合器的权重通常是各个选择器的权重之和，`.class :hover`这个就是一个组合器的例子，各权重详看上表

:::





### @规则

一个 **at-rule** 是一个[CSS 语句，](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Syntax#css_statements)以 at 符号开头， '`@`' (`U+0040 COMMERCIAL AT`), 后跟一个标识符，并包括直到下一个分号的所有内容， '`;`' (`U+003B SEMICOLON`), 或下一个 CSS 块，以先到者为准。

如果我们想要将额外的样式表导入主CSS样式表时，可以使用`@import`，一般，我们将@开头的rule称为@规则，@media就是常见的@规则，它允许使用[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Media_Queries)来应用 CSS，仅当某些条件成立

下面是一些 @规则，由它们的标示符指定，每种规则都有不同的语法：

- [`@charset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@charset), 定义样式表使用的字符集。
- [`@import`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@import), 告诉 CSS 引擎引入一个外部样式表。
- [`@namespace`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@namespace), 告诉 CSS 引擎必须考虑 XML 命名空间。
- 嵌套 @规则，是嵌套语句的子集，不仅可以作为样式表里的一个语句，也可以用在条件规则组里：
  - [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media), 如果满足媒介查询的条件则条件规则组里的规则生效。
  - [`@page`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page), 描述打印文档时布局的变化。
  - [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face), 描述将下载的外部的字体。 实验性
  - [`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes), 描述 CSS 动画的中间步骤 . 实验性
  - [`@supports`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports), 如果满足给定条件则条件规则组里的规则生效。 实验性
  - [`@document`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document), 如果文档样式表满足给定条件则条件规则组里的规则生效。*(推延至 CSS Level 4 规范)*



每条 @规则都有不同的语法，不过一些 @规则可以归为一类： **条件规则组**. 这些语句使用相同的语法。它们都嵌套语句，或者是*规则*或者是*@规则*。它们都表达：它们所指的条件 (类型不同) 总等效于 **true** 或者 **false**，如果为 **true** 那么它们里面的语句生效，条件规则组是可以嵌套语句的，嵌套层级无限制

条件规则组由 CSS Conditionals Level 3 定义：

- [`@media`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media),
- [`@supports`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@supports),
- [`@document`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@document). *(推迟至 CSS Level 4 规范)*





### 盒模型

在css中主要分两种盒子——块级盒子 (**block box**) ，内联盒子 (**inline box**)，这两种盒子在**页面流**和元素之间的关系方面都表现出不同的行为：

块级盒子：

+ 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
+ 每个盒子都会换行
+ [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性可以发挥作用
+ 内边距（padding）, 外边距（margin）和 边框（border）会将其他元素从当前盒子周围“推开”



内联盒子：

+ 盒子不会产生换行。
+ [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width) 和 [`height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height) 属性将不起作用。
+ 垂直方向的内边距、外边距以及边框会被应用但是不会把其他处于 `inline` 状态的盒子推开。
+ 水平方向的内边距、外边距以及边框会被应用且会把其他处于 `inline` 状态的盒子推开。



我们可以通过对`display`属性的设置来控制盒子的类型



**标准盒模型：** 一个块的总宽度 = width+margin(左右)+padding(左右)+border(左右)

**怪异盒模型：** 一个块的总宽度 = width+margin（左右）（既 width 已经包含了 padding 和 border 值）

::: tip

通常标准盒用于pc端，怪异盒用于移动端，因为标准盒的大小是由内部决定的，而怪异盒是由外部决定的，当然目前移动端主流的还是`flex`布局。一个块级盒子通常指的是我们说的标准盒模型，而怪异盒模型则需要手动开启，可以将`box-sizing`设置为`border-box`来开启怪异盒

:::



### BFC

` BFC` 是 ` Block Formatting Context  `的缩写，即块级格式化上下文。`BFC`是CSS布局的一个概念，是一个独立的渲染区域，规定了内部box如何布局， 并且这个区域的子元素不会影响到外面的元素，其中比较重要的布局规则有内部 box 垂直放置，计算 BFC 的高度的时候，浮动元素也参与计算



BFC的布局规则：

+ 内部的box会在`垂直方向`，一个接一个地放置
+ box`垂直方向的距离由margin决定`。属于同一个BFC的两个相邻Box的margin会发生重叠
+ 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反
+ BFC的区域`不会与float box重叠`
+ **BFC是一个独立容器，容器里面的子元素不会影响到外面的元素**
+ 计算BFC的高度时，`浮动元素也参与计算高度`
+ 元素的类型和`display属性，决定了这个Box的类型`。不同类型的Box会参与不同的`Formatting Context`。



BFC的创建方式：

+ 根元素，即HTML元素
+ float的值不为none
+ position为absolute或fixed
+ display的值为inline-block、table-cell、table-caption
+ overflow的值不为visible



BFC的应用场景：

+ 去除边距重叠现象
+ 清除浮动（让父元素的高度包含子浮动元素）
+ 避免某元素被浮动元素覆盖
+ 避免多列布局由于宽度计算四舍五入而自动换行



 



### 布局

css中有好几种不同的布局特性，这些不同的布局往往解决不同的场景



正常布局流：

+ 正常布局流往往是指在不对页面进行任何布局控制时，浏览器默认的布局方式



弹性盒子：

+ 通过设置`display`为`flex`来开启flex布局
+ flex布局中主要以**主轴**和**交叉轴**两个核心来构建布局
+ 通过flex布局中的子类上的flex相关属性来控制布局
+ flex布局主要用来编写移动端的布局

![](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png))





网格布局：

+ 通过设置`display`为`grid`来开启网格布局
+ 网格布局的核心是**列**，**行**以及**沟槽**（gutter）
+ 网格布局通常与函数repeat和minmax配合
+ 网格布局主要适用在pc端，可以用来设置三列布局等

![](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids/grid.png)





多栏式布局：

+ 通过设置容器的`column-count`属性来开启多栏式布局
+ 多栏式布局的很多属性都是从网格布局的属性继承到全局属性中
+ 多栏式布局中是可以使用其他布局的，你可以在多栏式布局中设置flex布局



响应式布局：

+ 在开发过程中，如果我们想要适配多端，那么一个响应式布局肯定是我们想要的，想要做到响应式布局需要从两方面去解决，一是通过css原生的[媒体查询](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Media_queries#%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2%E5%9F%BA%E7%A1%80)来设置响应式，这种方式能提供很高的自由度，但同时也会带来许多杂糅的代码，二是通过设置绝对长度单位来达到适配，常用的方法有rem布局，百分比布局





### 重绘回流

在页面中，如果DOM元素的某些属性发生变化时，会不定触发重绘回流，浏览器是否需要重新计算元素的几何属性是决定重绘还是回流的关键

回流触发的情况：

+ 添加或删除可见的DOM元素
+ 元素的位置发生变化
+ 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
+ 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代
+ 页面一开始渲染的时候（这避免不了）
+ 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）



重绘触发的情况：

+ 回流一定会触发重绘
+ 颜色的改变
+ 文本方向的改变
+ 阴影的改变





由于每次回流都是造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量处理来优化回流过程，而作为开发人员，在实际的项目中应该减少不必要的重绘和回流的操作

减少重绘回流的操作：

+ 减少使用内联样式
+ 在动画应用上，需要让其脱离文档流，从而减少对其他元素的影响
+ 使用css3特性处理动画，transform，opacity，filters等
+ 避免使用css的js表达式
+ 避免使用table布局





## CSS3动画

css3配合html5推出了很多新标签的css属性，同时也优化了之前的一些css属性，例如background，同时向css函数中添加了不少新函数

css3最厉害莫过于它的硬件动画加速，在动画方面可以使用css animations，渲染引擎会使用跳帧或者其他技术以保证动画表现尽可能的流畅。而使用 JavaScript 实现的动画通常表现不佳，同时还能让浏览器控制动画序列，允许浏览器优化性能和效果，如降低位于隐藏选项卡中的动画更新频率





### 配置动画

创建动画序列，需要使用animation或其子属性，该属性允许配置动画时间，时长以及其他动画细节，但该属性不能配置动画的实际表现，动画的实际表现是由@keyframes规则实现，





animation的子属性有：

+ `animation-delay`：设置延迟，即从元素加载完成之后到动画序列开始执行的这段时间
+ `animation-direction`：设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行
+ `animation-duration`：设置动画一个周期的时长
+ `animation-iteration-count`：设置动画重复次数，可以指定 infinite 无限次重复动画
+ `animation-name`：指定由[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)描述的关键帧名称
+ `animation-play-state`：允许暂停和恢复动画
+ `animation-timing-function`：设置动画速度，即通过建立加速度曲线，设置动画在关键帧之间是如何变化
+ `animation-fill-mode`：指定动画执行前后如何为目标元素应用样式



一旦完成动画的时间设置，接下来就需要定义动画的表现。通过使用[`@keyframes`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@keyframes)建立两个或两个以上关键帧来实现。每一个关键帧都描述了动画元素在给定的时间点上应该如何渲染。

因为动画的时间设置是通过 CSS 样式定义的，关键帧使用 [`percentage`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage) 来指定动画发生的时间点。`0%` 表示动画的第一时刻，`100%` 表示动画的最终时刻。因为这两个时间点十分重要，所以还有特殊的别名：`from` 和 `to`。这两个都是可选的，若 `from/0%` 或 `to/100%` 未指定，则浏览器使用计算值开始或结束动画。

也可包含额外可选的关键帧，描述动画开始和结束之间的状态。



下面是一个简单的自定义动画例子：

```css
p {
    animation-duration: 3s;
    animation-name: slidein;
    animation-iteration-count: infinite;  /* 动画重复 */
    animation-direction: alternate;  /* 动画正放和倒放播放 */
}

@keyframes slidein {
    from {
        margin-left: 100%;
        width: 300%;
    }


    to {
        margin-left: 0%;
        width: 100%;
    }

    
}
```



看到P标签动起来就说明动画设置成功了，那么如果我们想要在js脚本中获取对应的动画回调事件，则需要在dom上设置动画相关的监听器即可

```js
let h = document.getElementById('h1');
let listener = (e) => {
    var l = document.createElement("li");
    switch(e.type) {
        case "animationstart":
        l.innerHTML = "动画起始时间为 " + e.elapsedTime;
        break;
        case "animationend":
        l.innerHTML = "动画结束时间为" + e.elapsedTime;
        break;
        case "animationiteration":
        l.innerHTML = "新一轮动画起始时间 " + e.elapsedTime;
        break;
    }
    document.getElementById("output").appendChild(l);
}

h.addEventListener('animationstart',listener,false)
h.addEventListener('animationend',listener,false)
h.addEventListener('animationiteration',listener,false)

h.className = 'slidein'
```

```css
.slidein {
    -moz-animation-duration: 3s;
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -moz-animation-name: slidein;
    -webkit-animation-name: slidein;
    animation-name: slidein;
    -moz-animation-iteration-count: 3;
    -webkit-animation-iteration-count: 3;
    animation-iteration-count: 3;
    -moz-animation-direction: alternate;
    -webkit-animation-direction: alternate;
    animation-direction: alternate;
  }
  
  @-moz-keyframes slidein {
    from {
      margin-left:100%;
      width:300%
    }
  
    to {
      margin-left:0%;
      width:100%;
    }
  }
  
  @-webkit-keyframes slidein {
    from {
      margin-left:100%;
      width:300%
    }
  
    to {
     margin-left:0%;
     width:100%;
   }
  }
  
  @keyframes slidein {
    from {
      margin-left:100%;
      width:300%
    }
  
    to {
     margin-left:0%;
     width:100%;
   }
}
```







### transition

**CSS transitions** 提供了一种在更改 CSS 属性时控制动画速度的方法。其可以让属性变化成为一个持续一段时间的过程，而不是立即生效的。比如，将一个元素的颜色从白色改为黑色，通常这个改变是立即生效的，使用 CSS transitions 后该元素的颜色将逐渐从白色变为黑色，按照一定的曲线速率变化。这个过程可以自定义

CSS transitions 可以决定哪些属性发生动画效果 (明确地列出这些属性)，何时开始 (设置 delay），持续多久 (设置 duration) 以及如何动画 (定义*timing function*，比如匀速地或先快后慢)

::: tip

通常将两个状态之间的过渡称为**隐式过渡（implicit transitions）**，因为开始与结束之间的状态由浏览器决定

:::



[可动画属性列表](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animated_properties)是一个有限集合，即我们只能在指定的属性上进行动画



transitions可以看作是一种小型的动画，在transitions中，初始帧实际就是原来的属性，而动画的变化方式和最终状态的过渡都是可以自定义的，但是要稍微弱于动画，那就是只能在可动画属性中去实现动画，自由度稍比动画弱一些，下面是一个简单的transitions案例：

```css
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition:width 2s, height 2s,
        background-color 2s, -webkit-transform 2s;
    transition:width 2s, height 2s, background-color 2s, transform 2s;
}
.box:hover {
    background-color: #FFCCCC;
    width:200px;
    height:200px;
    -webkit-transform:rotate(180deg);
    transform:rotate(180deg);
}
```



同时，transitions也有自己的监听器，即`transitionend`，该事件一共有两个属性：`propertyName`（已完成过度的属性），`elapsedTime`（过度已允许的时间）

通常，一些简单的动画都可以使用transitions来制作，例如按钮hover效果，





## CSS预处理器

在编写大型的项目时，通常的css文件编写起来会非常杂糅，例如我们想要定义一个嵌套的DOM时，在css中只能通过选择器一个一个的去选择，这在开发过程中带来了极大的不便，我们想要让css的编写像js对象一样可维护和清晰，css的编写更应该像DOM tree那样一一对应的结构，于是预处理器就诞生了，常用的预处理器有[`less`](https://less.bootcss.com/)，[`Sass`](https://www.sass.hk/)

预处理的功能通常是在原css的基础上扩展的，例如变量，函数，@规则等，还有一些其他的功能，这些功能能让我们更好的编写css代码，下面的预处理器介绍以`Sass`为例





### 嵌套css

`css`中重复写选择器是非常恼人的。如果要写一大串指向页面中同一块的样式时，往往需要 一遍又一遍地写同一个`ID`，由于这种情况，sass可以让开发者对css嵌套，以此来避免重复代码

```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
```





#### &

在编写某些伪类时，如果我们不想要这些伪类以后代选择器的方式连接，可以使用`&`关键字，例如下例

```scss
article a {
  color: blue;
  &:hover { color: red }
}
```

当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，而是`&`被父选择器直接替换：

```css
article a { color: blue }
article a:hover { color: red }
```



#### >,+,~

使用子组合选择器>选择一个元素的直接子元素，例如下例：第一个选择器会选中所有的selection标签，而第二个选择器只会选中子元素中的selection标签

```scss
article section { margin: 5px }
article > section { border: 1px solid #ccc }
```



使用同层相邻组合选择器+选择header标签和与它同级的p标签

```scss
header + p { font-size: 1.1em }
```



使用同层全体组合选择器~，选择所有跟在acticle后的同层p标签，不管它们之间有多少元素

```scss
article ~ p { border-top: 1px dashed #ccc }
```





::: tip

这三个>,+,~组合选择器必须和其他选择器配合使用，同时这三个组合选择器也可以嵌套使用

:::





### 导入文件

在css中有一个@import规则，它允许在css文件内部导入其他css文件，但是这个规则有个弊端，那就是只有代码执行到@import规则时，浏览器才会去下载导入的css文件，这在我们加载过程中会导致速度变慢

Sass的@import规则是与原生的规则不同的，在@import规则生成css文件的时候就会把与之相关的文件加载进来，另外，所有在被导入文件中定义的变量和混合器都能在导入文件中使用

如果我们想要某些文件仅仅用于导入而不用单独生成css文件，可以使用局部文件，局部文件名以下划线开头，在编译的过程中Sass不会将该文件输出为css，而只把该文件用作导入，局部文件可以被多个不同的文件引入



> Sass兼容原生的css，所以它也支持原生的css@import，但是如果直接导入一个原始的css文件，则Sass会默认使用css原生的@import，想要使用Sass提供的@import，可以把css文件后缀改成scss





### 静默注释

Sass中提供了两种不同的css注释语法，一种是`//` 开头的注释内容，该注释内容是不会出现在生成的css文件中，另外一种是`/**/`开头的注释内容，该注释内容会出现在css文件中，该注释方法也是css原生的注释方法





### 混合器

通常，在大型网站中我们的样式会变得复杂多变，而很多时候我们会发现有大段的重复样式出现在了我们的项目中，独立的变量已经没法对付这种情况，这个时候我们就可以使用混合器来实现大段的css样式重用

混合器使用@mixin标识符定义，这个标识符给一大段样式赋予名字，这样就能用这个名字复用这段样式，情况下例：

```scss
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

在样式表中通过@include来使用这个混合器，放到任何地方。`@include`调用会把混合器中的所有样式提取出来放在`@include`被调用的地方

```scss
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```



混合器还能接收参数，设置默认参数值，是使用`$name：value`的方式来设置所需参数





::: tip

如果使用大量的混合器，可能会使生成的样式表过大，导致加载缓慢，所以混合器需要谨慎使用， 避免滥用

:::





### 样式继承

css除了混合器，还提供了`@extend`语法来实现样式继承，如果要复用的样式并不复杂，可以采取继承的方式来实现复用，通常我们会在下面这种情况下使用继承：在主页设置全局字体大小，但是在主页中的某一区域的字体还需要字体颜色时，这个时候就应该使用继承

```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```

