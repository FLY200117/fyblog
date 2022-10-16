# Redux基础

## 纯函数

+ 在函数式编程中有一个概念叫做纯函数，指此函数在相同的输入值时，需产生相同的输出。函数的输出和输入值以外的其他隐藏信息或状态无关，也和由I/O设备产生的外部输出无关。 
+ 具体的纯函数介绍可以看**高级JS**
+ 纯函数在函数式编程中是十分重要的，我们在使用纯函数的时候就不需要考虑副作用等影响，React中要求无论是纯函数还是class声明组件，这个组件都需要像纯函数一样，保护他们的props不被随意修改，而Redux中也是如此



## Store

+ 当我们编写组件的时候，无论是复用数据还是内部数据，当需要管理的状态越来越多的时候，一个组件内部的代码块会变得非常臃肿，包括请求数据，缓存等等，管理不断变化的state是非常困难的，因为状态之间可能存在相互依赖，当变得复杂的时候是很难对state进行跟踪和控制的
+ React中主要是负责帮助管理视图，而不是去维护state，所以Redux的概念就出现了，Redux就是一个帮助我们管理State的容器，提供了可预测的状态管理
+ Redux提供的核心理念Store就很好地帮我们对数据进行了一个统一的管理
+ 当然，Store的设置可以是全局的，也可以是某个页面独立的Store



## Action

+ Redux要求通过action来更新数据，所有数据的变化，必须通过派发（dispatch）action来更新
+ action是一个普通的JavaScript对象，用来描述这次更新的type和content

```javascript
const changeNewRankingAction = (res) => ({
    type: actionTypes.CHANGE_NEW_RANKING,
    newRanking:  res.playlist
})

const changeOriginRankingAction = (res) => ({
    type: actionTypes.CHANGE_ORIGIN_RANKING,
    originRanking:  res.playlist
})

export const getNewAlbumsAction = (limit) => {
    return dispatch => {
        getNewAlbums(limit).then(res => {
            dispatch(changeNewAlbumAction(res))
        })
    }
}

export const getTopListAction = (id) => {
    return dispatch => {
        getPlaylist(id).then(res => {
            switch (id) {
                case RECOMMEND_RANKING[0]:
                    dispatch(changeUpRankingAction(res));
                    break
                case RECOMMEND_RANKING[1]:
                    dispatch(changeNewRankingAction(res));
                    break
                case RECOMMEND_RANKING[2]:
                    dispatch(changeOriginRankingAction(res));
                    break
                default:    
            }
        })
    }
}
```



## reducer

+ state和action联系起来，就需要通过reducer
+ reducer是一个纯函数，reducer实际上就是将传入的state和action结合起来生成一个新的state

```javascript
const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],
    upRanking: {},
    newRanking: {},
    originRanking: {},
})

function reducer(state = defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanners",action.topBanners)
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotRecommends",action.hotRecommends)
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums",action.newAlbums)
        case actionTypes.CHANGE_UP_RANKING:
            return state.set("upRanking",action.upRanking)
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set("newRanking",action.newRanking)
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set("originRanking",action.originRanking)
        default:
            return state;
    }
}

export default reducer
```



## Redux三大原则

### 单一数据源

+ 整个应用程序的state被存储在一颗object tree中，并且这个object tree只存储在一个 store 中
+ Redux并没有强制让我们不能创建多个Store，但是那样做并不利于数据的维护
+ 单一的数据源可以让整个应用程序的state变得方便维护、追踪、修改



### State只读

+ 唯一修改State的方法一定是触发action，不要试图在其他地方通过任何的方式来修改State
+ 这样就确保了View或网络请求都不能直接修改state，它们只能通过action来描述自己想要如何修改state
+ 这样可以保证所有的修改都被集中化处理，并且按照严格的顺序来执行，所以不需要担心race condition（竟态）的问题



### 使用纯函数来执行修改

+ 通过reducer将 旧state和 actions联系在一起，并且返回一个新的State
+ 随着应用程序的复杂度增加，我们可以将reducer拆分成多个小的reducers，分别操作不同state tree的一部分
+ 所有的reducer都应该是纯函数，不能产生任何的副作用



## 合并reducer

