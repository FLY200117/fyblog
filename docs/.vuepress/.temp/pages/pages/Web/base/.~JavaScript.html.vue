<template><div><h1 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h1>
<nav class="table-of-contents"><ul><li><router-link to="#javascript的由来">JavaScript的由来</router-link></li><li><router-link to="#基本类型介绍">基本类型介绍</router-link></li><li><router-link to="#js的内存管理和闭包">JS的内存管理和闭包</router-link><ul><li><router-link to="#内存管理">内存管理</router-link></li><li><router-link to="#闭包">闭包</router-link></li></ul></li><li><router-link to="#js中的this以及apply-call-bind">js中的this以及apply/call/bind</router-link><ul><li><router-link to="#this">this</router-link></li><li><router-link to="#手写apply-bind-call">手写apply/bind/call</router-link></li></ul></li><li><router-link to="#深入js对象">深入js对象</router-link><ul><li><router-link to="#属性描述符和存取描述符">属性描述符和存取描述符</router-link></li><li><router-link to="#工厂模式">工厂模式</router-link></li></ul></li><li><router-link to="#原型">原型</router-link></li><li><router-link to="#原型链和继承">原型链和继承</router-link></li><li><router-link to="#类">类</router-link></li><li><router-link to="#多态">多态</router-link></li><li><router-link to="#es6-知识">ES6+知识</router-link><ul><li><router-link to="#let-const">let/const</router-link></li><li><router-link to="#模板字符串">模板字符串</router-link></li><li><router-link to="#默认参数和剩余参数">默认参数和剩余参数</router-link></li><li><router-link to="#新增的基本数据类型-symbol">新增的基本数据类型-Symbol</router-link></li><li><router-link to="#proxy">Proxy</router-link></li><li><router-link to="#reflect">Reflect</router-link></li><li><router-link to="#set">Set</router-link></li><li><router-link to="#map">Map</router-link></li><li><router-link to="#for-in-for-of">for in/for of</router-link></li><li><router-link to="#flat">Flat</router-link></li><li><router-link to="#optional-chaining">Optional Chaining</router-link></li></ul></li><li><router-link to="#promise">Promise</router-link><ul><li><router-link to="#手写promise">手写Promise</router-link></li></ul></li><li><router-link to="#iterator-generator">Iterator-Generator</router-link><ul><li><router-link to="#迭代器">迭代器</router-link></li><li><router-link to="#生成器">生成器</router-link></li></ul></li><li><router-link to="#async-await">async/await</router-link></li><li><router-link to="#js中的事件循环">JS中的事件循环</router-link></li><li><router-link to="#路由">路由</router-link><ul><li><router-link to="#hash">hash</router-link></li><li><router-link to="#history">history</router-link></li></ul></li><li><router-link to="#懒加载-预加载">懒加载/预加载</router-link></li><li><router-link to="#防抖-节流">防抖/节流</router-link></li><li><router-link to="#深拷贝-浅拷贝">深拷贝/浅拷贝</router-link></li><li><router-link to="#js额外知识">js额外知识</router-link><ul><li><router-link to="#严格模式">严格模式</router-link></li><li><router-link to="#响应式原理-vue2">响应式原理（Vue2）</router-link></li><li><router-link to="#响应式原理-vue3">响应式原理（Vue3）</router-link></li></ul></li></ul></nav>
<h2 id="javascript的由来" tabindex="-1"><a class="header-anchor" href="#javascript的由来" aria-hidden="true">#</a> JavaScript的由来</h2>
<p>JavaScript主要是由DOM 和BOM 和ECMAScript三部分组成的，BOM就是当前页面上的各个节点，而DOM就是把整个页面映射成一个多层节点机构（DOM树），然后开发人员可以通过DOM树对页面的内容和结构进行控制</p>
<p>JS中的核心就是ECMA，而ECMA又主要分成两大部分，一部分是老式的ES5规范，主要是一些低版本的浏览器所支持的规范，而另一部分就是较新的ES6规范，大部分比如class类，解构，箭头等概念都是从ES6出现的，所以从ES6开始以后的规范基本上都是维护ES6新推出的API，现如今大部分浏览器都支持ES6，新的ES6规范中提供了更加更多灵活的AIP，更加舒适的编程体验，最新的ECMA版本是[ECMA-417](<a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-417/" target="_blank" rel="noopener noreferrer">ECMA-417 - Ecma International (ecma-international.org)<ExternalLinkIcon/></a>)</p>
<p>如果要对JS进行老浏览器的向下兼容，可以在通过Webpack打包工具中的babel实现ES6向ES5的转换</p>
<h2 id="基本类型介绍" tabindex="-1"><a class="header-anchor" href="#基本类型介绍" aria-hidden="true">#</a> 基本类型介绍</h2>
<p>JS中主要分两种数据类型，一种是基本数据类型，通常是保存在栈空间中，另一种是引用数据类型，保存在堆内存中，JS中所有的数据类型一共有7种</p>
<p>基本数据类型：</p>
<ul>
<li>Undefined</li>
<li>Null</li>
<li>Boolean</li>
<li>String</li>
<li>Number</li>
<li>Symbol</li>
</ul>
<p>引用数据类型：</p>
<ul>
<li>Object</li>
<li>function</li>
<li>Array</li>
<li>Set</li>
<li>Map</li>
<li>...</li>
</ul>
<p>三种检测数据类型的方法：</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>补充</th>
</tr>
</thead>
<tbody>
<tr>
<td>typeof</td>
<td>typeof只能检测基本数据类型和Object和function类型的数据，不能检测Array此类的数据类型</td>
</tr>
<tr>
<td>instanceof</td>
<td>是用于判断数据类型，不能检测基本数据类型</td>
</tr>
<tr>
<td>Object.prototype.toString</td>
<td>API需要二次封装使用</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>所有引用数据类型的原型都是Object，它们都是由Object衍生出来的数据类型，故都算作Object</p>
</div>
<h2 id="js的内存管理和闭包" tabindex="-1"><a class="header-anchor" href="#js的内存管理和闭包" aria-hidden="true">#</a> JS的内存管理和闭包</h2>
<p>像 C 语言这样的底层语言一般都有底层的内存管理接口，比如 <code v-pre>malloc()</code>和<code v-pre>free()</code>。相反，JavaScript 是在创建变量（对象，字符串等）时自动进行了分配内存，并且在不使用它们时“自动”释放。释放的过程称为垃圾回收。这个“自动”是混乱的根源，并让 JavaScript（和其他高级语言）开发者错误的感觉他们可以不关心内存管理</p>
<p>不管什么程序语言，内存生命周期基本是一致的：</p>
<ol>
<li>分配你所需要的内存</li>
<li>使用分配到的内存（读、写）</li>
<li>不需要时将其释放\归还</li>
</ol>
<p>所有语言第二部分都是明确的。第一和第三部分在底层语言中是明确的，但在像 JavaScript 这些高级语言中，大部分都是隐含的</p>
<ul>
<li>手动管理内存：比如C、C++，包括早期的OC，都是需要手动来管理内存的申请和释放的</li>
<li>自动管理内存：比如Java、JavaScript、Python、Swift、Dart等，它们有自动帮助我们管理内存</li>
</ul>
<h3 id="内存管理" tabindex="-1"><a class="header-anchor" href="#内存管理" aria-hidden="true">#</a> 内存管理</h3>
<p>JS的内存管理在具体底层的表现为<strong>堆内存</strong>和<strong>栈空间</strong>，JS对于基本数据类型内存的分配会在执行时，直接在栈空间进行分配，JS对于复杂数据类型内存的分配会在堆内存 中开辟一块空间，并且将这块空间的指针返回值变量引用</p>
<p>每个语言都有自己的垃圾回收机制，而JS也不例外，垃圾回收器简称GC，实际上就是通过算法来实现回收不需要的对象和值</p>
<p>GC算法：</p>
<ul>
<li>引用计数：
<ul>
<li>当一个对象有一个引用指向它时，那么这个对象的引用就+1，当一个对象的引用为0时，这个对象就可以被销毁掉</li>
<li>这个算法有一个很大的弊端就是会产生循环引用</li>
</ul>
</li>
<li>标记清除：
<ul>
<li>JS引擎比较广泛的采用的就是标记清除算法，当然类似于V8引擎为了进行更好的优化，它在算法的实现细节上也会结合一些其他的算法</li>
<li>GC算法不是实时调用的，即当我们设置一个对象的指针为null时该对象没有指针引用的时候是应该立马被删除的，但是GC算法是会延迟检测才删除的，具体延迟时间不定</li>
</ul>
</li>
</ul>
<h3 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包" aria-hidden="true">#</a> 闭包</h3>
<p>JS中函数是一等公民，函数的使用非常灵活，函数可以作为另一个函数的参数，也可以作为另外一个函数的返回值来使用，在函数的概念上扩展出新的函数——高阶函数：<strong>把一个函数如果接收另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值，那么这个函数就称之为是一个高阶函数</strong></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>而数组上就有许多高阶函数，例如map,foreach,filter等</p>
</div>
<p><strong>闭包</strong>（closure）是一个函数以及其捆绑的周边环境状态（<strong>lexical environment</strong>，<strong>词法环境</strong>）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建</p>
<p>JS中的闭包是存在内存泄露的，因为引用链中所有对象都是无法释放的，这就意味着当一个函数执行完需要销毁的时候，如果里面的某个变量被外部所引用，那么该函数就不会被GC自动销毁，这种情况被称为闭包的内存泄露</p>
<p>当我们无法通过GC回收清除那些对象时，JS提供了null来帮助我们手动释放引用链中的对象</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">a</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span>
    <span class="token punctuation">}</span>
	<span class="token keyword">let</span> <span class="token function-variable function">b</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">,</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span>
        obj <span class="token operator">=</span> <span class="token keyword">null</span>
	<span class="token punctuation">}</span>
    <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="js中的this以及apply-call-bind" tabindex="-1"><a class="header-anchor" href="#js中的this以及apply-call-bind" aria-hidden="true">#</a> js中的this以及apply/call/bind</h2>
