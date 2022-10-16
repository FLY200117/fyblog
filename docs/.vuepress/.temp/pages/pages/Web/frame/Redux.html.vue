<template><div><h1 id="redux基础" tabindex="-1"><a class="header-anchor" href="#redux基础" aria-hidden="true">#</a> Redux基础</h1>
<h2 id="纯函数" tabindex="-1"><a class="header-anchor" href="#纯函数" aria-hidden="true">#</a> 纯函数</h2>
<ul>
<li>在函数式编程中有一个概念叫做纯函数，指此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。</li>
<li>具体的纯函数介绍可以看<strong>高级JS</strong></li>
<li>纯函数在函数式编程中是十分重要的，我们在使用纯函数的时候就不需要考虑副作用等影响，React中要求无论是纯函数还是class声明组件，这个组件都需要像纯函数一样，保护他们的props不被随意修改，而Redux中也是如此</li>
</ul>
<h2 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> Store</h2>
<ul>
<li>当我们编写组件的时候，无论是复用数据还是内部数据，当需要管理的状态越来越多的时候，一个组件内部的代码块会变得非常臃肿，包括请求数据，缓存等等，管理不断变化的state是非常困难的，因为状态之间可能存在相互依赖，当变得复杂的时候是很难对state进行跟踪和控制的</li>
<li>React中主要是负责帮助管理视图，而不是去维护state，所以Redux的概念就出现了，Redux就是一个帮助我们管理State的容器，提供了可预测的状态管理</li>
<li>Redux提供的核心理念Store就很好地帮我们对数据进行了一个统一的管理</li>
<li>当然，Store的设置可以是全局的，也可以是某个页面独立的Store</li>
</ul>
<h2 id="action" tabindex="-1"><a class="header-anchor" href="#action" aria-hidden="true">#</a> Action</h2>
<ul>
<li>Redux要求通过action来更新数据，所有数据的变化，必须通过派发（dispatch）action来更新</li>
<li>action是一个普通的JavaScript对象，用来描述这次更新的type和content</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">changeNewRankingAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_NEW_RANKING</span><span class="token punctuation">,</span>
    <span class="token literal-property property">newRanking</span><span class="token operator">:</span>  res<span class="token punctuation">.</span>playlist
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">changeOriginRankingAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_ORIGIN_RANKING</span><span class="token punctuation">,</span>
    <span class="token literal-property property">originRanking</span><span class="token operator">:</span>  res<span class="token punctuation">.</span>playlist
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getNewAlbumsAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">limit</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token parameter">dispatch</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">getNewAlbums</span><span class="token punctuation">(</span>limit<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeNewAlbumAction</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">getTopListAction</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token parameter">dispatch</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">getPlaylist</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">case</span> <span class="token constant">RECOMMEND_RANKING</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator">:</span>
                    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeUpRankingAction</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span>
                <span class="token keyword">case</span> <span class="token constant">RECOMMEND_RANKING</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator">:</span>
                    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeNewRankingAction</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span>
                <span class="token keyword">case</span> <span class="token constant">RECOMMEND_RANKING</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token operator">:</span>
                    <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeOriginRankingAction</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">break</span>
                <span class="token keyword">default</span><span class="token operator">:</span>    
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reducer" tabindex="-1"><a class="header-anchor" href="#reducer" aria-hidden="true">#</a> reducer</h2>
<ul>
<li>state和action联系起来，就需要通过reducer</li>
<li>reducer是一个纯函数，reducer实际上就是将传入的state和action结合起来生成一个新的state</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> defaultState <span class="token operator">=</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">topBanners</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">hotRecommends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">newAlbums</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">upRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">newRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">originRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">reducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> defaultState<span class="token punctuation">,</span>action</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">switch</span><span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_TOP_BANNERS</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"topBanners"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>topBanners<span class="token punctuation">)</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_HOT_RECOMMEND</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"hotRecommends"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>hotRecommends<span class="token punctuation">)</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_NEW_ALBUM</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"newAlbums"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>newAlbums<span class="token punctuation">)</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_UP_RANKING</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"upRanking"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>upRanking<span class="token punctuation">)</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_NEW_RANKING</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"newRanking"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>newRanking<span class="token punctuation">)</span>
        <span class="token keyword">case</span> actionTypes<span class="token punctuation">.</span><span class="token constant">CHANGE_ORIGIN_RANKING</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"originRanking"</span><span class="token punctuation">,</span>action<span class="token punctuation">.</span>originRanking<span class="token punctuation">)</span>
        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">return</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> reducer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redux三大原则" tabindex="-1"><a class="header-anchor" href="#redux三大原则" aria-hidden="true">#</a> Redux三大原则</h2>
