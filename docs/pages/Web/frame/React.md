# 基础目录

[[toc]]



## React框架介绍以及背景

React是2013年，Facebook开源的JavaScript框架，那么当时为什么Facebook要推出这样一款框架呢？这个源于一个需求，所产生的bug： 

+ 三个消息的数字在发生变化时，过多的操作很容易产生bug



bug是否可以修复呢？当然可以修复，但是Facebook的工程师并不满足于此，他们开始思考为什么会产生这样的问题，在传统的开发模式中，我们过多的去操作界面的细节；（前端、iOS、Android） ，并且需要掌握和使用大量DOM的API，当然我们可以通过jQuery来简化和适配一些API的使用；另外关于数据（状态），往往会分散到各个地方，不方便管理和维护



他们就去思考，是否有一种新的模式来解决上面的问题： 

+ 以组件的方式去划分一个个功能模块 
+ 组件内以jsx来描述UI的样子，以state来存储组件内的状态 
+ 当应用的状态发生改变时，通过setState来修改状态，状态发生变化时，UI会自动发生更新



官网介绍：**React** 是一个用于构建用户界面的 JavaScript 库。





## React特点

声明式编程：

+ 声明式编程是目前整个大前端开发的模式：Vue、React、Flutter、SwiftUI
+ 它允许我们只需要维护自己的状态，当状态改变时，React可以根据最新的状态去渲染我们的UI界面；

组件化开发：

+ 组件化开发页面目前前端的流行趋势，我们会讲复杂的界面拆分成一个个小的组件

多平台适配

+ 2013年，React发布之初主要是开发Web页面
+ 2015年，Facebook推出了ReactNative，用于开发移动端跨平台
+ 2017年，Facebook推出ReactVR，用于开发虚拟现实Web应用程序







## React开发依赖

React开发必须依赖三个库，它们分别是：

+ react：包含react所必须的核心代码
+ react-dom：react渲染在不同平台所需要的核心代码
+ babel：将jsx转换成React代码的工具



如果想要在HTML网页中体验React，可以使用官网的CDN链接，只有引入这三个库React才能正常开发

react-dom针对web和native所完成的事情不同：

- web端：react-dom会讲jsx最终渲染成真实的DOM，显示在浏览器中
- native端：react-dom会讲jsx最终渲染成原生的控件

demo：

```html
<div id="app"></div>

<!-- 添加React依赖 -->
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>


<script type="text/babel">
	//创建React类组件
    class App extends React.Component {
		//类组件需要调用constructor构造器，并且在里面定义组件内部的状态state，并且如果要改变当前的state状态，则需要调用专门改变state的函数setState（）
        constructor() {
            super();
            this.state = {
                message: "Hello World"
            }
        }

        
		//render函数能返回一个对象，返回需要渲染的组件
        render() {
            return (
                <div>
                    <h2>{this.state.message}</h2>
                    <button onClick={this.btnClick.bind(this)}>改变文本</button>
                </div>
            )
        }
		//在类内部定义需要使用的方法
        btnClick() {
            // setState会更新页面，重新调用render
            // 注意，更改的state需要遵守数据不可变性
            this.setState({
                messgae: "Hello React"
            })
        }
    }

	//由ReactDOM中的render调用，第一个参数是一个组件或者HTML元素，第二个则是需要渲染到的根元素
    ReactDOM.render(<App/>,document.getElementById("app"))
</script>
```





## JSX

JSX是一种JavaScript的语法扩展（eXtension），也在很多地方称之为JavaScript XML，因为看起就是一段XML语法，它用于描述我们的UI界面，并且其完成可以和JavaScript融合在一起使用它不同于Vue中的模块语法，你不需要专门学习模块语法中的一些指令（比如v-for、v-if、v-else、v-bind）JSX语法支持我们给一个变量赋值一段HTML片段



::: tip

React认为渲染逻辑本质上与其他UI逻辑存在内在耦合，比如UI需要绑定事件（button、a原生等等），比如UI中需要展示数据状态，在某些状态发生改变时，又需要改变UI。他们之间是密不可分，所以React没有讲标记分离到不同的文件中，而是将它们组合到了一起，这个地方就是组件