<h3 id="this" tabindex="-1"><a class="header-anchor" href="#this" aria-hidden="true">#</a> this</h3>
<p>与其他语言相比，<strong>函数的 this 关键字</strong>在 JavaScript 中的表现略有不同，此外，在<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode" target="_blank" rel="noopener noreferrer">严格模式<ExternalLinkIcon/></a>和非严格模式之间也会有一些差别。</p>
<p>在绝大多数情况下，函数的调用方式决定了 <code v-pre>this</code> 的值（运行时绑定）。<code v-pre>this</code> 不能在执行期间被赋值，并且在每次函数被调用时 <code v-pre>this</code> 的值也可能会不同。ES5 引入了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank" rel="noopener noreferrer">bind<ExternalLinkIcon/></a> 方法来设置函数的 <code v-pre>this</code> 值，而不用考虑函数如何被调用的。ES2015 引入了<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions" target="_blank" rel="noopener noreferrer">箭头函数<ExternalLinkIcon/></a>，箭头函数不提供自身的 this 绑定（<code v-pre>this</code> 的值将保持为闭合词法上下文的值）</p>
<p>this在全局中的指向：</p>
<ul>
<li>在浏览器环境下指向<code v-pre>window</code></li>
<li>在node环境下指向{}</li>
</ul>
<p>this一般在函数中使用，this本质上是一条函数上下文中的记录，该记录主要存储函数的调用者，同时，this是在运行时绑定的，而this的绑定有四种情况：</p>
<ul>
<li>默认绑定</li>
<li>隐式绑定</li>
<li>显式绑定（call/bind/apply）</li>
<li>new绑定</li>
</ul>
<p>而绑定规则的优先级为 new &gt; 显式绑定 &gt; 隐式绑定 &gt; 默认绑定</p>
<h3 id="手写apply-bind-call" tabindex="-1"><a class="header-anchor" href="#手写apply-bind-call" aria-hidden="true">#</a> 手写apply/bind/call</h3>
<p>显式绑定的三种方法都是为了更改this的指向，但它们之前是有着区别的，那就是<strong>传参不同</strong>，以及<strong>返回值的不同</strong>，具体可以看下列三种方法手写过程</p>
<p>下面来手写显式绑定的三种方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mycall</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">thisObj<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> fn <span class="token operator">=</span> <span class="token keyword">this</span>

    thisObj <span class="token operator">=</span> <span class="token punctuation">(</span>thisObj <span class="token operator">!==</span><span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> thisObj <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span>  <span class="token operator">?</span>  <span class="token function">Object</span><span class="token punctuation">(</span>thisObj<span class="token punctuation">)</span> <span class="token operator">:</span> window

    <span class="token keyword">const</span> targetfn <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    thisObj<span class="token punctuation">[</span>targetfn<span class="token punctuation">]</span> <span class="token operator">=</span> fn

    <span class="token keyword">const</span> result <span class="token operator">=</span> thisObj<span class="token punctuation">[</span>targetfn<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
    <span class="token keyword">delete</span> thisObj<span class="token punctuation">[</span>targetfn<span class="token punctuation">]</span>
    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myapply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">thisArg<span class="token punctuation">,</span>argArray</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取要执行的函数</span>
    <span class="token keyword">var</span> fn <span class="token operator">=</span> <span class="token keyword">this</span>

    <span class="token comment">// 处理绑定的thisArg</span>
    <span class="token comment">// 前面判断thisArg为0的情况，当参数为0时判断this不该为window</span>
    thisArg <span class="token operator">=</span> <span class="token punctuation">(</span>thisArg <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> thisArg <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">Object</span><span class="token punctuation">(</span>thisArg<span class="token punctuation">)</span><span class="token operator">:</span> window

    <span class="token comment">// 执行函数</span>
    thisArg<span class="token punctuation">.</span>fn <span class="token operator">=</span> fn


    <span class="token comment">// if(!argArray){ //argArray是没有值的(没有传参数)</span>
    <span class="token comment">//     result = thisArg.fn()            </span>
    <span class="token comment">// }else{ //argArray有参数</span>
    <span class="token comment">//     var result = thisArg.fn(...argArray)</span>
    <span class="token comment">// }</span>

    
    <span class="token comment">// 利用||或运算符实现上述if else循环</span>
    argArray <span class="token operator">=</span> argArray <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> thisArg<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token operator">...</span>argArray<span class="token punctuation">)</span>
    <span class="token keyword">delete</span> thisArg<span class="token punctuation">.</span>fn

    <span class="token keyword">return</span> result
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">mybind</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">thisArg<span class="token punctuation">,</span><span class="token operator">...</span>argArray</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取真实需要调用的函数</span>
    <span class="token keyword">var</span> fn <span class="token operator">=</span> <span class="token keyword">this</span>
    
    <span class="token comment">// 绑定this</span>
    thisArg <span class="token operator">=</span> <span class="token punctuation">(</span>thisArg <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> thisArg <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token function">Object</span><span class="token punctuation">(</span>thisArg<span class="token punctuation">)</span> <span class="token operator">:</span> window

    <span class="token keyword">function</span> <span class="token function">proxyFn</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 将函数放到thisArg中进行调用</span>
        thisArg<span class="token punctuation">.</span>fn <span class="token operator">=</span> fn
        <span class="token comment">// 对两个传入的参数进行合并</span>
        <span class="token keyword">var</span> finalArgs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>argArray<span class="token punctuation">,</span><span class="token operator">...</span>args<span class="token punctuation">]</span>
        <span class="token keyword">var</span> result <span class="token operator">=</span> thisArg<span class="token punctuation">.</span><span class="token function">fn</span><span class="token punctuation">(</span>finalArgs<span class="token punctuation">)</span>
        <span class="token keyword">delete</span> thisArg<span class="token punctuation">.</span>fn
        <span class="token keyword">return</span> result
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> proxyFn
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>对于上述三种函数的实现存在一个问题待优化，那就是如果传过来的函数中已经有了fn属性，则就相当于覆盖了原函数的fn，故优化方法为调用ES6中的symbol来创建fn，symbol详情见下方ES6</p>
</div>
<h2 id="深入js对象" tabindex="-1"><a class="header-anchor" href="#深入js对象" aria-hidden="true">#</a> 深入js对象</h2>
<p>对象是JavaScript中一个非常重要的概念，这是因为对象可以将多个相关联的数据封装到一起，更好的描述一个事物，用对象来描述事物，更有利于我们将现实的事物，抽离成代码中某个数据结构，JavaScript中的对象被设计成一组属性的无序集合，像是一个哈希表，有key和value组成，<strong>key是一个标识符名称，value可以是任意类型，也可以是其他对象或者函数类型</strong></p>
<h3 id="属性描述符和存取描述符" tabindex="-1"><a class="header-anchor" href="#属性描述符和存取描述符" aria-hidden="true">#</a> 属性描述符和存取描述符</h3>
<p>高级修改对象属性：</p>
<p><code v-pre>Object.defineProperty()</code>这个由Object对象提供的API能够通过属性描述符来更高级地修改一个对象中的属性，它接收三个参数：</p>
<p>1.要操作的对象</p>
<p>2.要操作对象中的属性</p>
<p>3.属性描述符</p>
<p>属性描述符由4个，分别是<code v-pre>configurable</code>，<code v-pre>value</code>，<code v-pre>enumerable</code>，<code v-pre>writable</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"lyf"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">21</span>
<span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">"height"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">1.85</span><span class="token punctuation">,</span><span class="token comment">//默认值是undefined</span>
    
    <span class="token comment">// 属性是否可以修改或者删除，也不可以重新定义描述符</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//默认值是false</span>
    
    <span class="token comment">// 属性是否可以枚举，遍历</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//默认值是false</span>
    
    <span class="token comment">// 属性是否可以赋值</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token comment">//默认值是false</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 测试configurable</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
<span class="token keyword">delete</span> obj<span class="token punctuation">.</span>height
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>height<span class="token punctuation">)</span>

<span class="token comment">// 测试enumerable</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 测试writable</span>
obj<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">1.9</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>height<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而当属性描述符中的<code v-pre>value</code>和<code v-pre>writable</code>替换成<code v-pre>get</code>和<code v-pre>set</code>函数时，那么它就不是属性描述符而是存取描述符</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"lyf"</span><span class="token punctuation">,</span>
      <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">21</span><span class="token punctuation">,</span>
      <span class="token literal-property property">_height</span><span class="token operator">:</span><span class="token number">1.85</span>
  <span class="token punctuation">}</span>
  
  <span class="token comment">// 存取属性描述符</span>
  <span class="token comment">// 1.隐藏某个私有属性被希望直接被外界使用和赋值</span>
  <span class="token comment">// 2.如果希望截取某一个属性它访问和设置值的过程时</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token string">"height"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
      <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  
      <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_height
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
      <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>_height <span class="token operator">=</span> value
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>注意，如果一个描述符不具有 <code v-pre>value</code>、<code v-pre>writable</code>、<code v-pre>get</code> 和 <code v-pre>set</code> 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 <code v-pre>value</code> 或 <code v-pre>writable</code> 和 <code v-pre>get</code> 或 <code v-pre>set</code> 键，则会产生一个异常</p>
</div>
<p>同时也可以通过<code v-pre>Object.defineProperties</code>定义多个属性描述符</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 私有属性（js里面没有严格意义的私有属性）</span>
    <span class="token literal-property property">_age</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span>
    
<span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperties</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">"lyf"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
        <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>获取对象的属性描述符：</p>
<ul>
<li>Object.getOwnPropertyDescriptor（obj）</li>
</ul>
<p>Object中的方法对对象的属性描述符的限制：</p>
<ul>
<li>Object.preventExtensions(obj)</li>
<li>Object.seal(obj)</li>
<li>Object.freeze(obj)</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span>
<span class="token punctuation">}</span>

<span class="token comment">// 禁止对象继续添加新的属性</span>
Object<span class="token punctuation">.</span><span class="token function">preventExtensions</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token number">1.85</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token comment">// 禁止对象配置/删除里面的属性</span>
Object<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

<span class="token keyword">delete</span> obj<span class="token punctuation">.</span>age
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
<span class="token comment">// 让属性不可以修改（writable：false）</span>
Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

obj<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">21</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h3>
<p>由于引进了属性描述符的方法，在JS中就能通过各种各样的方式来创建各种对象，这个时候就需要引入另外一个概念——工厂模式，该模式指定一个工厂方法，通过工厂方法来生产想要的对象，所有对象的生产都由该方法返回</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 通过字面量创建对象</span>
<span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span><span class="token operator">:</span> <span class="token number">1.85</span><span class="token punctuation">,</span>
    <span class="token function-variable function">running</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"running"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 工厂模式</span>
<span class="token comment">// 通过一个函数返回一个自己想要的对象</span>
<span class="token keyword">function</span> <span class="token function">createPerson</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建对象</span>
    <span class="token keyword">var</span> p <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 给对象赋入传入的参数的值</span>
    p<span class="token punctuation">.</span>name <span class="token operator">=</span> name
    p<span class="token punctuation">.</span>age <span class="token operator">=</span> age
    p<span class="token punctuation">.</span>height <span class="token operator">=</span> height

    p<span class="token punctuation">.</span><span class="token function-variable function">running</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"running"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 返回创建好的对象</span>
    <span class="token keyword">return</span> p
<span class="token punctuation">}</span>

<span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token function">createPerson</span><span class="token punctuation">(</span><span class="token string">"lyf"</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token number">1.85</span><span class="token punctuation">)</span>

<span class="token comment">// 工厂模式的缺点：获取不到对象的真实类型</span>
<span class="token comment">// 即每个工厂模式创建出来的都是Object对象，区分不了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原型" tabindex="-1"><a class="header-anchor" href="#原型" aria-hidden="true">#</a> 原型</h2>
<p>在JavaScript当中每个对象都有一个特殊的内置属性[[prototype]]，这个特殊的属性的值是另外一个对象，而另外的一个对象就称为是这个对象的原型</p>
<p>原型对象的作用：</p>
<p>当我们通过引用对象的属性key来获取一个value时，它会触发Get操作，这个操作会首先检查该属性是否有对应的属性，如果有则使用它，如果没有，则会访问对象[[prototype]]内置属性指向的对象上的属性继续去找</p>
<p>获取原型对象的方式：</p>
<ul>
<li>通过对象的proto属性可以获取到（但是这个是早期浏览器自己添加的，存在一定的兼容性问题）</li>
<li>通过 Object.getPrototypeOf 方法可以获取到</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>原型对象上是有一个constructor属性，默认情况下原型上都会添加一个属性叫做constructor，该属性会指向当前的函数对象</p>
</div>
<p>重写原型对象：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 直接修改整个prototype对象</span>
foo<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">namne</span> <span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span> <span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
    <span class="token literal-property property">height</span> <span class="token operator">:</span> <span class="token number">1.85</span>
