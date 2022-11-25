# Vue2

Vue是一套用于构建用户界面的渐进式框架，与传统的React和Angule不同的是，Vue的核心库只关注视图层。Vue的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进DOM的系统



在Vue中，我们可以将一个Vue文件拆分为三部分：

1. template模板，主要用来编写一些HTML
2. js脚本，在该脚本中还提供了optionsAPI来获取一些强大的功能
3. css模块，我们可以在文件中编写属于它自己的样式



::: tip

下面的demo都会以CDN的形式来使用Vue，对于引入Vue和安装详情请见[官网](https://v2.cn.vuejs.org/v2/guide/installation.html)

:::



看起来是不是很像我们编写一个HTML的结构，下面会来分别介绍这三部分的具体功能

目录：

[[toc]]



## template模板

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

如果你熟悉虚拟 DOM 并且偏爱 JavaScript 的原始力量，你也可以不用模板，直接写渲染 (render) 函数



### Mustache语法

在template中Vue提供了一种简便的语法来帮助我们更快的编写HTML

Mustache中最常见的文本绑定就是使用`{{}}`，无论何时，当绑定对象上的值发生改变时，插值上的内容也会更新

```html
<div id='app'>
	<span>我是:{{name}}</span>
</div>


<script>
	const app = new Vue({
        el: '#app',
        data: {
            name: lyf
        }
    })
</script>
```

同时，Mustache语法还支持这些灵活的写法：

```html
<div id='app'>
	<h1>{{name}}</h1>
	<h1>{{name}},亲爱的用户！</h1>
	<h1>{{name}} {{age}}</h1>
	<h1>{{name + age}}</h1>
	<h1>{{name + ' ' + age}}</h1>
	<h1>{{counter*2}}</h1>
</div>


<script>
	const app = new Vue({
        el: '#app',
        data: {
            name: lyf,
            age: 21,
            count: 100
        }
    })
</script>
```



如果想要值更新时不想让内容发生更新，可以使用v-once指令，当数据改变时，插值处的内容不会更新：

```html
<span v-once>我是:{{lyf}}</span>
```



### 指令

在Vue模板中Vue提供了许多特殊的attribute，通常这些attribute会带由`v-`前缀。一般这些指令都是vue内置声明好的，每个指令都代表着不同的操作。指令的职责是，**当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM**



#### v-text

v-text能帮助我们更新元素的内容，这和Mustache语法是一样的：

```vue
<h1 v-text='name'></h1>
// 上下相同
<h1>{{name}}</h1>
```

#### v-html

v-html能帮助我们解析html标签，如果使用Mustache解析html标签时，是不会被Vue编译出来的，需要使用v-html：

```vue
<div v-html="html"></div>
```

#### v-show/v-if

vue中提供了`v-if`和`v-show`两个不同的方式来进行条件渲染，只有当值为true时才会渲染

通常`v-if`可以搭配`v-else-if`，`v-else`这些指令来进行混合开发，当然，下面的`score`需要在`data`中定义

```vue
<h2 v-if="score>=90">优秀</h2>
<h2 v-else-if="score>=60">良好</h2>
<h2 v-else>不及格</h2>
```



`v-show`用法大致是一样的，但是 它不能搭配`v-else-if`，`v-else`这两个指令：

```vue
<h2 v-show="score>=90">优秀</h2>
<h2 v-show="score>=60">良好</h2>
```



它们之间的不同在于：

1. `v-if`是真正意义上的条件渲染，它会确保在切换过程中组件真正意义上的销毁和重建，而`v-show`只是通过`css`进行切换，我们可以在浏览器控制台中发现，v-show其实就是设置内联样式为`style=“display：none”`来实现条件渲染
2. `v-if`是惰性的，只有当值为true时才会开始渲染，这代表着初始值为false时，组件并不会被渲染
3. `v-if`有更高的切换开销，而`v-show`有更高的初始渲染开销

总结为：需要频繁切换时使用`v-show`，如果在运行时条件很少改动则使用`v-if`





#### v-for

vue中提供了v-for这个专门的指令来进行列表渲染，该指令需要使用`item in items`形式的特殊语法，其中`items`时源数据数组，而`item`则是被迭代的数组元素的别名

其中`item`也可以是`(item,index)`这种形式，第二个`index`就表示当前item的索引

```vue
<div id="app">
	<!-- 在遍历的过程中没有使用索引值-->
	<ul>
		<li v-for="(item,index) in name">{{index}} - {{item}}</li>
	</ul>
			
	<ul>
		<li v-for="item in letters">{{item}}</li>
	</ul>
</div>

<script>
	const app = new Vue({
		el:"#app",
		data:{
			name:['why','kobe','curry','james'],
			letters:['A','B','C','D']
		}
	})
</script>
```

这里需要注意的是，遍历的对象也可以是一个对象，此时遍历的值为对象的值，遍历的第二个参数就不是index了而是该值的键名`name`，此时遍历的第三个参数才是index索引值

```vue
<div id="app">
	<!-- 在遍历的过程中没有使用索引值-->
	<ul>
		<li v-for="(value,name,index) in obj">{{name}} - {{value}}</li>
	</ul>
			
	<ul>
		<li v-for="item in obj">{{item}}</li>
	</ul>
</div>

<script>
	const app = new Vue({
		el:"#app",
		data:{
			obj: {
                name:'lyf',
                age:123
			}
		}
	})
</script>
```

::: tip

在遍历对象时，会按照`Object.keys()`的结果遍历，但是**不能**保证它的结果在不同的 JavaScript 引擎下都一致。

:::



当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染

这个默认的模式是高效的，所以这不适用于**不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**

为了方便diff算法中对新旧元素的比较，在使用v-for时需要提供一个`key` attribute，除非遍历输出的DOM内容简单或者是刻意依赖默认行为以获取性能上的提升

::: tip

注意，这里的key最好不要设置为index索引，如果你不能保证对数据发生破坏顺序的操作，最好使用唯一标识，例如名字或者身份id

:::



::: tip

在Vue2中，v-for的优先级是比v-if更高，这意味着将执行多个v-if，这会极大的影响效率

:::



#### v-on

v-on指令是用来监听一些DOM事件的，例如鼠标点击Click事件等。这些事件一般是以一个回调函数的形式被触发，函数是编写在script部分中的method中的，当然也可以直接使用判断式写法简写，它的语法糖为@：

```vue
<div id="app">
	<h2>{{counter}}</h2>
	<button @click="increment()">+</button>
    <button @click="counter++" >+</button>
	<button @click="decrement()">-</button>
</div>

<script>
	const app = new Vue({
	el:"#app",
	data:{
		counter:0
	},
	methods:{
		increment(){
			this.counter++
		},
		decrement(){
			this.counter--
		}
	}
	})
</script>
```







#### v-bind

`v-bind`是用来动态绑定一个或多个attribute，或者一个组件的`props`到表达式。绑定的时候需要注意，值必须在组件中声明，它的语法糖为`:`

```vue
<div id="app">
	<img v-bind:src="imgurl" alt>
	<h2>{{message}}</h2>
	<a v-bind:href="ahref">百度一下</a>
			
	<!-- v-bind语法糖写法（简化写法） -->
	<img :src="imgurl" alt>
	<h2>{{message}}</h2>
	<a :href="ahref">百度一下</a>		
</div>

<script>
	const app = new Vue({
		el:"#app",
		data: {
			message: '你好呀',
			imgurl: 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white-d0c9fe2af5.png',
			ahref: 'https://www.baidu.com/',
			isactive: true,
			isline:false
		}
	})
</script>
```







#### v-model

v-model这个指令指的是一种MVVM模式中的一个概念——双向绑定，指对数据的更新操作能马上反馈到视图层，最简单描述就是他能及时地维护数据的最新值，双向绑定常用在表单输入和输入框中，下面的例子中是一些常用的表单组件

```vue
<body>
		
		<div id="app">
			<input type="text" v-model="message">
			{{message}}
			<label for="male">
				<input type="radio" id="male"  value="男" v-model="sex">男
			</label>
			<label for="female">
				<input type="radio" id="female"  value="女" v-model="sex">女
			</label>
			<h2>你选择的性别是:{{sex}}</h2>
			<label for="">
				<input type="checkbox" id="agree" v-model="agree">同意协议
			</label>
			<h2>你选择的是{{agree}}</h2>
			
			<!-- 多选框 -->
			<label for="">
				<input type="checkbox" value="篮球" v-model="hobbies">篮球
				<input type="checkbox" value="足球" v-model="hobbies">足球
				<input type="checkbox" value="乒乓球" v-model="hobbies">乒乓球
				<input type="checkbox" value="羽毛球" v-model="hobbies">羽毛球
			</label>
			<h2>你的爱好是{{hobbies}}</h2>
			
			<select name="abc" id="" v-model="fruit">
				<option value="苹果" >苹果</option>
				<option value="香蕉" >香蕉</option>
				<option value="葡萄" >葡萄</option>
			</select>
			<h2>你选择的是{{fruit}}</h2>
			
			<!-- 动态绑定 -->
			<label v-for="item in originfruit">
				<input type="checkbox" :value="item" v-model="hobbies"/>{{item}}
			</label>
			
			<!-- lazy修饰符 失去焦点时才会更新-->
			<input type="text" v-model.lazy="message">
			<h2>{{message}}</h2>
			
			<!-- number修饰符 -->
			<input type="number" v-model.number="age">
			<h2>{{typeof age}}</h2>
			
			<!-- trim修饰符 -->
			<input type="text" v-model.trim="name">
			<h2>你输入的名字是{{name}}</h2>
		</div>
		
	</body>
	
	<script>
	const app = new Vue({
		el:"#app",
		data:{
			message:'你好呀',
			sex:'',
			agree:'false',
			hobbies:[],
			fruit:'香蕉',
			originfruit:['苹果','香蕉','葡萄'],
			age:'',
			name:''
		}
	})
	</script>
```



当然我们也能自己来简单实现一个v-model双向绑定来深入了解v-model

想要实现双向绑定，首先需要如下步骤：

1. 动态绑定值
2. 在绑定v-model的标签上监听事件
3. 更新最新值

```vue
<template>
    <div>
        <!-- 1.v-bind绑定value  2.监听input事件，更新message的值 -->
        <input type="text" :value="message" @input="inputChange">
        <h2>{{message}}</h2>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "hello world"
        }
    },
    methods: {
        inputChange(event){
            this.message = event.target.value
        }
    }
}
</script>
```







#### v-slot

Vue中实现了一种插槽的技术，它允许你能在组件构建前先预留位置，等到需要使用的时候再传入对应的组件，下面我们来通过一个简单的案例来讲解：

```vue
<body>
		
		<!-- 
		 1.插槽的基本使用  <slot></slot>
		 2.插槽的默认值  <slot><button>按钮</button></slot>
		 3.如果有多个值，同时放入组件进行替换时，一起作为替换元素
		 -->
		
		
		<div id="app">
			{{message}}
            // 使用插槽默认值
			<cpn></cpn>
			<cpn><span>哈哈哈</span></cpn>
			
			<cpn><h2>嘻嘻嘻</h2></cpn>
		</div>
		
	</body>
	
	<template id="cpn">
		<div>
			<h2>我是组件</h2>
			<p>我是组件哈哈哈</p>
			<slot><button type="button">按钮</button></slot>
		</div>
	</template>
	
	
	<script>
	const app = new Vue({
		el:"#app",
		data:{
			message: '你好呀'
		},
		components:{
			cpn: {
				template: "#cpn"
			}
		}
	})
	</script>
```

上面的例子中，我们定义了一个cpn组件，这个组件内部具有一个插槽，该插槽有默认值，如果不想要替换内容，可以直接使用组件，组件内部的插槽就会使用默认的`button`。需要使用该插槽时，只需要在外部传入要放入的组件即可，上面的`span`和`h2`标签都会替换slot中的`button`标签



同时，如果有多个插槽，我们还可以给其一一赋名来管理这些插槽，这就是**具名插槽**，一个不带name的插槽出口会带有默认的名字：`default`

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```



我们在使用的时候只需要在模板上添加一个v-slot指令，并将需要插入的具体插槽的名字作为值传入即可：

```vue
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

注意：任何没有被包裹在带有 `v-slot` 的 `<template>` 中的内容都会被视为默认插槽的内容



#### v-pre/v-cloak/v-once

这三个指令放在一起是因为它们在实际项目中用的并不算多，先来一一介绍它们的作用

+ v-pre：跳过这个元素和它子元素的编译过程，所以不会解析Mustache 语法
+ v-cloak：保持再元素上直到关联实例结束编译，通常和`display：none`搭配使用，用来解决插值表达式页面闪烁问题
+ v-once：只渲染元素和组件一次，之后就不会再重新渲染，这可用于优化更新性能，通常使用在一些静态资源上





## Script部分

Vue中的JS部分是由官方给出的规范约定好的，这些规范让代码得以区分。一个普通的vue文件中基本有prop，data，methods这些API，下面就来详细介绍这些规范的作用

### 实例

每一个Vue应用都是通过Vue函数创建一个新的Vue实例开始的，一个 Vue 应用由一个通过 `new Vue` 创建的**根 Vue 实例**，以及可选的嵌套的、可复用的组件树组成。这是官方给出的解释

demo：

```vue
<body>
		
		<div id="app">
			<h1>{{message}}</h1>
			<h1>{{message}},亲爱的用户！</h1>
			<h1>{{firstname}} {{lastname}}</h1>
			<h1>{{firstname + lastname}}</h1>
			<h1>{{firstname + ' ' + lastname}}</h1>
			<h1>{{counter*2}}</h1>
		</div>
		
	</body>
	
	<script>
	const app = new Vue({
		el:"#app",
		data:  {
			message: '你好呀',
			firstname: 'kobe',
			lastname: 'bline',
			counter: 100
		},
	})
	</script>
```

在我们之前的例子中，可以看到都是通过`new Vue`方法来创建实例的，而且其中有一个`el`，它的作用是提供一个在页面上已经存在的DOM元素作为Vue实例的挂载目标，可以是CSS选择器，也可以是一个HTMLElement实例

如果我们把el注销掉，那么js中的data部分就不会渲染出来，取而代之的是Mustache语法的不编译状态



### 组件

Vue中通过拆分成组件的思想来将一个页面中的内容进行复用，这极大的提高了页面的开发效率

组件内部管理组件的状态，而外部则只需要调用组件即可，通常有两种方式注册组件，一种是在Vue实例下挂载全局组件，一种是在实例下的`Component`API中挂载对应组件

demo：

```vue
<body>
		
		<div id="app">
			<cpn></cpn>
		</div>
		
		<template id="cpn">
			<div>
				<h2>{{title}}</h2>
				<p>我是你</p>
			</div>
		</template>
		
		
	</body>
	
	<script>
	// 1.创建组件构造器对象
	// const cpnC = Vue.extend({
	// 	template:'#cpn'
	// })
	
	// 2.注册组件
	Vue.component('cpn',{
		template:'#cpn',
		data(){
			return{
				title:'abc'
			}
		}
	})
	
	
	
	const app = new Vue({
		el:"#app",
		data:{
			message:'你好呀'
		}
		// components:{
		// 	// cpn使用组件时的标签名
		// 	my-cpn : cpnC
		// }
	})
	</script>
```

这种注册能复用这些组件，这样我们就只需要关注组件内部的结构。下面是一个Vue页面的对应结构

![components.png (C:/Users/86186/Desktop/Vue学习图片/components.png) (vuejs.org)](https://v2.cn.vuejs.org/images/components.png)



在导入一个组件的时候，我们需要使用import/require作为导入模块。常见的方式如下：

```vue
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```



### OptionsAPI

OptionsAPI主要包括以下的API，下面就来一一介绍这些强大的API，它们都是一些拥有强大功能且具体细节的设计，例如响应式系统，函数缓存等，它们的出现将前端的设计变得复杂多变

#### props

上述说过，组件内部只需要管理自己的状态，那么如果有异步数据，那么我们应该使用prop将异步数据传递给组件，或者外部需要向组件内部传递数据时，也需要使用props。props也能进行类型检测和默认值设置

demo：

```vue
<body>
		
		<div id="app">
			<cpn :cmovies="movies"></cpn>
		</div>
		
		
		<template id="cpn">
			<div>
				<p>{{movies}}</p>
			</div>
		</template>
	</body>
	
	<script>
		const cpn = {
			template:'#cpn',
			props:['cmovies'],
			data(){
				return{
				}
			},
			methods:{
				
			}
		}

	const app = new Vue({
		el:"#app",
		data:{
			message:'你好呀',
			movies:['海王','海贼王']
		},
		components:{
			cpn
		}
	})
	</script>
```



#### data

这里首先需要了解的是，`data`必须声明为返回一个初始数据对象的**函数**，因为组件可能被用来创建多个实例。如果 `data` 仍然是一个纯粹的对象，则所有的实例将**共享引用**同一个数据对象！通过提供 `data` 函数，每次创建一个新实例后，我们能够调用 `data` 函数，从而返回初始数据的一个全新副本数据对象

在data中定义的初始数据会默认开启数据响应式，响应式即当我们进行某一个js操作修改值时，页面上能响应出最新的值

响应式原理：

+ Vue2中的响应式系统使用的是`Object.defindProperty`劫持里面的`getter`和`setter`
+ 这种方式的劫持是不可见的，可以使用vue-devtools插件来检查数据
+ 这种方式的劫持有个巨大的问题，它不能检测**数组**和**对象**的修改，特别是在数组中，Vue的解决方案则是修改一些数组的原生方法和一些API来解决这个问题
+ Vue在更新DOM时是异步操作，它会创建一个异步更新队列，只要监听到数据变化，Vue就会开启一个队列，并且缓冲在同一事件循环中发生的所有数据变更

demo：

```vue
<body>
		
		<div id="app">
			<ul>
				<li v-for="items in letters" >{{items}}</li>
			</ul>
			<button type="button" @click="btnclick">按钮</button>
		</div>
		
		
	</body>
	
	<script>
	const app = new Vue({
		el:"#app",
		data: {
			letters: ['a','b','c','d']
		},
		methods:{
			btnclick() {
				// 1.push方法响应式
				// this.letters.push('aaa','bbb','ccc');
				
				
				// pop():删除数组中的最后一个元素
				// this.letters.pop();
				
				// shift():删除数组中的第一个元素
				// this.letters.shift();
				
				// unshift():在数组的开头添加元素
				// this.letters.unshift('aaa','bbb','ccc');
				
				// splice()   /删除/插入/替换 元素
				// 第一个参数：选择切片开始的位置 
				// 第二个参数：正数且后面没有传参代表删除元素 ，有传参就代表是替换元素，0代表不删除元素，插入元素
				// 第三个参数：选择要插入或者替换的元素
				// this.letters.splice()
				
				// sort():排序
				// this.letters.sort()
				
				// reverse():倒序
				// this.letters.reverse()
				
				
				// 2.通过索引值修改数组里的元素
				// this.letters[0] = 'bbb'
				
				
				// set（要修改的对象，索引值）
				Vue.set(this.letters,0,'bbbbb')
				
				
			}
		}
	})
	</script>
```





#### computed

模板内Mustache中使用表达式会非常遍历，但是在模板中放入太多逻辑会让模板过重且难以维护，这个时候就可以使用计算属性，而且计算属性于方法的最大区别就在于计算属性是基于计算内值的响应式依赖进行缓存的，只要传入的值不变那么就不会重新计算值，而是直接保存最终值，而方法则是每次调用都是重新调用，并不会缓存



有时候使用computed可以来代替一些场景下的watch的使用，有时候computed的优势在于它自身就依赖于响应式依赖，在某些情况下对比watch是一样的效果而有更好的维护

demo：

```vue
<body>
		
		<div id="app">
			<h2>{{firstname + ' ' + lastname}}</h2>
			<h2>{{getfullname()}}</h2>
			<h2>{{fullname}}</h2>
			
			
			<h2>总价格: {{totalprice}}</h2>
			
			
			<h2>{{FullName}}</h2>
		</div>
		
	</body>
	
	<script>
	const app = new Vue({
		el:"#app",
		data: {
			firstname: 'asd',
			lastname: 'fgh',
			book: [
				{id: 001,name: '中国文化',price: 90},
				{id: 002,name: '美国文化',price: 100},
				{id: 003,name: '韩国文化',price: 110},
			]
		},
		// 计算属性，有缓存作用，调用函数的时候能不写小括号
		computed:{
			fullname:function(){
				return this.firstname + ' ' + this.lastname
			},
			// filter/map/reduce
			totalprice:function(){
				let result = 0
				for(let i=0; i<this.book.length; i++) {
					result += this.book[i].price
				}
				return result
			},
			// 计算属性一般没有set方法，只读属性
			// 此写法等同于上面的fullname方法，本质都是get方法
			// 当给FullName赋值的时候，set方法才被调用
			FullName: {
				set: function(newvalue){
					// console.log('-------------',newvalue);
					const names = newvalue.split(' ');
					this.firstname = names[0];
					this.lastname = names[1];
				},
				get: function(){
					return this.firstname + ' ' + this.lastname
				}
			}
		},
		methods:{
			getfullname:function(){
				return this.firstname + ' ' + this.lastname
			}
		}
	})
	</script>
```





#### methods

在Vue中提供了`methodsAPI`来帮助我们存放想要的函数，在理论上，这些函数通常是关于业务的非纯函数，因为纯函数通常会写在`utils`文件下，每个组件中都应该有属于自己的函数

demo：

```vue
<body>
		
		<div id="app">
			<h2>{{counter}}</h2>
			<button @click="increment()">+</button>
			<button @click="counter++" >+</button>
			<button @click="decrement()">-</button>
		</div>
		
	</body>
	
	<script>
	const app = new Vue({
		el:"#app",
		data:{
			counter:0
		},
		methods:{
			increment(){
				this.counter++
			},
			decrement(){
				this.counter--
			}
		}
	})
	</script>
```



#### watch

尽管在大部分情况下computed会比watch更适合，但有时也需要一个自定义的监听器，Vue提供了watch选项来响应数据的变化，当需要在数据变化时执行异步或开销较大的操作时，该API是最适合的







### 生命周期钩子

![lifecycle.png (C:/Users/86186/Desktop/Vue学习图片/lifecycle.png) (vuejs.org)](https://v2.cn.vuejs.org/images/lifecycle.png)







## CSS样式

在一般的Vue文件中，都会有一块内置的style区域，我们可以在这块区域内编写当前文件下的样式



### 动态绑定样式

在样式中常见的就是`class`与`Style`绑定来完成某些简单的条件渲染，在使用的时候可以使用指令v-bind来处理它们

```vue
<div v-bind:class="{ active: isActive }"></div>
```

然后搭配vue中的data数据响应式来完成动态绑定，如果想根据条件切换class，也可以使用三元运算符来完成



### scoped

该模式可以在style标签中以attribute的形式来开启，开启后文件内部的样式就不会影响到其他文件