:::

------

JSX的书写规范：

- JSX的顶层**只能有一个根元素**，很多时候会在外层包裹一个div原生
- 为了方便阅读，通常在jsx的外层包裹一个小括号()，这样可以方便阅读，并且jsx可以进行换行书写
- JSX中的标签可以是单标签，也可以是双标签



demo：



```jsx
class App extends React.Component {

        constructor() {
            super();
        }

        render() {
            return (
                <div>
                    <div className="header">
                        <h1 title="标题">我是标题</h1>
                    </div>
                </div>
            )
        }

        
    }
```



### JSX中this绑定事件问题

在JSX中很多标签的属性React都有自己的定义，比如点击事件（Click），在JSX中的具体表现为onClick={methods}，把需要触发的事件传进去。当前我们直接传methods方法体是不能触发事件的，这就涉及了this的绑定问题当前的绑定事件Click并不是我们主动去调用的，而是React内部调用了Click事件，而当React在内部调用的时候，是不知道正确的this的

解决方案：

- 1.bind给btnClick显示绑定this
- 2.使用ES6的class fields方法
- 3.**事件监听时传入箭头函数**（推荐）

demo：



```jsx
constructor() {
            super();
            this.state = {
                message: "Hello World",
                movies: ["金刚","大灌篮","肖申克的救赎","阿甘正传"]
            }
        }

        

        render() {

            const liArray = [];
            for(let movie of this.state.movies){
                liArray.push(<li>{movie}</li>)
            }

            return (
                <div>
                    <h2>电影列表1</h2>
                    <ul>
                        {liArray}
                    </ul>

                    <h2>电影列表2</h2>
                    <ul>
                        {
                            this.state.movies.map((item,index) => {
                                return <li>{item}</li>
                            })
                        }    
                    </ul>
                </div>
            )
        }
```



### JSX的本质

实际上，jsx 仅仅只是 `React.createElement(component, props, ...children)` 函数的语法糖，所有的jsx最终都会被转换成`React.createElement`的函数调用

createElement需要三个参数：

+ 参数一：type
  - 当前ReactElement的类型
  - 如果是标签元素，那么就使用字符串表示 “div”
  - 如果是组件元素，那么就直接使用组件的名称
+ 参数二：config
  - 所有jsx中的属性都在config中以对象的属性和值的形式存储
+ 参数三：children
  - 存放在标签中的内容，以children数组的方式进行存储





## React生命周期

在React中生命周期主要分为三个阶段：装载阶段（Mount），更新阶段（update），卸载阶段（Unmount）。React内部为了让使用者了解当前处于哪些阶段，会对组件内部实现的某些函数进行回调，这些函数就是生命周期函数

生命周期函数：

+ componentDidMount函数：组件已经挂载到DOM上时，就会回调
  - 依赖于DOM的操作可以在这里进行
  - 在此处发送网络请求就最好的地方
  - 可以在此处添加一些订阅（会在componentWillUnmount取消订阅）
+ componentDidUpdate函数：组件已经发生了更新时，就会回调
  - 当组件更新后，可以在此处对 DOM 进行操作
  - 如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求；（例如，当 props 未发生变化时，则不会执行网络请求）
+ componentWillUnmount函数：组件即将被移除时，就会回调
  - 在此方法中执行必要的清理操作
  - 例如，清除 timer，取消网络请求或清除在 componentDidMount() 中创建的订阅等
+ getDerivedStateFromProps
  - state 的值在任何时候都依赖于 props时使用；该方法返回一个对象来更新state
+ getSnapshotBeforeUpdate
  - 在React更新DOM之前回调的一个函数，可以获取DOM更新前的一些信息（比如说滚动位置）
+ shouldComponentUpdate

::: tip

类组件才有生命周期，而函数式组件Hooks是没有生命周期的

:::

------



## React组件通信