<span class="token punctuation">}</span>

<span class="token comment">// 真实开发中我们可以通过Object.defineProperty方式添加construtor</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>prototype<span class="token punctuation">,</span><span class="token string">"constructor"</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="原型链和继承" tabindex="-1"><a class="header-anchor" href="#原型链和继承" aria-hidden="true">#</a> 原型链和继承</h2>
<p>在真正实现继承之前，我们先来理解一个非常重要的概念：原型链</p>
<p>我们知道，从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上面获取，上一层原型没有的话就从原型的原型上找，这样就形成了一条链，而它就是原型链</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span>
<span class="token punctuation">}</span>

<span class="token comment">// [[get]]操作</span>
<span class="token comment">// 1.在当前对象中查找属性</span>
<span class="token comment">// 2.如果没有找到，这个时候回去原型（__proto__）对象上查找</span>
<span class="token comment">// 3.一直沿着原型链查找属性直到顶层对象</span>

<span class="token comment">// obj.__proto__ = {</span>
<span class="token comment">//     height: 1.85</span>
<span class="token comment">// }</span>
<span class="token comment">// obj.__proto__ = {</span>

<span class="token comment">// }</span>

<span class="token comment">// obj.__proto__.__proto__ = {</span>
<span class="token comment">//     // height: 1.9</span>
<span class="token comment">// }</span>

<span class="token comment">// obj.__proto__.__proto__.__proto__ = {</span>
<span class="token comment">//     height: 2.0</span>
<span class="token comment">// }</span>

<span class="token comment">// 原型链 prototype chain 原型链的顶层是顶层原型</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>height<span class="token punctuation">)</span>

<span class="token comment">// 此时的obj.__proto__是顶层原型，没有上层</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span>

<span class="token comment">// 当创建一个对象的时候，此时会将Object的显式原型赋值给创建的对象的原型</span>
<span class="token comment">// 即obj.__proto__ = Object.prototype</span>
<span class="token comment">// 而Object在JS中是一个创建好了的函数</span>
<span class="token comment">// prototype是原型对象，而__proto__是原型属性</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__<span class="token punctuation">)</span>   

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptors</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Javascript中绝大多数的对象的顶层原型都是Object，而它则没有原型，故属性为null，该对象上有很多默认的属性和方法，绝大多数的对象例如Array都是由Object为原型而进行的二次封装，连同Function也是</p>
<p>通过原型链实现继承</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 父类</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
    <span class="token keyword">this</span><span class="token punctuation">.</span>friends <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eating</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"eating"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token comment">// 子类</span>
<span class="token keyword">function</span> <span class="token function">student</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//Person.call(this,name,age,height)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sno <span class="token operator">=</span> <span class="token number">111</span>
<span class="token punctuation">}</span>
<span class="token comment">// 原型链实现继承</span>
student<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

student<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">studying</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>sno <span class="token operator">+</span> <span class="token string">"studyings"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// var stu = new student</span>
<span class="token comment">// console.log(stu.sno)</span>
<span class="token comment">// console.log(stu.name)</span>
<span class="token comment">// stu.eating()</span>
<span class="token comment">// stu.studying()</span>

<span class="token comment">// 原型链实现继承的弊端:</span>
<span class="token comment">// 1.打印stu对象，继承的属性是看不到的，继承的属性在原型链上而不在该对象中</span>
<span class="token comment">// console.log(stu)</span>

<span class="token comment">// 2.创建出来两个stu的对象</span>
<span class="token comment">// var stu1 = new student()</span>
<span class="token comment">// var stu2 = new student()</span>

<span class="token comment">// 直接修改对象上的属性，是给本对象添加了一个新属性，不会影响</span>
<span class="token comment">// stu1.name = "eee"</span>
<span class="token comment">// console.log(stu1.name)</span>
<span class="token comment">// console.log(stu2.name)</span>

<span class="token comment">// 通过原型获取的属性值并不是独立的，会相互影响</span>
<span class="token comment">// stu1.friends.push("lyf")</span>
<span class="token comment">// console.log(stu1.friends)</span>
<span class="token comment">// console.log(stu2.friends)</span>

<span class="token comment">// 3.在前面实现类的过程中都没有传递参数，因为参数不能确定是在子类还是父类进行处理</span>

<span class="token keyword">var</span> stu3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">student</span><span class="token punctuation">(</span><span class="token string">"lyf"</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token number">1.85</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu3<span class="token punctuation">)</span>

<span class="token comment">// 优化方法：在子类中添加调用父类的call方法,相当于借用构造函数进行继承</span>
<span class="token comment">// Person.call(this,name,age,height)</span>

<span class="token comment">// 强调：借用构造函数即上述优化方法也是有弊端：</span>
<span class="token comment">// 1.Person函数至少被调用了两次</span>
<span class="token comment">// 2.stu的原型对象上回多出一些属性，但是这些属性没有存在的必要</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>组合继承（组合继承就是使用原型链继承和构造器继承组合一起来实现继承）：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 父类</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> height
    <span class="token keyword">this</span><span class="token punctuation">.</span>friends <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">eating</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"eating"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>



<span class="token comment">// 子类</span>
<span class="token keyword">function</span> <span class="token function">student</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">Person</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>height<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sno <span class="token operator">=</span> <span class="token number">111</span>
<span class="token punctuation">}</span>
student<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// 在原型链继承上多了这一步</span>
<span class="token comment">// 使得能复用父类的方法</span>
<span class="token comment">// 在每次调用父类的方法的时候，都会去主动调用子类中的方法</span>
student<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">=</span> student

<span class="token keyword">var</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">student</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原型式继承：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span>
<span class="token punctuation">}</span>

<span class="token comment">// 原型式继承函数</span>
<span class="token keyword">function</span> <span class="token function">object</span> <span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> newobj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 将newobj的原型设置为o</span>
    Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span>newobj<span class="token punctuation">,</span>o<span class="token punctuation">)</span>
    <span class="token keyword">return</span> newobj
<span class="token punctuation">}</span>

<span class="token comment">// var info = object(obj)</span>
<span class="token comment">// console.log(info)</span>
<span class="token comment">// console.log(info.name)</span>

<span class="token comment">// 在最新的ECMA中提供了create方法可以实现上述原型式继承函数</span>
<span class="token comment">// 而create方法内部其实也是和原型式继承函数一样实现的</span>
<span class="token keyword">var</span> info <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>info<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>寄生组合式继承：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 父类</span>
<span class="token keyword">function</span> <span class="token function">Person</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>friends</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token keyword">this</span><span class="token punctuation">.</span>friends <span class="token operator">=</span> friends
<span class="token punctuation">}</span>

<span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">runing</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"running"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 子类</span>
<span class="token keyword">function</span> <span class="token function">student</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>friends<span class="token punctuation">,</span>sno<span class="token punctuation">,</span>score</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">Person</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>friends<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sno <span class="token operator">=</span> sno
    <span class="token keyword">this</span><span class="token punctuation">.</span>score <span class="token operator">=</span> score
<span class="token punctuation">}</span>

<span class="token comment">// 创建一个函数用来实现继承</span>
<span class="token keyword">function</span> <span class="token function">inheritPrototype</span><span class="token punctuation">(</span><span class="token parameter">SubType<span class="token punctuation">,</span>SuperType</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将子类的原型对象设置为一个新的对象，而这个新的对象的原型是父类的原型</span>
    <span class="token class-name">SubType</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">SuperType</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">inheritPrototype</span><span class="token punctuation">(</span>student<span class="token punctuation">,</span>Person<span class="token punctuation">)</span>


student<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">studying</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"studying"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">student</span><span class="token punctuation">(</span><span class="token string">"lyf"</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token string">"xxx"</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span>
stu<span class="token punctuation">.</span><span class="token function">runing</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
stu<span class="token punctuation">.</span><span class="token function">studying</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>现在的extends语法糖其实就是寄生组合式继承，可以通过babel转换extends查看源码</p>
</div>
<h2 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h2>
<p>在ES6后能用<code v-pre>class</code>来声明一个类，类的内部存在一个构造函数，每个类可以有一个自己的构造函数，该构造函数的名字是固定的<code v-pre>constructor</code></p>
<p>当我们通过new操作符，操作一个类的时候会调用这个类的构造函数<code v-pre>constructor</code>，每个类只能有一个构造函数，如果包含多个构造函数，那么会抛出异常</p>
<p>当我们new一个类时，会调用构造函数，并执行如下操作：</p>
<ul>
<li>1.在内存中创建一个新的对象（空对象</li>
<li>2.这个对象内部的[[prototype]]属性会被赋值为该类的prototype属性</li>
<li>3.构造函数内部的this，会指向创建出来的新对象</li>
<li>4.执行构造函数的内部代码（函数体代码）</li>
<li>5.如果构造函数没有返回非空对象，则返回创建出来的新对象</li>
</ul>
<p>类中也可以定义一个静态方法，静态方法通常用于定义直接使用类来执行的方法，不需要有类的实例，需要使用static关键字来定义</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 类的声明</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">// 构造函数来接收参数</span>
    <span class="token comment">// 注意：一个类只有一个构造函数</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
        <span class="token keyword">this</span><span class="token punctuation">.</span>_address <span class="token operator">=</span> <span class="token string">"广州市"</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 普通的实例方法</span>
    <span class="token comment">// 方法能直接写在类的内部,该方法其实是写在Person的原型上面</span>
    <span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">"eating"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 类的访问器</span>
    <span class="token keyword">get</span> <span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_address
    <span class="token punctuation">}</span>

    <span class="token keyword">set</span> <span class="token function">address</span><span class="token punctuation">(</span><span class="token parameter">Newaddress</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_address <span class="token operator">=</span> Newaddress
    <span class="token punctuation">}</span>

    <span class="token comment">// 类的静态方法</span>
    <span class="token comment">// 可以通过类名访问</span>
    <span class="token keyword">static</span> <span class="token function">createPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">'lyf'</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
p1<span class="token punctuation">.</span><span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token class-name">Person</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类也可以继承，使用<code v-pre>extends</code>关键字来实现类的继承，在子（派生）类的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数，super的使用位置有三个：子类的构造函数、实例方法、静态方法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// class中实现继承</span>
<span class="token keyword">class</span> <span class="token class-name">student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token comment">// JS引擎在解析子类的时候是有要求的，如果我们有实现继承</span>
    <span class="token comment">// 那么在子类的构造方法中，在使用this之前必须调用super()</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span>age<span class="token punctuation">,</span>sno</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>sno <span class="token operator">=</span> sno
    <span class="token punctuation">}</span>

    <span class="token comment">// 子类方法的重写</span>
    <span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 复用父类中的方法</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">eating</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"子类方法的重写"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">student</span><span class="token punctuation">(</span><span class="token string">'lyf'</span><span class="token punctuation">,</span><span class="token number">21</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu1<span class="token punctuation">)</span>
stu1<span class="token punctuation">.</span><span class="token function">eating</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于class和extends，它们都是语法糖，我们可以用babel查看下class类源码的实现</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">person</span><span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