+ 当我们给多个页面设置了单独的store时，这个时候就需要将不同页面中的reducer合并，让数据成为一棵树结构，这样有利于我们维护以及追踪数据
+ redux有提供combineReducersAPI来合并reducers

```javascript
import { combineReducers } from 'redux-immutable' 

import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store';
import { reducer as playerReducer } from '../pages/player/store/';

const TotalReducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer,
});

export default TotalReducer
```



## 中间件

+ 当我们封装好了reducer，会发现有一个致命的缺点，我们必须将网络请求的异步代码放到组件的生命周期中完成，但是实际上网络请求到的数据也属于状态管理的一部分，最好的方法就是将其交给redux来管理，但redux是如何处理异步代码的呢？
+ redux允许使用中间件**Middleware**来进行异步操作
+ Middleware可以在请求和响应之间嵌入一些操作的代码，比如cookie解析、日志记录、文件压缩等操作
+ 中间件的目的是在dispatch的action和最终达到的reducer之间，扩展一些独立的代码
+ 官方推荐的中间件是使用redux-thunk，当然redux-saga中间间也是一个比较在redux中常用的中间件
+ redux-thunk可以让dispatch(action函数)，action可以是一个函数，该函数会被调用，并且会传给这个函数一个dispatch函数和getState函数
+ 当我们获取到dispatch和getState函数的时候，就可以派发action和获取原来的状态
+ 





## 合并中间件

+ redux有提供**applyMiddleware**API来帮助我们合并中间件
+ 这样我们只需要将合并的总reducers传进去，再合并中间件
+ `compose`函数是Redux暴露出来唯一一个能单独使用的API，本质是函数式编程的组合函数
+ `compose` 函数做的事就是把 `var a = fn1(fn2(fn3(fn4(x))))` 这种嵌套的调用方式改成 `var a = compose(fn1,fn2,fn3,fn4)(x)` 的方式调用。
+ 合并中间件就是利用了compose函数来进行合并的，redux实际上是用的数组中的`reduce`方法，具体可以查看[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

```javascript
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// configureStore代替了createStore
const store = createStore(reducers,composeEnhancers(
    applyMiddleware(thunk)
))

export default store
```



## Hooks中API实现获取reducer中的数据

+ redux中提供了对应Hooks中的useSelectorAPI来在组件内部获取reducer中的数据，通过解构可以获取reducer中的state
+ shallowEqual主要是Hooks对State提供的性能优化API，通常给useSelector的第二个参数

```react
const { hotRecommends } = useSelector(state => ({
        hotRecommends: state.getIn(["recommend","hotRecommends"])
    }),shallowEqual)
```



## Hooks中API实现Dispatch

+ redux中提供了对应Hooks中的useDispatchAPI来帮我们完成dispatch的创建，这样只需要在uesEffect中派发事件即可
+ 注意，useEffect中的依赖项应该时dispatch对象

```react
const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHotRecommendsAction(HOT_RECOMMEND_LIMIT))
    },[dispatch])
```



## Immutable

+ 在React开发中，React强调数据的不可变性，当数据需要发生改变的时候，不应该使用原来的数据进行操作，而是创建一个新的**临时数据**覆盖原来的数据
+ 浅拷贝（object.assign）可以解决上述的问题，但是浅拷贝在面对庞大的数据时，这种方式会造成性能问题和内存浪费
+ 为了解决上述概念，提出了新的算法Persistent Data Structure（持久化数据结构或一致性数据结构）
+ ImmutableJS第三方库可以帮助我们快速实现上述算法，提供了一系列API用来转换数据

```javascript
// 合并reducer文件中
import { combineReducers } from 'redux-immutable' 

import { reducer as recommendReducer } from '../pages/discover/child-pages/recommend/store';
import { reducer as playerReducer } from '../pages/player/store/';

const TotalReducer = combineReducers({
    recommend: recommendReducer,
    player: playerReducer,
});

export default TotalReducer
```

  

```javascript
// 某个reducer文件中
import { Map } from 'immutable';

const defaultState = Map({
    topBanners: [],
    hotRecommends: [],
    newAlbums: [],
    upRanking: {},
    newRanking: {},
    originRanking: {},
})
```