在vue中可以通过props传递或者vuex进行组件之间的通信，而react中的通信也相似，父组件可以通过`属性=值`的形式来传递数据给子组件，而子组件通过props参数获取父组件传递过来的数据

在传递的过程中我们如果想要对数据进行一些限制，可以使用react官方提供的propType来限制数据的类型或者设置默认值，当然官方是推荐优先使用TS



### Context

在开发中比较常见的数据传递方式是通过props属性自上而下传递，但是如果想要在多层组件中进行数据共享，很明显props一层一层传递就会变得十分繁琐。React提供了`Context`API来解决上述的问题

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言

Context相关API：

+ **React.createContext**

  - 创建一个需要共享的Context对象
  - 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配的 Provider 中读取到当前的context值
  - defaultValue是组件在顶层查找过程中没有找到对应的Provider，那么就使用默认值

+ **Context.Provider**
  + 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化
  + Provider 接收一个 value 属性，传递给消费组件
  + 一个 Provider 可以和多个消费组件有对应关系
  + 多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据
  + 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染

+ **Class.contextType**
  + 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象
  + 这能让你使用 this.context 来消费最近 Context 上的那个值
  + 你可以在任何生命周期中访问到它，包括 render 函数中

+ **Context.Consumer**
  + 这里，React 组件也可以订阅到 context 变更。这能让你在 函数式组件 中完成订阅 context
  + 这里需要 函数作为子元素（function as child）这种做法
  + 这个函数接收当前的 context 值，返回一个 React 节点

  

demo：
  ```javascript
  //类组件中使用context
  //创建context并设置默认值
  const UserContext = React.createContext({
          nickname: "lyf",
          level: 21
      })
  
      class App extends React.Component {
          constructor() {
              super();
              this.state = {
                  nickname: "111",
                  level: 22
              }
          }
  
          //当前的UserContext就是我们设置的context，而此时传进去的值是当前组件内部的state
          render() {
              return (
                  <div>
                      <UserContext.Provider value={this.state}> 
                          <Profile/>
                      </UserContext.Provider>
                  </div>
              )
          }
      }
  
      class Profile extends React.Component {
          //子组件此时接受到了context并进行渲染
          render(){
              return(
                  <div>
                      <h2>{this.context.nickname}</h2>
                      <h2>{this.context.level}</h2>
                  </div>
              )
          }
      }
  	
  	//注意此处要设置子组件的context是上面设置的UserContext，不然数据会拿不到
      Profile.contextType = UserContext;
  
      ReactDOM.render(<App/>,document.getElementById("app"))
  ```

  ```javascript
  //函数式组件中使用context
  //注意函数式组件中是不支持contextType的
  const UserContext = React.createContext({
          nickname: "lyf",
          level: 21
      })
  
      class App extends React.Component {
  
          constructor() {
              super();
              this.state = {
                  nickname: "111",
                  level: 22
              }
          }
  
          render() {
              return (
                  <div>
                      <UserContext.Provider value={this.state}> 
                          <Profile/>
                      </UserContext.Provider>
                  </div>
              )
          }     
      }
  
      function Profile() {
          return (
              <UserContext.Consumer>
                  {
                      value => {
                          return(
                              <div>
                                  <h2>{value.nickname}</h2>
                                  <h2>{value.level}</h2>
                              </div>
                          )
                      }
                  }
              </UserContext.Consumer>
          )
      }
  
      ReactDOM.render(<App/>,document.getElementById("app"))
  ```





## React中的state

在React开发中部我们并不能直接通过修改state的值来让界面发生更新，因为我们修改了state之后，希望React根据最新的State来重新渲染界面，但是这种方式的修改React并不知道数据发生了变化。React并没有实现类似于Vue2中的Object.defineProperty或者Vue3中的Proxy的方式来监听数据的变化，我们必须通过setState来告知React数据已经发生了变化



### setState异步更新

setState在React中是一个异步操作，这意味着在执行完setState后不能马上拿到更新后的结果

setState设计为异步，可以显著的提升性能；如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的。最好的办法应该是获取到多个更新，之后进行批量更新。如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步。state和props不能保持一致性，会在开发中产生很多的问题