<span class="token comment">// 源码实现</span>
<span class="token keyword">function</span> <span class="token function">_instanceof</span><span class="token punctuation">(</span><span class="token parameter">left<span class="token punctuation">,</span> right</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>right <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Symbol <span class="token operator">!==</span> <span class="token string">"undefined"</span> <span class="token operator">&amp;&amp;</span> right<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>right<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>hasInstance<span class="token punctuation">]</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> 
        <span class="token keyword">return</span> left <span class="token keyword">instanceof</span> <span class="token class-name">right</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">_defineProperties</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> props<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">var</span> descriptor <span class="token operator">=</span> props<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span> descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">=</span> descriptor<span class="token punctuation">.</span>enumerable <span class="token operator">||</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 
        descriptor<span class="token punctuation">.</span>configurable <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> 
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">"value"</span> <span class="token keyword">in</span> descriptor<span class="token punctuation">)</span> descriptor<span class="token punctuation">.</span>writable <span class="token operator">=</span> <span class="token boolean">true</span>；		 	 	
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> descriptor<span class="token punctuation">.</span>key<span class="token punctuation">,</span> descriptor<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">_createClass</span><span class="token punctuation">(</span><span class="token parameter">Constructor<span class="token punctuation">,</span> protoProps<span class="token punctuation">,</span> staticProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>protoProps<span class="token punctuation">)</span> <span class="token function">_defineProperties</span><span class="token punctuation">(</span><span class="token class-name">Constructor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> protoProps<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span>staticProps<span class="token punctuation">)</span> <span class="token function">_defineProperties</span><span class="token punctuation">(</span>Constructor<span class="token punctuation">,</span> staticProps<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Constructor<span class="token punctuation">,</span> <span class="token string">"prototype"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> 
        <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span> 
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token keyword">return</span> Constructor<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">_classCallCheck</span><span class="token punctuation">(</span><span class="token parameter">instance<span class="token punctuation">,</span> Constructor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">_instanceof</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> Constructor<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">"Cannot call a class as a function"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person <span class="token operator">=</span> <span class="token comment">/*#__PURE__*/</span><span class="token function">_createClass</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">person</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">_classCallCheck</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> person<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多态" tabindex="-1"><a class="header-anchor" href="#多态" aria-hidden="true">#</a> 多态</h2>
<p>多态是编程语言中的一种概念：为不同数据类型的实体提供统一的接口，或者使用一个单一的符号来表示多种不同的类型</p>
<p>具体在JS的表现即不同的参数会有不同类型的结果，下面的例子就是一个经典的多态：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span>b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a <span class="token operator">+</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token comment">//30</span>
<span class="token function">sum</span><span class="token punctuation">(</span><span class="token string">"abc"</span><span class="token punctuation">,</span><span class="token string">"cba"</span><span class="token punctuation">)</span> <span class="token comment">//abccba</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="es6-知识" tabindex="-1"><a class="header-anchor" href="#es6-知识" aria-hidden="true">#</a> ES6+知识</h2>
<p>由于自ES6来ECMA更新了众多个版本，所以下面只列出一些重要的知识点，更多详情见<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></p>
<h3 id="let-const" tabindex="-1"><a class="header-anchor" href="#let-const" aria-hidden="true">#</a> let/const</h3>
<p>在ES5中声明变量都是使用var关键字，但是该关键字有个很大的问题，就是会进行作用域提升，于是ES6中就新增了两个关键字用来声明变量：<code v-pre>let</code>，<code v-pre>const</code></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>const定义的基本数据类型是不允许改动的，但是const定义的引用类型是允许改变的</p>
</div>
<p>var声明的变量是会进行作用域提升的，作用域提升就是<strong>在声明变量的作用域中，如果这个变量可以在声明之前被访问，那么我们可以称之为作用域提升</strong></p>
<p>而let/const没有进行作用域提升，因为在执行上下文创建阶段被创建出来</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">//可以被访问，foo被创建，值是undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">"111"</span>
<span class="token comment">//不可以被访问，foo2被创建</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>foo2<span class="token punctuation">)</span>
<span class="token keyword">let</span> foo2 <span class="token operator">=</span> <span class="token string">"222"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>在全局中var一个变量，其实就是在window上面添加一个属性，这个属性保存的值就是我们设置的变量，也就是说我们声明的变量和环境记录是被添加到变量环境中的，v8中其实是通过VariableMap的一个hashmap来实现它们的存储的。window对象是早期的GO对象，在最新的实现中其实是浏览器添加的全局对象，并且一直保持了window和var之间值的相等性</p>
</div>
<h3 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> 模板字符串</h3>
<p>ES6允许我们使用字符串模板来嵌入JS的变量或者表达式来进行拼接，首先，我们会使用 `` 符号来编写字符串，称之为模板字符串，其次，在模板字符串中，我们可以通过 ${expression} 来嵌入动态的内容</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token string">'456'</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">这是a参数:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>a<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">，这是b参数</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>b<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="默认参数和剩余参数" tabindex="-1"><a class="header-anchor" href="#默认参数和剩余参数" aria-hidden="true">#</a> 默认参数和剩余参数</h3>
<p>在ES6之前，我们编写的函数参数是没有默认值的，所以我们在编写函数时，如果有默认值的需求，需要在函数内部判断赋值，而在ES6中，我们允许给函数一个默认值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token parameter">x <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">,</span>y <span class="token operator">=</span> <span class="token number">30</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ES6之前，是设置了一个伪数组<code v-pre>arguments</code>对象来表示多个参数，<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments" target="_blank" rel="noopener noreferrer">arguments<ExternalLinkIcon/></a>是早期的ECMAScript中为了方便去获取所有的参数提供的一个数据结构。而ES6后，提供了<code v-pre>rest</code>参数来表示不定数量的参数，它与<code v-pre>arguments</code>的区别就在于<code v-pre>rest</code>参数是一个真正的数组，可以进行数组的所有操作，<strong>该参数就是用来替代<code v-pre>arguments</code>的</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">m<span class="token punctuation">,</span>n<span class="token punctuation">,</span><span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span>n<span class="token punctuation">)</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">,</span><span class="token number">40</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="新增的基本数据类型-symbol" tabindex="-1"><a class="header-anchor" href="#新增的基本数据类型-symbol" aria-hidden="true">#</a> 新增的基本数据类型-Symbol</h3>
<p>Symbol是ES6中新增的一个基本数据类型，翻译为符号</p>
<p>我们希望在其中添加一个新的属性和值，但是我们在不确定它原来内部有什么内容的情况下，很容易造成冲突，从而覆盖掉它内部的某个属性</p>
<p>Symbol值是通过Symbol函数来生成的，生成后可以作为属性名，Symbol生成的值是<strong>独一无二</strong>的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> symbol1 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> symbol2 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> symbol3 <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> symbol1<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: "symbol"</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>symbol2 <span class="token operator">===</span> <span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: false</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>symbol3<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: "Symbol(foo)"</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> Proxy</h3>
<p><strong>Proxy</strong> 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）</p>
<p>如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy对象）</p>
<p>之后对该对象的所有操作，都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作</p>
<p>Proxy中最强大的就是它的捕获器（13个），这些捕获器完善了原来的存取器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 原来的监听对象的操作是对原来的对象进行操作，但是我们监听理论上是不应该去修改原来的对象的</span>
<span class="token comment">// Proxy类中可以创建一个Proxy代理对象，这个时候就能想在原来对象上进行的监听统一在代理对象上实现</span>
<span class="token comment">// 代理对象可以监听我们想要对原来对象进行的操作</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"lyf"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 第一个参数是想要代理的原对象</span>
<span class="token comment">// 第二个参数是捕获器参数,一共有13个捕获器</span>
<span class="token keyword">const</span> objProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token comment">// 获取值时的捕获器</span>
    <span class="token comment">// target是原来的obj对象，key是原对象中的属性</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置值的捕获器</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 监听in的捕获器</span>
    <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> key <span class="token keyword">in</span> target
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 监听delete的捕获器</span>
    <span class="token function-variable function">deleteProperty</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">delete</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objProxy<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objProxy<span class="token punctuation">.</span>age<span class="token punctuation">)</span>

objProxy<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"aaa"</span>
objProxy<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">22</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span>

<span class="token comment">// in操作符</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"name"</span> <span class="token keyword">in</span> objProxy<span class="token punctuation">)</span>

<span class="token comment">// delete操作</span>
<span class="token keyword">delete</span> objProxy<span class="token punctuation">.</span>age
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="reflect" tabindex="-1"><a class="header-anchor" href="#reflect" aria-hidden="true">#</a> Reflect</h3>
<p>由于历史原因，ECMA早期的ObjectAPI不是非常的完美，很多API是存在缺陷的，在早期的ECMA规范中没有考虑到这种对 <strong>对象本身</strong> 的操作如何设计会更加规范，所以将这些API放到了Object上面，但是Object作为一个构造函数，这些操作实际上放到它身上并不合适，所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上</p>
<p>Reflect意思是反射，它是与proxy一一对应的，常见的方法可见<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> duck <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Maurice'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'white'</span><span class="token punctuation">,</span>
  <span class="token function-variable function">greeting</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Quaaaack! My name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Reflect<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>duck<span class="token punctuation">,</span> <span class="token string">'color'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// true</span>
Reflect<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>duck<span class="token punctuation">,</span> <span class="token string">'haircut'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Object上的方法Reflect基本都有，而且Reflect还可以和proxy一起配合使用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">_name</span> <span class="token operator">:</span> <span class="token string">"lyf"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_age</span> <span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
    <span class="token keyword">get</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_name
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">set</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> newValue
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> objProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token comment">// receiver就是当前objProxy对象，作用是改变原对象中get方法的this对象，改变为当前objProxy对象</span>
    <span class="token comment">// 这样该get方法就会调用两次，第二次才会返回_name值，这样就能在Proxy中进行拦截操作</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span>
        <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue<span class="token punctuation">,</span>receiver</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 在Reflect中访问的是对象中的get方法，在get内部才去访问_name</span>
<span class="token comment">// 这样就会造成当我们访问对象的时候其实是绕过Proxy代理对象去原对象上访问的</span>
<span class="token comment">// 这个时候我们想在代理对象中进行的一些拦截就无法实现</span>
objProxy<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'aaa'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objProxy<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h3>
<p>Set是一个新增的数据结构，可以用来保存数据，类似于数组，但是和数组的区别是元素不能重复，我们可以发现Set中存放的元素是不会重复的，那么Set有一个非常常用的功能就是给<strong>数组去重</strong></p>
<p>Set常见的属性：</p>
<ul>
<li>size：返回Set中元素的个数</li>
</ul>
<p>Set常用的方法：</p>
<ul>
<li>add(value)：添加某个元素，返回Set对象本身</li>
<li>delete(value)：从set中删除和这个值相等的元素，返回boolean类型</li>
<li>has(value)：判断set中是否存在某个元素，返回boolean类型</li>
<li>clear()：清空set中所有的元素，没有返回值</li>
<li>forEach(callback, [, thisArg])：通过forEach遍历set</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> mySet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Set [ 1 ]</span>
mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Set [ 1, 5 ]</span>
mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Set [ 1, 5 ]</span>
mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"some text"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Set [ 1, 5, "some text" ]</span>
<span class="token keyword">let</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>

mySet<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// o 指向的是不同的对象，所以没问题</span>

mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>              <span class="token comment">// true</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">sqrt</span><span class="token punctuation">(</span><span class="token number">25</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">"Some Text"</span><span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

mySet<span class="token punctuation">.</span>size<span class="token punctuation">;</span> <span class="token comment">// 5</span>

mySet<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// true，从 set 中移除 5</span>
mySet<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// false, 5 已经被移除</span>

mySet<span class="token punctuation">.</span>size<span class="token punctuation">;</span> <span class="token comment">// 4，刚刚移除一个值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了<code v-pre>Set</code>还有<code v-pre>WeakSet</code>，<code v-pre>WeakSet</code> 对象是一些对象值的集合。且其与 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer"><code v-pre>Set</code><ExternalLinkIcon/></a> 类似，<code v-pre>WeakSet</code> 中的每个对象值都只能出现一次。在 <code v-pre>WeakSet</code> 的集合中，所有对象都是唯一的。</p>
<p>它和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer"><code v-pre>Set</code><ExternalLinkIcon/></a> 对象的主要区别有：</p>
<ul>
<li><code v-pre>WeakSet</code> <strong>只能是对象</strong>的集合，而不能像 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer"><code v-pre>Set</code><ExternalLinkIcon/></a> 那样，可以是任何类型的任意值。</li>
<li><code v-pre>WeakSet</code> 持<em>弱引用</em>：集合中对象的引用为<em>弱</em>引用。如果没有其它的对 <code v-pre>WeakSet</code> 中对象的引用，那么这些对象会被当成垃圾回收掉</li>
</ul>
<p>对象的数量或它们的遍历顺序无关紧要，因此，<code v-pre>WeakSet</code> 比 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer"><code v-pre>Set</code><ExternalLinkIcon/></a> 更适合（和执行）跟踪对象引用，尤其是在涉及大量对象时</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><strong>备注：</strong> 这也意味着 <code v-pre>WeakSet</code> 中没有存储当前对象的列表。正因为这样，<code v-pre>WeakSet</code> 是不可枚举的</p>
</div>
<h3 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h3>
<p><code v-pre>Map</code> 对象是键值对的集合。<code v-pre>Map</code> 中的一个键<strong>只能出现一次</strong>；它在 <code v-pre>Map</code> 的集合中是独一无二的。<code v-pre>Map</code> 对象按键值对迭代——一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank" rel="noopener noreferrer"><code v-pre>for...of</code><ExternalLinkIcon/></a> 循环在每次迭代后会返回一个形式为 <code v-pre>[key，value]</code> 的数组。迭代按<em>插入顺序</em>进行，即键值对按 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set" target="_blank" rel="noopener noreferrer"><code v-pre>set()</code><ExternalLinkIcon/></a> 方法首次插入到集合中的顺序（也就是说，当调用 <code v-pre>set()</code> 时，map 中没有具有相同值的键）进行迭代</p>
<p>Map的常用属性：</p>
<ul>
<li>size：返回Map中元素的个数</li>
</ul>
<p>Map的常用方法：</p>
<ul>
<li>set(key, value)：在Map中添加key、value，并且返回整个Map对象</li>
<li>get(key)：根据key获取Map中的value</li>
<li>has(key)：判断是否包括某一个key，返回Boolean类型</li>
<li>delete(key)：根据key删除一个键值对，返回Boolean类型</li>
<li>clear()：清空所有的元素</li>
<li>forEach(callback, [, thisArg])：通过forEach遍历Map</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> map1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

map1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
map1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'c'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: 1</span>

map1<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token number">97</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map1<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: 97</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map1<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: 3</span>

map1<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>map1<span class="token punctuation">.</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// expected output: 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和Map类型的另外一个数据结构称之为WeakMap，也是以键值对的形式存在的，WeakMap的key只能使用对象，不接受其他的类型作为key，WeakMap的key对对象想的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象，WeakMap也是不能遍历的</p>
<h3 id="for-in-for-of" tabindex="-1"><a class="header-anchor" href="#for-in-for-of" aria-hidden="true">#</a> for in/for of</h3>
<p><strong>for...in语句</strong>以任意顺序迭代一个对象的除<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" target="_blank" rel="noopener noreferrer">Symbol<ExternalLinkIcon/></a>以外的<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties" target="_blank" rel="noopener noreferrer">可枚举<ExternalLinkIcon/></a>属性，包括继承的可枚举属性。</p>
<p>for...in主要是用来获取key值，而想要获取value值可以使用for...of</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>

<span class="token keyword">for</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token comment">// 0 1 2 3</span>
<span class="token punctuation">}</span>

<span class="token keyword">for</span><span class="token punctuation">(</span>value <span class="token keyword">of</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token comment">// 1,2,3,4</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="flat" tabindex="-1"><a class="header-anchor" href="#flat" aria-hidden="true">#</a> Flat</h3>
<p>flat和flatmap是ES10新增的内置对象，意为降维数组</p>
<p>flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回</p>
<p>flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// flat的使用</span>
<span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">109</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">,</span><span class="token number">67</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> newarr <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newarr<span class="token punctuation">)</span>

<span class="token keyword">const</span> newarr2 <span class="token operator">=</span> arr<span class="token punctuation">.</span><span class="token function">flat</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>newarr2<span class="token punctuation">)</span>

<span class="token comment">// flatMap的使用</span>
<span class="token keyword">const</span> nums2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> newnums2 <span class="token operator">=</span> nums2<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> itme <span class="token operator">*</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// flatMap的应用场景</span>
<span class="token keyword">const</span> message <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"hello world"</span><span class="token punctuation">,</span><span class="token string">"hello lyf"</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> words <span class="token operator">=</span> message<span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">" "</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="optional-chaining" tabindex="-1"><a class="header-anchor" href="#optional-chaining" aria-hidden="true">#</a> Optional Chaining</h3>
<p>在使用<code v-pre>||</code>的时候，开发者发现该判断是存在缺陷的，即<code v-pre>0</code>与<code v-pre>&quot;&quot;</code>都会判断为<code v-pre>undefined</code>或<code v-pre>null</code>，而有些时候我们需要这两个值而不是<code v-pre>undefined</code>或<code v-pre>null</code>，所以提供了<code v-pre>?.</code>可选链的方式去判断前面的值是否为真的<code v-pre>undefined</code>或<code v-pre>null</code>，而且该语法还可以链式判断</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
	<span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token literal-property property">deepObj</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token literal-property property">deepObj2</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj<span class="token punctuation">.</span>age <span class="token operator">||</span> obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span> <span class="token comment">// undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> obj <span class="token operator">?.</span> age<span class="token punctuation">)</span> <span class="token comment">// 0</span>

<span class="token comment">// 如果对象中的某个属性删除了，则需要判断该属性是否存在</span>
<span class="token comment">// 原始判断</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>obj <span class="token operator">&amp;&amp;</span> obj<span class="token punctuation">.</span>deepObj <span class="token operator">&amp;&amp;</span> obj<span class="token punctuation">.</span>deepObj<span class="token punctuation">.</span>deepObj2 <span class="token operator">&amp;&amp;</span> obj<span class="token punctuation">.</span>deepObj<span class="token punctuation">.</span>deepObj2<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>deepObj<span class="token punctuation">.</span>deepObj2<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 利用？.的方式判断,不需要用if去判断undefined</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj <span class="token operator">?.</span> deepObj <span class="token operator">?.</span> deepObj2 <span class="token operator">?.</span>name <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="promise" tabindex="-1"><a class="header-anchor" href="#promise" aria-hidden="true">#</a> Promise</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> 是ES6新增的一个类，也可以是一个对象，它代表了一个异步操作的最终完成或者失败，它的出现是为了解决在ES5的时候没有能够解决<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E9%93%BE%E5%BC%8F%E8%B0%83%E7%94%A8" target="_blank" rel="noopener noreferrer">回调地狱<ExternalLinkIcon/></a>的问题。</p>
<p>本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。</p>
<p>在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor，这个回调函数会被立即执行，并传入另外两个回调函数作为参数</p>
<p>整体Promise的使用过程可以划分为三个状态：</p>
<ul>
<li>待定（pending）: 初始状态，既没有被兑现，也没有被拒绝，即执行executor中的代码的时候</li>
<li>已兑现（fuluilled）：成功状态，即已经兑现，操作成功，执行了resolve函数时处于该状态</li>
<li>已拒绝（rejected）：失败状态，即已经失败，操作失败，执行了reject函数时处于该状态</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mypromise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
	
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当前为pending状态，该代码会立刻执行'</span><span class="token punctuation">)</span>
	
	<span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'当前为fuluilled状态，该字符串会作为参数传递到then中'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
	<span class="token comment">// 这里的res就是上面resolve的参数</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
	
	<span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">'当前为rejected状态，该字符串会作为参数传递到下一个then或者catch中'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
	console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

mypromise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'当前promise还可以继续链式调用'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>then方法本身是有返回值的，它的返回值是一个promise，所以我们可以进行链式调用。而then中的代码在<strong>事件循环</strong>中处于<strong>微任务队列</strong></p>
</div>
<p>Promise方法的原型上还设置了许多扩展的API，可以查看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95" target="_blank" rel="noopener noreferrer">其他API<ExternalLinkIcon/></a>，常见的有finally，all，race</p>
<h3 id="手写promise" tabindex="-1"><a class="header-anchor" href="#手写promise" aria-hidden="true">#</a> 手写Promise</h3>
<p>下面我们来手动实现一个简单的Promise：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Promise结构的设计</span>
<span class="token comment">// 定义Promise的三种状态    </span>
<span class="token keyword">const</span> <span class="token constant">PROMISE_STATUS_PENDING</span> <span class="token operator">=</span> <span class="token string">'pending'</span>
<span class="token keyword">const</span> <span class="token constant">PROMISE_STATUS_FULFILLED</span> <span class="token operator">=</span> <span class="token string">'fulfilled'</span>
<span class="token keyword">const</span> <span class="token constant">PROMISE_STATUS_REJECTED</span> <span class="token operator">=</span> <span class="token string">'rejected'</span>

<span class="token comment">// 自定义Promise类</span>
<span class="token keyword">class</span> <span class="token class-name">LPromise</span><span class="token punctuation">{</span>
    <span class="token comment">// 构造函数中有一个executor作为参数，而这个就是Promise的回调函数</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">executor</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 在构造函数内部将要设置的状态以及resolve和reject时的参数</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">PROMISE_STATUS_PENDING</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">undefined</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reason <span class="token operator">=</span> <span class="token keyword">undefined</span>

        <span class="token comment">// 创建一个resolve函数，这个函数接收一个参数，这个参数就是resolve需要传递的值</span>
        <span class="token keyword">const</span> <span class="token function-variable function">resolve</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 判断一下当前Promise的状态</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PROMISE_STATUS_PENDING</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">PROMISE_STATUS_FULFILLED</span>
                <span class="token comment">// 调用了queueMicrotask方法，这里的参数是一个回调函数，能保证这个回调函数会在下面then中调用</span>
                <span class="token comment">// 这里的queueMicrotask是一个微任务</span>
                <span class="token function">queueMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onfulfilled</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 与上面的resolve同理</span>
        <span class="token keyword">const</span> <span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token constant">PROMISE_STATUS_PENDING</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token constant">PROMISE_STATUS_REJECTED</span>
                <span class="token function">queueMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span>reason <span class="token operator">=</span> reason
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">onrejected</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>reason<span class="token punctuation">)</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 这个构造函数内部会执行这个回调函数，并且将resolve和reject这两个函数作为参数</span>
        <span class="token function">executor</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span>reject<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 在Promise类中定义then方法，要求传入两个回调函数，然后将这两个回调函数保存到Promise上</span>
    <span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">onfulfilled<span class="token punctuation">,</span>onrejected</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>onfulfilled <span class="token operator">=</span> onfulfilled
        <span class="token keyword">this</span><span class="token punctuation">.</span>onrejected <span class="token operator">=</span> onrejected
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>


<span class="token comment">// 创建一个promise对象</span>
<span class="token keyword">const</span> promise <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LPromise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span>reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 检测构造函数executor是否有立即调用</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"传入的函数被调用了"</span><span class="token punctuation">)</span>
    <span class="token comment">// 检测resolve和reject</span>
    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">111</span><span class="token punctuation">)</span>
    <span class="token function">reject</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 使用promise的then方法</span>