<h3 id="单一数据源" tabindex="-1"><a class="header-anchor" href="#单一数据源" aria-hidden="true">#</a> 单一数据源</h3>
<ul>
<li>整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中</li>
<li>Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护</li>
<li>单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改</li>
</ul>
<h3 id="state只读" tabindex="-1"><a class="header-anchor" href="#state只读" aria-hidden="true">#</a> State只读</h3>
<ul>
<li>唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State</li>
<li>这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state</li>
<li>这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题</li>
</ul>
<h3 id="使用纯函数来执行修改" tabindex="-1"><a class="header-anchor" href="#使用纯函数来执行修改" aria-hidden="true">#</a> 使用纯函数来执行修改</h3>
<ul>
<li>通过reducer将 旧state和 actions联系在一起，并且返回一个新的State</li>
<li>随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分</li>
<li>所有的reducer都应该是纯函数，不能产生任何的副作用</li>
</ul>
<h2 id="合并reducer" tabindex="-1"><a class="header-anchor" href="#合并reducer" aria-hidden="true">#</a> 合并reducer</h2>
<ul>
<li>当我们给多个页面设置了单独的store时，这个时候就需要将不同页面中的reducer合并，让数据成为一棵树结构，这样有利于我们维护以及追踪数据</li>
<li>redux有提供combineReducersAPI来合并reducers</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'redux-immutable'</span> 