如何获取更新后的值？：

1.setState的回调：setState接受两个参数：第二个参数是一个回调函数，这个回调函数会在更新后会执行

2.生命周期函数：在componentDidupdata函数中获取



::: tip

setState不一定是异步的，在版本17之前，在组件生命周期或React合成事件中，setState是异步，**在setTimeout或者原生dom事件中，setState是同步**

:::

------



### React的更新流程

React在props或state发生改变时，会调用React的render方法，会创建一颗不同的树。React需要基于这两颗不同的树之间的差别来判断如何有效的更新UI，此处React就是使用了diff算法来进行优化，当然React中的diff算法是React本身已经优化过了的diff算法

而在遍历数组中，React也会出现和v-for同样类型的警告，大致意思是设置key，此处涉及到diff算法就不过多描述，在此需要注意的是，**使用index作为key，对性能是没有优化的**

::: tip

当以数组为下标的index作为key值时，其中一个元素(例如增删改查)发生了变化就有可能导致所有的元素的key值发生改变，diff算法时比较同级之间的不同，以key来进行关联，当对数组进行下标的变换时，比如删除第一条数据，那么以后所有的index都会发生改变，那么key自然也跟着全部发生改变，所以index作为key值是不稳定的，而这种不稳定性有可能导致性能的浪费，导致diff无法关联起上一次一样的数据。因此，能不使用index作为key就不使用index。

:::

------

当组件内部中的某一值发生改变后，当前组件的render函数会被重新调用，但是实际的过程中很多组件并没有发生改变但也一起重新render，这样就会造成性能浪费。React提供了过shouldComponentUpdateAPI来控制render方法被调用。shouldComponentUpdate接受两个参数，第一个是最新的props，第二个是最新的stateshouldComponentUpdate的返回值是一个boolean类型，当返回值是true时，那么就调用render方法，当返回值是false时，那么就不需要执行render方法，默认返回的时true，也就是只要state发生改变，就重新调用render方法



此时在多个组件下面，我们就能利用shouldComponentUpdate来对每个组件自己内部的状态来决定是否需要重新render，但是每个组件都写shouldComponentUpdate肯定是不现实的，此时React提供了PureComponentAPI来帮助完成上述的方法，让所有的类组件继承自PureComponent

而对应的函数组件中类似的功能就是memo



### React的数据不可变性

React建议不要直接修	改State，当我们使用setState的时候，给原来的state赋值的时候也不要直接使用state里面的数据，应该使用一个新的内部常量NewState来接受原来数据的改变并赋值给原来的state





## React条件渲染

某些情况下，我们希望能自主地控制界面的渲染，根据不同的情况选择渲染不同的内容，在Vue中能通过指令`v-show` 和 `v-if`，而在React中，所有的条件判断都能和原生的js代码一致

这个时候，就能使用原生的三元运算符，条件判断语句或者&&运算符来判断是否要渲染，JSX与JS无缝衔接能让它变得更加灵活



demo：

```jsx
	class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                currentTitle : "新款"
            }
            this.titles = ['新款','爆款','流行']
        }
        
        render() {
            const {currentTitle,titles} = this.state
            return (
                <div>
                    <TabControl titles={this.titles} itemClick={index => this.itemClick(index)} />
                    <h2>{currentTitle}</h2>
                </div>
            )
        }

        itemClick(index) {
            console.log(index)
            this.setState({
                currentTitle : this.titles[index]
            })
        }
    }

    class TabControl extends React.Component {

        constructor(props){
            super(props)
            this.state = {
                currentIndex: 0
            }
        }

        render() {
            const { titles } = this.props
            const { currentIndex } = this.state

            return (
                <div className="tab-control">
                    {
                        titles.map((item,index) => {
                            return (
                                <div 
                                    className={"tab-item "} 
                                    id={(index === currentIndex) ? "active" : ""}
                                    key={index}
                                    onClick={e => this.chang(index)}>
                                    <span>{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        chang(index){
            this.setState({
                currentIndex : index
            })

            const {itemClick} = this.props
            itemClick(index);
        }
    }

    TabControl.propTypes = {
        titles: PropTypes.array.isRequired
    }

    ReactDOM.render(<App/>,document.getElementById("app"))
```