promise<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iterator-generator" tabindex="-1"><a class="header-anchor" href="#iterator-generator" aria-hidden="true">#</a> Iterator-Generator</h2>
<h3 id="迭代器" tabindex="-1"><a class="header-anchor" href="#迭代器" aria-hidden="true">#</a> 迭代器</h3>
<p>迭代器（iterator），是确使用户可在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。</p>
<p>在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代协议（iterator protocol）：</p>
<ul>
<li>
<p>可迭代协议</p>
<ul>
<li><strong>可迭代协议</strong>允许 JavaScript 对象定义或定制它们的迭代行为，例如，在一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank" rel="noopener noreferrer"><code v-pre>for..of</code><ExternalLinkIcon/></a> 结构中，哪些值可以被遍历到。一些内置类型同时是<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%86%85%E7%BD%AE%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%AF%B9%E8%B1%A1" target="_blank" rel="noopener noreferrer">内置可迭代对象<ExternalLinkIcon/></a>，并且有默认的迭代行为，比如 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" target="_blank" rel="noopener noreferrer"><code v-pre>Array</code><ExternalLinkIcon/></a> 或者 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="noopener noreferrer"><code v-pre>Map</code><ExternalLinkIcon/></a>，而其他内置类型则不是（比如 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object" target="_blank" rel="noopener noreferrer"><code v-pre>Object</code><ExternalLinkIcon/></a>)）</li>
<li>要成为<strong>可迭代</strong>对象，一个对象必须实现 <strong>@@iterator</strong> 方法。这意味着对象（或者它<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain" target="_blank" rel="noopener noreferrer">原型链<ExternalLinkIcon/></a>上的某个对象）必须有一个键为 <code v-pre>@@iterator</code> 的属性，可通过常量 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator" target="_blank" rel="noopener noreferrer"><code v-pre>Symbol.iterator</code><ExternalLinkIcon/></a> 访问该属性</li>
<li>当一个对象需要被迭代的时候（比如被置入一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of" target="_blank" rel="noopener noreferrer"><code v-pre>for...of</code><ExternalLinkIcon/></a> 循环时），首先，会不带参数调用它的 <code v-pre>@@iterator</code> 方法，然后使用此方法返回的<strong>迭代器</strong>获得要迭代的值</li>
</ul>
</li>
<li>
<p>迭代器协议</p>
<ul>
<li><strong>迭代器协议</strong>定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。</li>
<li>只有实现了一个拥有以下语义（semantic）的 <strong>next()</strong> 方法，一个对象才能成为迭代器：</li>
</ul>
<ol>
<li>返回一个有下面两个属性的对象</li>
<li>done（对象1）：如果迭代器可以产生序列中的下一个值，则为 false。如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值</li>
<li>value（对象2）：迭代器返回的任何 JavaScript 值。done 为 true 时可省略</li>
</ol>
</li>
</ul>
<p>下面来简单实现一个迭代器：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 数组</span>
<span class="token keyword">const</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"123"</span><span class="token punctuation">,</span><span class="token string">"456"</span><span class="token punctuation">,</span><span class="token string">"789"</span><span class="token punctuation">]</span>
<span class="token comment">// 设置索引</span>
<span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">const</span> namneIterator <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// return {done: false,value: 123}</span>
        <span class="token comment">// return {done:false,value:456}</span>
        <span class="token comment">// return {done:false,value:789}</span>
        <span class="token comment">// return {done:true,value:undefined}</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> names<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token literal-property property">done</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span><span class="token literal-property property">value</span><span class="token operator">:</span> names<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token literal-property property">done</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token keyword">undefined</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    @@iterator：<span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    	<span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>	
<span class="token comment">// 相当于for循环遍历这个对象</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>namneIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>namneIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>namneIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>namneIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>namneIterator<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>迭代器的中断：</p>
<p>迭代器在某些情况下会在没有完全迭代完的情况下中断的，比如<code v-pre>break</code>，<code v-pre>return</code>，如果想要监听中断事件，可以在迭代器内部添加一个<code v-pre>return</code>方法，该方法和<code v-pre>next</code>同级</p>
</div>
<h3 id="生成器" tabindex="-1"><a class="header-anchor" href="#生成器" aria-hidden="true">#</a> 生成器</h3>
<p>虽然自定义的迭代器是一个很有用的工具，但是在创建时需要谨慎，因为需要显式地维护其内部状态，即自主设置next，return等符合协议的方法以及对象状态，这个时候生成器就孕育而生了，生成器提供了一个强大的选择：<strong>允许定义一个包含自由迭代算法的函数，即next函数，同时它还可以自动维护自己的状态</strong>。</p>
<p>生成器函数使用<code v-pre>function*</code>语法编写，最初调用时，生成器函数不执行任何代码，而是返回一种称为 Generator 的迭代器。通过调用生成器的下一个方法消耗值时，Generator 函数将执行，直到遇到 yield 关键字</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> names <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"123"</span><span class="token punctuation">,</span><span class="token string">"456"</span><span class="token punctuation">,</span><span class="token string">"789"</span><span class="token punctuation">]</span>

<span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">Generator</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">yield</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">Generator</span><span class="token punctuation">(</span>names<span class="token punctuation">)</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// {value: "123",done: "false"}</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// {value: "456",done: "false"}</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// {value: "789",done: "false"}</span>
a<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// {value: "underfined",done: "true"}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，我们也可以用生成器来设置参数来修改其内部状态，传递给next的值会被yield接收，需要注意的是，<strong>第一个next默认不接收参数，传入的参数会被忽略</strong></p>
<p>下面是一个斐波那契数列生成器例子：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> fn1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> fn2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> current <span class="token operator">=</span> fn1<span class="token punctuation">;</span>
    fn1 <span class="token operator">=</span> fn2<span class="token punctuation">;</span>
    fn2 <span class="token operator">=</span> current <span class="token operator">+</span> fn1<span class="token punctuation">;</span>
    <span class="token keyword">var</span> reset <span class="token operator">=</span> <span class="token keyword">yield</span> current<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>reset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fn1 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        fn2 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> sequence <span class="token operator">=</span> <span class="token function">fibonacci</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 2</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 5</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 8</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 1</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sequence<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="async-await" tabindex="-1"><a class="header-anchor" href="#async-await" aria-hidden="true">#</a> async/await</h2>