<span class="token keyword">import</span> <span class="token punctuation">{</span> reducer <span class="token keyword">as</span> recommendReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../pages/discover/child-pages/recommend/store'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reducer <span class="token keyword">as</span> playerReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../pages/player/store/'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> TotalReducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">recommend</span><span class="token operator">:</span> recommendReducer<span class="token punctuation">,</span>
    <span class="token literal-property property">player</span><span class="token operator">:</span> playerReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> TotalReducer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h2>
<ul>
<li>当我们封装好了reducer，会发现有一个致命的缺点，我们必须将网络请求的异步代码放到组件的生命周期中完成，但是实际上网络请求到的数据也属于状态管理的一部分，最好的方法就是将其交给redux来管理，但redux是如何处理异步代码的呢？</li>
<li>redux允许使用中间件<strong>Middleware</strong>来进行异步操作</li>
<li>Middleware可以在请求和响应之间嵌入一些操作的代码，比如cookie解析、日志记录、文件压缩等操作</li>
<li>中间件的目的是在dispatch的action和最终达到的reducer之间，扩展一些独立的代码</li>
<li>官方推荐的中间件是使用redux-thunk，当然redux-saga中间间也是一个比较在redux中常用的中间件</li>
<li>redux-thunk可以让dispatch(action函数)，action可以是一个函数，该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数</li>
<li>当我们获取到dispatch和getState函数的时候，就可以派发action和获取原来的状态</li>
<li></li>
</ul>
<h2 id="合并中间件" tabindex="-1"><a class="header-anchor" href="#合并中间件" aria-hidden="true">#</a> 合并中间件</h2>
<ul>
<li>redux有提供<strong>applyMiddleware</strong>API来帮助我们合并中间件</li>
<li>这样我们只需要将合并的总reducers传进去，再合并中间件</li>
<li><code v-pre>compose</code>函数是Redux暴露出来唯一一个能单独使用的API，本质是函数式编程的组合函数</li>
<li><code v-pre>compose</code> 函数做的事就是把 <code v-pre>var a = fn1(fn2(fn3(fn4(x))))</code> 这种嵌套的调用方式改成 <code v-pre>var a = compose(fn1,fn2,fn3,fn4)(x)</code> 的方式调用。</li>
<li>合并中间件就是利用了compose函数来进行合并的，redux实际上是用的数组中的<code v-pre>reduce</code>方法，具体可以查看<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore<span class="token punctuation">,</span>applyMiddleware<span class="token punctuation">,</span>compose <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'redux'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> thunk <span class="token keyword">from</span> <span class="token string">'redux-thunk'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> reducers <span class="token keyword">from</span> <span class="token string">'./reducer'</span>

<span class="token keyword">const</span> composeEnhancers <span class="token operator">=</span> window<span class="token punctuation">.</span>__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ <span class="token operator">||</span> compose<span class="token punctuation">;</span>


<span class="token comment">// configureStore代替了createStore</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducers<span class="token punctuation">,</span><span class="token function">composeEnhancers</span><span class="token punctuation">(</span>
    <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>thunk<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hooks中api实现获取reducer中的数据" tabindex="-1"><a class="header-anchor" href="#hooks中api实现获取reducer中的数据" aria-hidden="true">#</a> Hooks中API实现获取reducer中的数据</h2>
<ul>
<li>redux中提供了对应Hooks中的useSelectorAPI来在组件内部获取reducer中的数据，通过解构可以获取reducer中的state</li>
<li>shallowEqual主要是Hooks对State提供的性能优化API，通常给useSelector的第二个参数</li>
</ul>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const { hotRecommends } = useSelector(state =&gt; ({
        hotRecommends: state.getIn([&quot;recommend&quot;,&quot;hotRecommends&quot;])
    }),shallowEqual)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hooks中api实现dispatch" tabindex="-1"><a class="header-anchor" href="#hooks中api实现dispatch" aria-hidden="true">#</a> Hooks中API实现Dispatch</h2>
<ul>
<li>redux中提供了对应Hooks中的useDispatchAPI来帮我们完成dispatch的创建，这样只需要在uesEffect中派发事件即可</li>
<li>注意，useEffect中的依赖项应该时dispatch对象</li>
</ul>
<div class="language-react ext-react line-numbers-mode"><pre v-pre class="language-react"><code>const dispatch = useDispatch();

    useEffect(() =&gt; {
        dispatch(getHotRecommendsAction(HOT_RECOMMEND_LIMIT))
    },[dispatch])
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="immutable" tabindex="-1"><a class="header-anchor" href="#immutable" aria-hidden="true">#</a> Immutable</h2>
<ul>
<li>在React开发中，React强调数据的不可变性，当数据需要发生改变的时候，不应该使用原来的数据进行操作，而是创建一个新的<strong>临时数据</strong>覆盖原来的数据</li>
<li>浅拷贝（object.assign）可以解决上述的问题，但是浅拷贝在面对庞大的数据时，这种方式会造成性能问题和内存浪费</li>
<li>为了解决上述概念，提出了新的算法Persistent Data Structure（持久化数据结构或一致性数据结构）</li>
<li>ImmutableJS第三方库可以帮助我们快速实现上述算法，提供了一系列API用来转换数据</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 合并reducer文件中</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'redux-immutable'</span> 

<span class="token keyword">import</span> <span class="token punctuation">{</span> reducer <span class="token keyword">as</span> recommendReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../pages/discover/child-pages/recommend/store'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> reducer <span class="token keyword">as</span> playerReducer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'../pages/player/store/'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> TotalReducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">recommend</span><span class="token operator">:</span> recommendReducer<span class="token punctuation">,</span>
    <span class="token literal-property property">player</span><span class="token operator">:</span> playerReducer<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> TotalReducer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 某个reducer文件中</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Map <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'immutable'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> defaultState <span class="token operator">=</span> <span class="token function">Map</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">topBanners</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">hotRecommends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">newAlbums</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">upRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">newRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">originRanking</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