## PropTypes

React内部提供了属于自己的类型检查（类似TypeScript），在通过props传值的时候可以使用PropTypes来限制值的范围以及默认值的设置，详见[PropTypes官网](

::: tip

注：该包已经不被官网所推荐，官方更加推荐tsx这种ts+jsx的写法，更加支持TypeScript

:::



## 虚拟DOM

在上面JSX的本质说到了React.createElement最终创建出来的是一个`ReactElement`对象，React利用该ReactElement对象组成了一棵对象树，而这个对象树就是虚拟DOM，ReactElement最终形成的树结构就是虚拟DOM。

::: tip

React官方的说法：Virtual DOM 是一种编程理念。在这个理念中，UI以一种理想化或者说虚拟化的方式保存在内存中，并且它是一个相对简单的JavaScript对象我们可以通过ReactDOM.render让 虚拟DOM 和 真实DOM同步起来，这个过程中叫做协调（Reconciliation）

:::

前后的顺序是： JSX  ->  ReactElement对象（虚拟DOM）  ->  真实DOM



为什么不直接修改真实ＤＯＭ（使用虚拟ＤＯＭ的好处）：

+ 很难跟踪状态发生的改变：原有的开发模式，我们很难跟踪到状态发生的改变，不方便针对我们应用程序进行调试
+ 操作真实DOM性能较低：传统的开发模式会进行频繁的DOM操作，而这一的做法性能非常的低
+ 其次，DOM操作会引起浏览器的回流和重绘，所以在开发中应该避免频繁的DOM操作





## React组件化

React的组件相对Vue更加灵活多样，按照不同的方式可以分成很多类的组件：

+ 根据组件的定义方式，可以分为：函数组件和类组件
+ 根据组件内部是否有状态需要维护，可以分为：无状态组件和有状态组件
+ 根据组件的不同职责，可以分成：展示型组件和容器型组件



类组件：

+ 类组件需要继承自React.Component
+ 类组件必须实现render函数
+ 使用类组件时constructor是可选的，通常在constructor中初始化一些数据
+ this.state中维护的就是组件内部的数据



函数组件（Hooks）：

+ 没有生命周期，也会被更新并挂载，但是没有生命周期函数
+ 没有this
+ 没有内部状态

下面会更详细的介绍hooks



## React中ref的使用

通常情况下React是不推荐直接操作DOM元素的，但是在某些特殊情况下我们需要对DOM直接操作比如audio，这个时候就可以使用React提供的RefAPI来获取对应的DOM

目前React提供了三种获取refs获取DOM的方法：

- 1.传入字符串，使用时通过this.refs.（字符串）来获取对应的元素
- 2.传入一个对象（**推荐**），对象一定是通过React.createRef()的方式创建出来的，使用的时候获取到创建的对象下面的current属性就是对应的元素
- 3.传入一个函数，该函数会在DOM被挂载的时候进行回调，这个函数可以传入一个元素对象参数，这个时候对该元素对象进行保存即可，使用的时候使用刚刚保存的元素对象即可

::: tip

函数式组件不能使用上述方法获取DOM，后面Hooks会有对应的获取ref方法

:::

## 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.reactjs.org/docs/react-component.html#setstate)来更新

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”

React中的受控组件有点类似Vue中的v-model，能够实时地获取修改后的数据

demo:

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```



React推荐大多数情况下使用受控组件来处理**表单**数据，Antd中的表单组件都是受控组件。如果要使用非受控组件，此时表单数据将交给DOM节点来处理，那么需要使用 ref 来从DOM节点中获取表单数据

在非受控组件中通常使用defaultValue来设置默认值





## 高阶函数



## Portals



## fragment





## StrictMode





## React中使用CSS





## React Hooks





## React-router