<p>async 函数是使用<code v-pre>async</code>关键字声明的函数。async 函数是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction" target="_blank" rel="noopener noreferrer"><code v-pre>AsyncFunction</code><ExternalLinkIcon/></a> 构造函数的实例，并且其中允许使用 <code v-pre>await</code> 关键字。<code v-pre>async</code> 和 <code v-pre>await</code> 关键字让我们可以用一种更简洁的方式写出基于 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer"><code v-pre>Promise</code><ExternalLinkIcon/></a> 的异步行为，而无需刻意地链式调用 <code v-pre>promise</code>，它诞生的目的就是为了简化使用基于<code v-pre>promise</code>的API时所需的语法</p>
<p>async 函数可能包含 0 个或者多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await" target="_blank" rel="noopener noreferrer"><code v-pre>await</code><ExternalLinkIcon/></a> 表达式。await 表达式会暂停整个 async 函数的执行进程并出让其控制权，只有当其等待的基于 promise 的异步操作被兑现或被拒绝之后才会恢复进程。promise 的解决值会被当作该 await 表达式的返回值。使用 <code v-pre>async</code>/<code v-pre>await</code> 关键字就可以在异步代码中使用普通的 <code v-pre>try</code>/<code v-pre>catch</code> 代码块</p>
<p>我们可以简单利用<a href="https://babel.docschina.org/" target="_blank" rel="noopener noreferrer">babel.js<ExternalLinkIcon/></a>将<code v-pre>async</code>和<code v-pre>await</code>转换成ES5的语法，看看源码里是如何实现这个语法糖的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token number">1</span>
  <span class="token keyword">await</span> <span class="token number">2</span>
  <span class="token keyword">await</span> <span class="token number">3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">_foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">_foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  _foo <span class="token operator">=</span> <span class="token function">_asyncToGenerator</span><span class="token punctuation">(</span> <span class="token comment">/*#__PURE__*/</span><span class="token function">_regeneratorRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">mark</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">_callee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">_regeneratorRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">wrap</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">_callee$</span><span class="token punctuation">(</span><span class="token parameter">_context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>_context<span class="token punctuation">.</span>prev <span class="token operator">=</span> _context<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// await对应的语句</span>
          <span class="token keyword">case</span> <span class="token number">0</span><span class="token operator">:</span>
            _context<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">2</span><span class="token operator">:</span>
            _context<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">4</span><span class="token operator">:</span>
            _context<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span>
          <span class="token keyword">case</span> <span class="token number">6</span><span class="token operator">:</span>
          <span class="token keyword">case</span> <span class="token string">"end"</span><span class="token operator">:</span>
            <span class="token keyword">return</span> _context<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> _callee<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">_foo</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>async</code>实际上就是二次封装了<code v-pre>Generator</code>，利用异步的生成器，通过<code v-pre>next</code>的方式来实现类似排队的操作</p>
<h2 id="js中的事件循环" tabindex="-1"><a class="header-anchor" href="#js中的事件循环" aria-hidden="true">#</a> JS中的事件循环</h2>
<p>JavaScript 有一个基于<strong>事件循环</strong>的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。这个模型与其它语言中的模型截然不同，比如 C 和 Java</p>
<p>JavaScript代码在执行过程中，除了依靠函数调用栈来决定函数的执行顺序外，还依靠了任务队列（<code v-pre>task queue</code>）来搞定异步代码的执行，这整个执行过程称为事件循环。在事件循环期间，运行时最先进入队列的任务会优先执行，被执行完的消息会被移出队列，并作为输入参数来调用与之关联的函数，每次事件循环完都会检查是否还有任务，如果有则继续下一轮，无则结束循环</p>
<p><img src="/images/js/1.svg" alt="JS事件循环"></p>
<p>一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs</p>
<table>
<thead>
<tr>
<th>macro-task(宏任务)</th>
<th>micor-task(微任务)</th>
</tr>
</thead>
<tbody>
<tr>
<td>script(整体代码)</td>
<td>process.nextTick</td>
</tr>
<tr>
<td>setTimeout</td>
<td>Promise</td>
</tr>
<tr>
<td>setInterval</td>
<td>Async/Await(实际就是promise)</td>
</tr>
<tr>
<td>setImmediate</td>
<td>MutationObserver(html5新特性)</td>
</tr>
<tr>
<td>I/O</td>
<td></td>
</tr>
<tr>
<td>UI render</td>
<td></td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>以 0 为第二参数调用 <code v-pre>setTimeout</code> 并不表示在 0 毫秒后就立即调用回调函数，其等待的时间取决于队列里待处理的消息数量，也就是说同样的一个setTimeout（不设置第二参数）可能优先级会比以0为第二参数的setTimeout高</p>
</div>
<p>JavaScript 的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它永不阻塞。处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API" target="_blank" rel="noopener noreferrer">IndexedDB<ExternalLinkIcon/></a> 查询返回或者一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" target="_blank" rel="noopener noreferrer">XHR<ExternalLinkIcon/></a> 请求返回时，它仍然可以处理其它事情，比如用户输入</p>
<h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h2>
<p>了解路由前，我们需要先了解什么是SPA</p>
<p><strong>SPA</strong>，即<strong>单页面应用</strong>(Single Page Application)。所谓单页 <code v-pre>Web</code> 应用，就是只有一张 <code v-pre>Web</code> 页面的应用。单页应用程序 (SPA) 是加载单个 <code v-pre>HTML</code> 页面并在<strong>用户与应用程序交互时</strong>动态更新该页面的 <code v-pre>Web</code> 应用程序。浏览器一开始会加载必需的 <code v-pre>HTML</code> 、 <code v-pre>CSS</code> 和 <code v-pre>JavaScript</code> ，所有的操作都在这张页面上完成，都由 <code v-pre>JavaScript</code> 来控制</p>
<p>在单页面中要实现无感刷新跳转和交互，这就是前端路由的诞生的目的，最早是和<code v-pre>Ajax</code>配合使用的，后来随着技术的更新迭代，浏览器更新了自带的路由API后，就成为了如今的前端路由</p>
<p>如今的路由一般有两种模式：<code v-pre>hash</code>和<code v-pre>history</code></p>
<h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> hash</h3>
<p>Hash的特点：</p>
<ul>
<li>hash变化会触发网页跳转，即浏览器的前进和后退。</li>
<li><code v-pre>hash</code> 可以改变 <code v-pre>url</code> ，但是不会触发页面重新加载（hash的改变是记录在 <code v-pre>window.history</code> 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 <code v-pre>http</code> 请求，所以这种模式不利于 <code v-pre>SEO</code> 优化。<code v-pre>hash</code> 只能修改 <code v-pre>#</code> 后面的部分，所以只能跳转到与当前 <code v-pre>url</code> 同文档的 <code v-pre>url</code></li>
<li><code v-pre>hash</code> 通过 <code v-pre>window.onhashchange</code> 的方式，来监听 <code v-pre>hash</code> 的改变，借此实现无刷新跳转的功能</li>
<li><code v-pre>hash</code> 永远不会提交到 <code v-pre>server</code> 端（可以理解为只在前端自生自灭）</li>
</ul>
<p>利用浏览器提供的API简单实现一个hash路由：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>// 实现简单的hash路由
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#/home<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>#/about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>关于<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>router-view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token keyword">const</span> routerView <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"router-view"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"hashchange"</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">"#/home"</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"首页"</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">"#/about"</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"关于"</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">""</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="history" tabindex="-1"><a class="header-anchor" href="#history" aria-hidden="true">#</a> history</h3>
<p>History的特点：</p>
<ul>
<li>新的 <code v-pre>url</code> 可以是与当前 <code v-pre>url</code> 同源的任意 <code v-pre>url</code> ，也可以是与当前 <code v-pre>url</code> 一样的地址，但是这样会导致的一个问题是，会把<strong>重复的这一次操作</strong>记录到栈当中</li>
<li>通过 <code v-pre>history.state</code> ，添加任意类型的数据到记录中。</li>
<li>可以额外设置 <code v-pre>title</code> 属性，以便后续使用。</li>
<li>通过 <code v-pre>pushState</code> 、 <code v-pre>replaceState</code> 来实现无刷新跳转的功能</li>
</ul>
<p>利用浏览器提供的API简单实现一个history路由：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>// 实现history路由
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>app<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/home<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>首页<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/about<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>关于<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>

        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>router-view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
        <span class="token comment">// 获取routerview的DOM</span>
        <span class="token keyword">const</span> routerView <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByClassName</span><span class="token punctuation">(</span><span class="token string">"router-view"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

        <span class="token comment">// 获取所有的a元素，自行监听a元素的改变</span>
        <span class="token keyword">const</span> aEls <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> el <span class="token keyword">of</span> aEls<span class="token punctuation">)</span><span class="token punctuation">{</span>
            el<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span><span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 阻止事件的原生绑定事件</span>
                e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"a元素发生了点击"</span><span class="token punctuation">)</span>
                <span class="token comment">// 动态获取a元素上的href属性</span>
                <span class="token keyword">const</span> href <span class="token operator">=</span> el<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"href"</span><span class="token punctuation">)</span>
                <span class="token comment">// 第三个参数就是改变的url，且整个过程页面没有刷新</span>
                history<span class="token punctuation">.</span><span class="token function">pushState</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">""</span><span class="token punctuation">,</span>href<span class="token punctuation">)</span>
                <span class="token function">UrlChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 执行返回操作时，依然调用UrlChange</span>
        <span class="token comment">// go 和 pushState不能通过该方法监听到</span>
        window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"popstate"</span><span class="token punctuation">,</span>UrlChange<span class="token punctuation">)</span>

        <span class="token comment">// 监听url的改变</span>
        <span class="token keyword">function</span> <span class="token function">UrlChange</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>pathname<span class="token punctuation">)</span>
            <span class="token keyword">switch</span><span class="token punctuation">(</span>location<span class="token punctuation">.</span>pathname<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token string">"/home"</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"首页"</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">case</span> <span class="token string">"/about"</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">"关于"</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token keyword">default</span><span class="token operator">:</span>
                    routerView<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token string">""</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于 <code v-pre>history</code> 来说，确实解决了不少 <code v-pre>hash</code> 存在的问题，但是也带来了新的问题。<strong>具体如下：</strong></p>
<ul>
<li>使用 <code v-pre>history</code> 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 <code v-pre>nginx</code> 没有匹配得到当前的 <code v-pre>url</code> ，就会出现 <code v-pre>404</code> 的页面。</li>
<li>而对于 <code v-pre>hash</code> 模式来说，  它虽然看着是改变了 <code v-pre>url</code> ，但不会被包括在 <code v-pre>http</code> 请求中。所以，它算是被用来指导浏览器的动作，并不影响服务器端。因此，改变 <code v-pre>hash</code> 并没有真正地改变 <code v-pre>url</code> ，所以页面路径还是之前的路径， <code v-pre>nginx</code> 也就不会拦截。</li>
<li>因此，在使用 <code v-pre>history</code> 模式时，需要<strong>通过服务端来允许地址可访问</strong>，如果没有设置，就很容易导致出现 <code v-pre>404</code> 的局面</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code v-pre>to B</code> 的系统推荐用 <code v-pre>hash</code> ，相对简单且容易使用，且因为 <code v-pre>hash</code> 对 <code v-pre>url</code> 规范不敏感。<code v-pre>to C</code> 的系统，可以考虑选择 <code v-pre>H5 history</code> ，但是需<strong>要服务端支持</strong>；能先用简单的，就别用复杂的，<strong>要考虑成本和收益</strong>。</p>
</div>
<h2 id="懒加载-预加载" tabindex="-1"><a class="header-anchor" href="#懒加载-预加载" aria-hidden="true">#</a> 懒加载/预加载</h2>
<p><strong>懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式</strong>。用户滚动到它们之前，可视区域外的图像不会加载。资源预加载是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。<strong>预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源</strong></p>
<p>懒加载原理：</p>
<p>首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中， 当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。</p>
<h2 id="防抖-节流" tabindex="-1"><a class="header-anchor" href="#防抖-节流" aria-hidden="true">#</a> 防抖/节流</h2>
<p>防抖（Debounce）和节流（Throttle）都是用来控制某个函数在一定时间内触发次数，两者都是为了减少触发频率，以便提高性能或者说避免资源浪费。毕竟JS操作DOM对象的代价还是十分昂贵的</p>
<p>应用场景：处理一些频繁触发的事件，例如mousedown、mousemove、keyup、keydown等，不然的话，页面很可能会十分卡顿哦~</p>
<p>防抖就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  			<span class="token comment">//开始</span>
  			<span class="token keyword">let</span> timerId <span class="token operator">=</span> <span class="token keyword">null</span>
  			<span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  				<span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">this</span>
                <span class="token keyword">const</span> args <span class="token operator">=</span> arguments
                <span class="token comment">//判断是否有定时器在执行，有就清空</span>
  				<span class="token keyword">if</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span><span class="token punctuation">{</span>
  					<span class="token comment">//在接收到指令的情况下重新计算函数执行时间</span>
  					window<span class="token punctuation">.</span><span class="token function">clearTimeout</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span>
  				<span class="token punctuation">}</span>
  				<span class="token comment">//没有接收到指令，派发事件，时间自定义</span>
  				timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  					<span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span>args<span class="token punctuation">)</span>
  					timerId <span class="token operator">=</span> <span class="token keyword">null</span>
  				<span class="token punctuation">}</span><span class="token punctuation">,</span>delay<span class="token punctuation">)</span>
  			<span class="token punctuation">}</span> 
		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>频繁操作点赞和取消点赞，因此需要获取最后一次操作结果并发送给服务器；search搜索联想，用户在不断输入值时…</p>
</div>
<p>节流就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">throttle</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span>delay</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  			<span class="token comment">//定义开关</span>
  			<span class="token keyword">let</span> canUse <span class="token operator">=</span> <span class="token boolean">true</span>
  		
  			<span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  				<span class="token keyword">if</span><span class="token punctuation">(</span>canUse<span class="token punctuation">)</span><span class="token punctuation">{</span>
  					<span class="token comment">//关闭开关</span>
  					canUse <span class="token operator">=</span> <span class="token boolean">false</span>
  					<span class="token comment">//定时打开开关，时间自定义</span>
  					<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                        <span class="token comment">//触发事件</span>
                        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        canUse<span class="token operator">=</span><span class="token boolean">true</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>delay<span class="token punctuation">)</span>
  				<span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                      <span class="token keyword">return</span> <span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
  			<span class="token punctuation">}</span>
			
  		<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>一般是onrize，onscroll等这些频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作；鼠标不断点击触发，mousedown(单位时间内只触发一次)…</p>
</div>
<h2 id="深拷贝-浅拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝-浅拷贝" aria-hidden="true">#</a> 深拷贝/浅拷贝</h2>
<p>深拷贝和浅拷贝实际上就是引用对象的不同形式，因为一个变量名可以是指针，这就意味着两个不同的变量可能所指的内存地址是相同的。如果我们想要拷贝一个完全一样内容的值但内存地址不一样，那这种拷贝就叫做<strong>深拷贝</strong>，而不同指针对应相同内存地址的拷贝则叫<strong>浅拷贝</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 深拷贝JSON快速实现</span>
<span class="token keyword">const</span> deepObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 递归算法实现深拷贝</span>
<span class="token keyword">function</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">//创建一个新的对象</span>
			<span class="token keyword">var</span> newObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
			<span class="token comment">//遍历循环obj中所有的属性</span>
			<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> key <span class="token keyword">in</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
				<span class="token comment">//检查对象中是否含有该属性</span>
				<span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">==</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
					<span class="token comment">//instanceof运算符用来判断一个构造函数的prototype属性所指向的对象</span>
					<span class="token comment">//是否存在另外一个要检测对象的原型链上</span>
					
					console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
					<span class="token comment">//判断属性值是否为对象,如果是则递归，如果不是则将属性值赋值给新对象</span>
					<span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token keyword">instanceof</span> <span class="token class-name">Object</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
						newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">deepCopy</span><span class="token punctuation">(</span>obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">else</span><span class="token punctuation">{</span>
						newObj<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> obj<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> newObj<span class="token punctuation">;</span>
		<span class="token punctuation">}</span>

<span class="token comment">// 浅拷贝</span>
<span class="token keyword">const</span> obj3 <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>从服务器fetch到数据之后将其存放在store中，通过props传递给界面，然后我需要对这堆数据进行修改，那涉及到的修改就一定有保存和取消，所以我们需要将这堆数据拷贝到其它地方。</li>
<li>当你想使用某个对象的值，在修改时不想修改原对象，那么可以用深拷贝弄一个新的内存对象</li>
</ul>
</div>
<h2 id="js额外知识" tabindex="-1"><a class="header-anchor" href="#js额外知识" aria-hidden="true">#</a> js额外知识</h2>
<h3 id="严格模式" tabindex="-1"><a class="header-anchor" href="#严格模式" aria-hidden="true">#</a> 严格模式</h3>
<p>Javascript提供了一种具有限制性的模式来使代码隐式地脱离&quot;懒散（sloppy）模式&quot;，支持严格模式的浏览器在检测代码中有严格模式时，会以更加严格的方式对代码进行检测和执行，任何不符合规范写法的代码警告都会被浏览器提交到控制台</p>
<p>严格模式通过 <strong>抛出错误</strong> 来消除一些原有的 静默（silent）错误，同时严格模式让JS引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token string">"use strict"</span>

<span class="token keyword">var</span> message <span class="token operator">=</span> <span class="token string">"hello world"</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span>
<span class="token comment">// 静默错误</span>
<span class="token boolean">true</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">"abc"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应式原理-vue2" tabindex="-1"><a class="header-anchor" href="#响应式原理-vue2" aria-hidden="true">#</a> 响应式原理（Vue2）</h3>
<p>说起响应式原理，那肯定要说到Vue框架，该框架最著名的就是它的响应式系统，它能够在组件中自动跟踪变量的变化，是不是很神奇，那我们来看看响应式是如何实现的</p>
<p>响应式其实就是当我们定义了一个变量，当受到某些回调函数触发而改动时，我们希望与该变量绑定的事件也重新执行，就是说在哪里用到这个变量，就执行哪部分的代码，这样就可以不需要我们再手动进行更新，而是通过响应式来帮助我们自动更新</p>
<p>Vue2中的响应式其实就是前面所学的存取描述符，通过重写Get和Set来帮助我们完成操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 保存当前需要收集的响应式函数</span>
<span class="token comment">// 注意如果没有操作执行的话全局的activeReactiveFn应该为null</span>
<span class="token comment">// 这样这个函数收集体就会被垃圾回收GC回收掉，是一个虚拟对象</span>
<span class="token keyword">let</span> activeReactiveFn <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token comment">// 定义一个Depend类来收集依赖</span>
<span class="token keyword">class</span> <span class="token class-name">Depend</span><span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 不使用[]的原因是因为在依赖函数中如果调用多次请求同一个对象的属性，则会调用多次</span>
        <span class="token comment">// Set则不会重复元素的添加，这样函数在多次请求同一个对象的属性时就只会执行一次</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reactiveFns <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>    
    <span class="token punctuation">}</span>

    <span class="token comment">// notify主要是用来获取reactiveFns中要执行的响应式函数再执行</span>
    <span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>reactiveFns<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">fn</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 给depend对象中添加响应函数</span>
    <span class="token comment">// 当activeReactiveFn存在收集到的函数，就将该函数添加到reactiveFns集合中</span>
    <span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>activeReactiveFn<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>reactiveFns<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>activeReactiveFn<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 封装一个获取depend函数</span>
<span class="token comment">// 创建一个WeakMap对象用来收集函数与对象的映射关系</span>
<span class="token keyword">const</span> targetMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">WeakMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">function</span> <span class="token function">getDepend</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> map <span class="token operator">=</span> targetMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>map<span class="token punctuation">)</span><span class="token punctuation">{</span>
        map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        targetMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>map<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 根据key获取depend对象</span>
    <span class="token keyword">const</span> depend <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>depend<span class="token punctuation">)</span><span class="token punctuation">{</span>
        depend <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span>depend<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> depend
<span class="token punctuation">}</span>

<span class="token comment">// 封装一个响应式函数</span>
<span class="token comment">// 这个函数主要是用来收集要执行的函数，然后赋值给activeReactiveFn，再执行函数体</span>
<span class="token comment">// 每收集完一次最后收集完要清空activeReactiveFn以便做下一次收集</span>
<span class="token keyword">function</span> <span class="token function">watchFn</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    activeReactiveFn <span class="token operator">=</span> fn
    <span class="token comment">// 当fn执行的时候，在执行的过程中就是在访问对象中的get方法，此时会将该方法体添加到集合reactiveFns中</span>
    <span class="token comment">// 最后get方法会返回通过Reflect的get方法得到的对应原函数中的值</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    activeReactiveFn <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 设置需要响应式的函数并关联到对应的依赖中</span>
<span class="token function">watchFn</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>name<span class="token punctuation">,</span><span class="token string">"获取第一个对象的name"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">watchFn</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>age<span class="token punctuation">,</span><span class="token string">"获取第一个对象的age"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">watchFn</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">.</span>name<span class="token punctuation">,</span><span class="token string">"获取第二个对象的name"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">watchFn</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj2<span class="token punctuation">.</span>age<span class="token punctuation">,</span><span class="token string">"获取第二个对象的age"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)</span>
    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">key</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>key<span class="token punctuation">,</span><span class="token punctuation">{</span>
            <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">const</span> depend <span class="token operator">=</span> <span class="token function">getDepend</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
                depend<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> value
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                value <span class="token operator">=</span> newValue
                <span class="token keyword">const</span> depend <span class="token operator">=</span> <span class="token function">getDepend</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span>value<span class="token punctuation">)</span>
                depend<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 对象的响应式</span>
<span class="token comment">// 创建一个对象，这个对象是作为reactive函数的参数传进去的</span>
<span class="token comment">// 而这个reactive函数就是通过Proxy来监听对象的一个函数</span>
<span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'lyf'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'aaa'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">222</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 触发响应式系统</span>
obj1<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'aaa'</span>
obj2<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">'lyf'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Vue2的原理中响应式是使用的<code v-pre>Object.defineProperty</code>这个API，但是该API是具有缺陷的，监听嵌套层级过深的对象会极大的影响性能，没错，这个就是Vue2中数组的缺陷，不是监听不到数组，而是出于性能考虑，没用通过它来实现数组响应式，所以官方是修改了原生数组的方法，并且提供了API去完善这一缺点，其次，存取器只能对自身存在的属性修改才会去劫持，所以对象新增和删除的属性无法监听，官方也对应提供了新的方法来弥补API的缺陷</p>
</div>
<h3 id="响应式原理-vue3" tabindex="-1"><a class="header-anchor" href="#响应式原理-vue3" aria-hidden="true">#</a> 响应式原理（Vue3）</h3>
<p>在上文Vue2响应式的学习中，如果已经开始工作的小伙伴肯定会发现Vue2中所谓的响应式并不是完美的，而是存在一定缺陷的，导致这种结果的根本是出在<code v-pre>Object.defineProperty</code>API上，那么，我们可以来想一想，要实现响应式，我们该如何去监听呢？</p>
<p>官方提供了一个新的JS内置对象来弥补甚至是代替原来ObjectAPI上的缺陷，之前学的Proxy就是用来代替该API的，<strong>Proxy</strong> 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）</p>
<p>proxy上的捕获器有整整13种，下面来简单看一下Proxy的捕获器</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 原来的监听对象的操作是对原来的对象进行操作，但是我们监听理论上是不应该去修改原来的对象的</span>
<span class="token comment">// Proxy类中可以创建一个Proxy代理对象，这个时候就能想在原来对象上进行的监听统一在代理对象上实现</span>
<span class="token comment">// 代理对象可以监听我们想要对原来对象进行的操作</span>

<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"lyf"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 第一个参数是想要代理的原对象</span>
<span class="token comment">// 第二个参数是捕获器参数,一共有13个捕获器</span>
<span class="token keyword">const</span> objProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token punctuation">{</span>
    <span class="token comment">// 获取值时的捕获器</span>
    <span class="token comment">// target是原来的obj对象，key是原对象中的属性</span>
    <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 设置值的捕获器</span>
    <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> newValue
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 监听in的捕获器</span>
    <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> key <span class="token keyword">in</span> target
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token comment">// 监听delete的捕获器</span>
    <span class="token function-variable function">deleteProperty</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">delete</span> target<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objProxy<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>objProxy<span class="token punctuation">.</span>age<span class="token punctuation">)</span>

objProxy<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">"aaa"</span>
objProxy<span class="token punctuation">.</span>age <span class="token operator">=</span> <span class="token number">22</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>age<span class="token punctuation">)</span>

<span class="token comment">// in操作符</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"name"</span> <span class="token keyword">in</span> objProxy<span class="token punctuation">)</span>

<span class="token comment">// delete操作</span>
<span class="token keyword">delete</span> objProxy<span class="token punctuation">.</span>age
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个新的API，就能够弥补Vue2中的缺陷，让我们来重写Vue响应式中的<code v-pre>reactive</code>方法吧</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token parameter">obj</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)</span>
    <span class="token keyword">const</span> objProxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span><span class="token punctuation">{</span>
        <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 根据target和key获取对应的depend</span>
            <span class="token keyword">const</span> depend <span class="token operator">=</span> <span class="token function">getDepend</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span>
            
            <span class="token comment">// 执行依赖中的depend方法来将要执行的函数添加到reactiveFns</span>
            <span class="token comment">// 注意，在get方法中不会调用响应式函数，就是不会执行notify函数</span>
            depend<span class="token punctuation">.</span><span class="token function">depend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span>
            <span class="token keyword">return</span> Reflect<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue<span class="token punctuation">,</span>receiver</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            Reflect<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">,</span>newValue<span class="token punctuation">,</span>receiver<span class="token punctuation">)</span>
            <span class="token comment">// 根据target和key获取对应的depend</span>
            <span class="token keyword">const</span> depend <span class="token operator">=</span> <span class="token function">getDepend</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span>key<span class="token punctuation">)</span>

            <span class="token comment">// 执行依赖中收集到的notify函数并执行</span>
            depend<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>这就是Vue3的响应式原理，在收集依赖和依赖的设置基本上都相同，当然源码肯定会比我手写的复杂的多，当前代码仅供学习参考</p>
</div>
</div></template>


