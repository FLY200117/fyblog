---
date: 2022/10/15
editLink: true
lastUpdated: true
---


# 目录

[[toc]]

## JavaScript的由来

JavaScript主要是由DOM 和BOM 和ECMAScript三部分组成的，BOM就是当前页面上的各个节点，而DOM就是把整个页面映射成一个多层节点机构（DOM树），然后开发人员可以通过DOM树对页面的内容和结构进行控制



JS中的核心就是ECMA，而ECMA又主要分成两大部分，一部分是老式的ES5规范，主要是一些低版本的浏览器所支持的规范，而另一部分就是较新的ES6规范，大部分比如class类，解构，箭头等概念都是从ES6出现的，所以从ES6开始以后的规范基本上都是维护ES6新推出的API，现如今大部分浏览器都支持ES6，新的ES6规范中提供了更加更多灵活的AIP，更加舒适的编程体验，最新的ECMA版本是[ECMA-417]([ECMA-417 - Ecma International (ecma-international.org)](https://www.ecma-international.org/publications-and-standards/standards/ecma-417/))



如果要对JS进行老浏览器的向下兼容，可以在通过Webpack打包工具中的babel实现ES6向ES5的转换



## 基本类型介绍

JS中主要分两种数据类型，一种是基本数据类型，通常是保存在栈空间中，另一种是引用数据类型，保存在堆内存中，JS中所有的数据类型一共有7种





基本数据类型：

+ Undefined
+ Null
+ Boolean
+ String
+ Number
+ Symbol



引用数据类型：

+ Object
+ function
+ Array
+ Set
+ Map
+ ...



三种检测数据类型的方法：

| 方法                      | 补充                                                         |
| ------------------------- | ------------------------------------------------------------ |
| typeof                    | typeof只能检测基本数据类型和Object和function类型的数据，不能检测Array此类的数据类型 |
| instanceof                | 是用于判断数据类型，不能检测基本数据类型                     |
| Object.prototype.toString | API需要二次封装使用                                          |







::: tip
所有引用数据类型的原型都是Object，它们都是由Object衍生出来的数据类型，故都算作Object
:::



## JS的内存管理和闭包

像 C 语言这样的底层语言一般都有底层的内存管理接口，比如 `malloc()`和`free()`。相反，JavaScript 是在创建变量（对象，字符串等）时自动进行了分配内存，并且在不使用它们时“自动”释放。释放的过程称为垃圾回收。这个“自动”是混乱的根源，并让 JavaScript（和其他高级语言）开发者错误的感觉他们可以不关心内存管理



不管什么程序语言，内存生命周期基本是一致的：

1. 分配你所需要的内存
2. 使用分配到的内存（读、写）
3. 不需要时将其释放\归还

所有语言第二部分都是明确的。第一和第三部分在底层语言中是明确的，但在像 JavaScript 这些高级语言中，大部分都是隐含的

+ 手动管理内存：比如C、C++，包括早期的OC，都是需要手动来管理内存的申请和释放的
+ 自动管理内存：比如Java、JavaScript、Python、Swift、Dart等，它们有自动帮助我们管理内存



### 内存管理

JS的内存管理在具体底层的表现为**堆内存**和**栈空间**，JS对于基本数据类型内存的分配会在执行时，直接在栈空间进行分配，JS对于复杂数据类型内存的分配会在堆内存 中开辟一块空间，并且将这块空间的指针返回值变量引用



每个语言都有自己的垃圾回收机制，而JS也不例外，垃圾回收器简称GC，实际上就是通过算法来实现回收不需要的对象和值

GC算法：

+ 引用计数：
  + 当一个对象有一个引用指向它时，那么这个对象的引用就+1，当一个对象的引用为0时，这个对象就可以被销毁掉
  + 这个算法有一个很大的弊端就是会产生循环引用
+ 标记清除：
  + JS引擎比较广泛的采用的就是标记清除算法，当然类似于V8引擎为了进行更好的优化，它在算法的实现细节上也会结合一些其他的算法
  + GC算法不是实时调用的，即当我们设置一个对象的指针为null时该对象没有指针引用的时候是应该立马被删除的，但是GC算法是会延迟检测才删除的，具体延迟时间不定



### 闭包

JS中函数是一等公民，函数的使用非常灵活，函数可以作为另一个函数的参数，也可以作为另外一个函数的返回值来使用，在函数的概念上扩展出新的函数——高阶函数：**把一个函数如果接收另外一个函数作为参数，或者该函数会返回另外一个函数作为返回值，那么这个函数就称之为是一个高阶函数**

::: tip

而数组上就有许多高阶函数，例如map,foreach,filter等

:::

**闭包**（closure）是一个函数以及其捆绑的周边环境状态（**lexical environment**，**词法环境**）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建

JS中的闭包是存在内存泄露的，因为引用链中所有对象都是无法释放的，这就意味着当一个函数执行完需要销毁的时候，如果里面的某个变量被外部所引用，那么该函数就不会被GC自动销毁，这种情况被称为闭包的内存泄露

当我们无法通过GC回收清除那些对象时，JS提供了null来帮助我们手动释放引用链中的对象

```js
function a () {
	let obj = {
        name: 'lyf',
        age: 21
    }
	let b = function () {
		console.log(obj.name,obj.age)
        obj = null
	}
    b()
}
a()
```



## js中的this以及apply/call/bind

### this

与其他语言相比，**函数的 this 关键字**在 JavaScript 中的表现略有不同，此外，在[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)和非严格模式之间也会有一些差别。

在绝大多数情况下，函数的调用方式决定了 `this` 的值（运行时绑定）。`this` 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。ES5 引入了 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 方法来设置函数的 `this` 值，而不用考虑函数如何被调用的。ES2015 引入了[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，箭头函数不提供自身的 this 绑定（`this` 的值将保持为闭合词法上下文的值）



this在全局中的指向：

+ 在浏览器环境下指向`window`
+ 在node环境下指向{}



this一般在函数中使用，this本质上是一条函数上下文中的记录，该记录主要存储函数的调用者，同时，this是在运行时绑定的，而this的绑定有四种情况：

+ 默认绑定
+ 隐式绑定
+ 显式绑定（call/bind/apply）
+ new绑定

而绑定规则的优先级为 new > 显式绑定 > 隐式绑定 > 默认绑定



### 手写apply/bind/call

显式绑定的三种方法都是为了更改this的指向，但它们之前是有着区别的，那就是**传参不同**，以及**返回值的不同**，具体可以看下列三种方法手写过程

下面来手写显式绑定的三种方法：

```js
Function.prototype.mycall = function(thisObj, ...args) {
    let fn = this

    thisObj = (thisObj !==null && thisObj !== undefined)  ?  Object(thisObj) : window

    const targetfn = Symbol()

    thisObj[targetfn] = fn

    const result = thisObj[targetfn](...args)
    delete thisObj[targetfn]
    return result
}
```

```js
Function.prototype.myapply = function (thisArg,argArray) {
    // 获取要执行的函数
    var fn = this

    // 处理绑定的thisArg
    // 前面判断thisArg为0的情况，当参数为0时判断this不该为window
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg): window

    // 执行函数
    thisArg.fn = fn


    // if(!argArray){ //argArray是没有值的(没有传参数)
    //     result = thisArg.fn()            
    // }else{ //argArray有参数
    //     var result = thisArg.fn(...argArray)
    // }

    
    // 利用||或运算符实现上述if else循环
    argArray = argArray || []
    var result = thisArg.fn(...argArray)
    delete thisArg.fn

    return result
}
```

```js
Function.prototype.mybind = function(thisArg,...argArray) {
    // 获取真实需要调用的函数
    var fn = this
    
    // 绑定this
    thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window

    function proxyFn(...args){
        // 将函数放到thisArg中进行调用
        thisArg.fn = fn
        // 对两个传入的参数进行合并
        var finalArgs = [...argArray,...args]
        var result = thisArg.fn(finalArgs)
        delete thisArg.fn
        return result
    }

    return proxyFn
}
```



::: tip

对于上述三种函数的实现存在一个问题待优化，那就是如果传过来的函数中已经有了fn属性，则就相当于覆盖了原函数的fn，故优化方法为调用ES6中的symbol来创建fn，symbol详情见下方ES6

:::



## 深入js对象

对象是JavaScript中一个非常重要的概念，这是因为对象可以将多个相关联的数据封装到一起，更好的描述一个事物，用对象来描述事物，更有利于我们将现实的事物，抽离成代码中某个数据结构，JavaScript中的对象被设计成一组属性的无序集合，像是一个哈希表，有key和value组成，**key是一个标识符名称，value可以是任意类型，也可以是其他对象或者函数类型**



### 属性描述符和存取描述符

高级修改对象属性：

`Object.defineProperty()`这个由Object对象提供的API能够通过属性描述符来更高级地修改一个对象中的属性，它接收三个参数：

1.要操作的对象

2.要操作对象中的属性

3.属性描述符



属性描述符由4个，分别是`configurable`，`value`，`enumerable`，`writable`

```js
var obj = {
    name:"lyf",
    age:21
}

Object.defineProperty(obj,"height",{
    value: 1.85,//默认值是undefined
    
    // 属性是否可以修改或者删除，也不可以重新定义描述符
    configurable: true,//默认值是false
    
    // 属性是否可以枚举，遍历
    enumerable: false,//默认值是false
    
    // 属性是否可以赋值
    writable: false,//默认值是false
})

// 测试configurable
console.log(obj.height)
delete obj.height
console.log(obj.height)

// 测试enumerable
console.log(obj)
for(var key in obj){
    console.log(key)
}
console.log(Object.keys(obj))

// 测试writable
obj.height = 1.9
console.log(obj.height)
```



而当属性描述符中的`value`和`writable`替换成`get`和`set`函数时，那么它就不是属性描述符而是存取描述符

```js
var obj = {
      name:"lyf",
      age:21,
      _height:1.85
  }
  
  // 存取属性描述符
  // 1.隐藏某个私有属性被希望直接被外界使用和赋值
  // 2.如果希望截取某一个属性它访问和设置值的过程时
  Object.defineProperty(obj,"height",{
      configurable: true,
      enumerable: false,
  
      get: function(){
          return this._height
      },
  
      set: function(value){
          this._height = value
  }
})
```



::: tip

注意，如果一个描述符不具有 `value`、`writable`、`get` 和 `set` 中的任意一个键，那么它将被认为是一个数据描述符。如果一个描述符同时拥有 `value` 或 `writable` 和 `get` 或 `set` 键，则会产生一个异常

:::



同时也可以通过`Object.defineProperties`定义多个属性描述符

```js
var obj = {
    // 私有属性（js里面没有严格意义的私有属性）
    _age: 20,
    
}

Object.defineProperties(obj,{
    name: {
        enumerable: true,
        value: "lyf",
        configurable: true,
        writable: true
    },
    age: {
        enumerable: true,
        value: 21,
        configurable: true,
        writable: true
    }
})
```



获取对象的属性描述符：

+ Object.getOwnPropertyDescriptor（obj）

Object中的方法对对象的属性描述符的限制：

+ Object.preventExtensions(obj)
+ Object.seal(obj)
+ Object.freeze(obj)

```js
var obj = {
    name: 'lyf',
    age: 21
}

// 禁止对象继续添加新的属性
Object.preventExtensions(obj)

obj.height = 1.85

console.log(obj)

// 禁止对象配置/删除里面的属性
Object.seal(obj)

delete obj.age
console.log(obj)
// 让属性不可以修改（writable：false）
Object.freeze(obj)

obj.age = 21
console.log(obj)
```



### 工厂模式

由于引进了属性描述符的方法，在JS中就能通过各种各样的方式来创建各种对象，这个时候就需要引入另外一个概念——工厂模式，该模式指定一个工厂方法，通过工厂方法来生产想要的对象，所有对象的生产都由该方法返回

```js
// 通过字面量创建对象
var p1 = {
    name: 'lyf',
    age: 21,
    height: 1.85,
    running: function() {
        console.log("running")
    }
}


// 工厂模式
// 通过一个函数返回一个自己想要的对象
function createPerson(name,age,height) {
    // 创建对象
    var p = {}
    // 给对象赋入传入的参数的值
    p.name = name
    p.age = age
    p.height = height

    p.running = function() {
        console.log("running")
    }
    // 返回创建好的对象
    return p
}

var p1 = createPerson("lyf",21,1.85)

// 工厂模式的缺点：获取不到对象的真实类型
// 即每个工厂模式创建出来的都是Object对象，区分不了
```



## 原型

在JavaScript当中每个对象都有一个特殊的内置属性[[prototype]]，这个特殊的属性的值是另外一个对象，而另外的一个对象就称为是这个对象的原型

原型对象的作用：

当我们通过引用对象的属性key来获取一个value时，它会触发Get操作，这个操作会首先检查该属性是否有对应的属性，如果有则使用它，如果没有，则会访问对象[[prototype]]内置属性指向的对象上的属性继续去找

获取原型对象的方式：

+ 通过对象的proto属性可以获取到（但是这个是早期浏览器自己添加的，存在一定的兼容性问题）
+ 通过 Object.getPrototypeOf 方法可以获取到

::: tip

原型对象上是有一个constructor属性，默认情况下原型上都会添加一个属性叫做constructor，该属性会指向当前的函数对象

:::



重写原型对象：

```js
// 直接修改整个prototype对象
foo.prototype = {
    namne : 'lyf',
    age : 21,
    height : 1.85
}

// 真实开发中我们可以通过Object.defineProperty方式添加construtor
Object.defineProperty(foo.prototype,"constructor",{
    enumerable: false,
    configurable: true,
    writable: true,
    value: foo
})
```













## 原型链和继承

在真正实现继承之前，我们先来理解一个非常重要的概念：原型链

我们知道，从一个对象上获取属性，如果在当前对象中没有获取到就会去它的原型上面获取，上一层原型没有的话就从原型的原型上找，这样就形成了一条链，而它就是原型链



```js
var obj = {
    name: 'lyf',
    age: 21
}

// [[get]]操作
// 1.在当前对象中查找属性
// 2.如果没有找到，这个时候回去原型（__proto__）对象上查找
// 3.一直沿着原型链查找属性直到顶层对象

// obj.__proto__ = {
//     height: 1.85
// }
// obj.__proto__ = {

// }

// obj.__proto__.__proto__ = {
//     // height: 1.9
// }

// obj.__proto__.__proto__.__proto__ = {
//     height: 2.0
// }

// 原型链 prototype chain 原型链的顶层是顶层原型

console.log(obj.height)

// 此时的obj.__proto__是顶层原型，没有上层
console.log(obj.__proto__)

// 当创建一个对象的时候，此时会将Object的显式原型赋值给创建的对象的原型
// 即obj.__proto__ = Object.prototype
// 而Object在JS中是一个创建好了的函数
// prototype是原型对象，而__proto__是原型属性
console.log(obj.__proto__.__proto__)   

console.log(Object.getOwnPropertyDescriptors(Object.prototype))
```



Javascript中绝大多数的对象的顶层原型都是Object，而它则没有原型，故属性为null，该对象上有很多默认的属性和方法，绝大多数的对象例如Array都是由Object为原型而进行的二次封装，连同Function也是



通过原型链实现继承

```js
// 父类
function Person(name,age,height){
    this.name = name
    this.age = age
    this.height = height
    this.friends = []
}

Person.prototype.eating = function() {
    console.log(this.name + "eating")
}



// 子类
function student(name,age,height) {
    //Person.call(this,name,age,height)
    this.sno = 111
}
// 原型链实现继承
student.prototype = new Person()

student.prototype.studying = function(){
    console.log(this.sno + "studyings")
}

// var stu = new student
// console.log(stu.sno)
// console.log(stu.name)
// stu.eating()
// stu.studying()

// 原型链实现继承的弊端:
// 1.打印stu对象，继承的属性是看不到的，继承的属性在原型链上而不在该对象中
// console.log(stu)

// 2.创建出来两个stu的对象
// var stu1 = new student()
// var stu2 = new student()

// 直接修改对象上的属性，是给本对象添加了一个新属性，不会影响
// stu1.name = "eee"
// console.log(stu1.name)
// console.log(stu2.name)

// 通过原型获取的属性值并不是独立的，会相互影响
// stu1.friends.push("lyf")
// console.log(stu1.friends)
// console.log(stu2.friends)

// 3.在前面实现类的过程中都没有传递参数，因为参数不能确定是在子类还是父类进行处理

var stu3 = new student("lyf",21,1.85)
console.log(stu3)

// 优化方法：在子类中添加调用父类的call方法,相当于借用构造函数进行继承
// Person.call(this,name,age,height)

// 强调：借用构造函数即上述优化方法也是有弊端：
// 1.Person函数至少被调用了两次
// 2.stu的原型对象上回多出一些属性，但是这些属性没有存在的必要
```



组合继承（组合继承就是使用原型链继承和构造器继承组合一起来实现继承）：

```js
// 父类
function Person(name,age,height){
    this.name = name
    this.age = age
    this.height = height
    this.friends = []
}

Person.prototype.eating = function() {
    console.log(this.name + "eating")
}



// 子类
function student(name,age,height) {
    Person.call(this,name,age,height)
    this.sno = 111
}
student.prototype = new Person()
// 在原型链继承上多了这一步
// 使得能复用父类的方法
// 在每次调用父类的方法的时候，都会去主动调用子类中的方法
student.prototype.constructor = student

var stu = new student()
console.log(stu)
```





原型式继承：

```js
var obj = {
    name: 'lyf',
    age: 21
}

// 原型式继承函数
function object (o){
    let newobj = {}
    // 将newobj的原型设置为o
    Object.setPrototypeOf(newobj,o)
    return newobj
}

// var info = object(obj)
// console.log(info)
// console.log(info.name)

// 在最新的ECMA中提供了create方法可以实现上述原型式继承函数
// 而create方法内部其实也是和原型式继承函数一样实现的
var info = Object.create(obj)
console.log(info)
```





寄生组合式继承：

```js
// 父类
function Person(name,age,friends){
    this.name = name
    this.age = age
    this.friends = friends
}

Person.prototype.runing = function(){
    console.log("running")
}
// 子类
function student(name,age,friends,sno,score){
    Person.call(this,name,age,friends)
    this.sno = sno
    this.score = score
}

// 创建一个函数用来实现继承
function inheritPrototype(SubType,SuperType) {
    // 将子类的原型对象设置为一个新的对象，而这个新的对象的原型是父类的原型
    SubType.prototype = Object.create(SuperType.prototype)
}

inheritPrototype(student,Person)


student.prototype.studying = function(){
    console.log("studying")
}

var stu = new student("lyf",21,"xxx",21,100)
console.log(stu)
stu.runing()
stu.studying()
```

::: tip

现在的extends语法糖其实就是寄生组合式继承，可以通过babel转换extends查看源码

:::

## 类

在ES6后能用`class`来声明一个类，类的内部存在一个构造函数，每个类可以有一个自己的构造函数，该构造函数的名字是固定的`constructor`

当我们通过new操作符，操作一个类的时候会调用这个类的构造函数`constructor`，每个类只能有一个构造函数，如果包含多个构造函数，那么会抛出异常



当我们new一个类时，会调用构造函数，并执行如下操作：

+ 1.在内存中创建一个新的对象（空对象
+ 2.这个对象内部的[[prototype]]属性会被赋值为该类的prototype属性
+ 3.构造函数内部的this，会指向创建出来的新对象
+ 4.执行构造函数的内部代码（函数体代码）
+ 5.如果构造函数没有返回非空对象，则返回创建出来的新对象



类中也可以定义一个静态方法，静态方法通常用于定义直接使用类来执行的方法，不需要有类的实例，需要使用static关键字来定义

```js
// 类的声明
class Person {
    // 构造函数来接收参数
    // 注意：一个类只有一个构造函数
    constructor(name,age){
        this.name = name
        this.age = age
        this._address = "广州市"
    }

    // 普通的实例方法
    // 方法能直接写在类的内部,该方法其实是写在Person的原型上面
    eating() {
        console.log(this.name + "eating")
    }

    // 类的访问器
    get address() {
        return this._address
    }

    set address(Newaddress) {
        this._address = Newaddress
    }

    // 类的静态方法
    // 可以通过类名访问
    static createPerson(){
        return new Person()
    }
}

var p1 = new Person('lyf',21)
console.log(p1)
p1.eating()
console.log(Person.prototype)
```



类也可以继承，使用`extends`关键字来实现类的继承，在子（派生）类的构造函数中使用this或者返回默认对象之前，必须先通过super调用父类的构造函数，super的使用位置有三个：子类的构造函数、实例方法、静态方法

```js
// class中实现继承
class student extends Person {
    // JS引擎在解析子类的时候是有要求的，如果我们有实现继承
    // 那么在子类的构造方法中，在使用this之前必须调用super()
    constructor(name,age,sno){
        super()
        this.sno = sno
    }

    // 子类方法的重写
    eating() {
        // 复用父类中的方法
        super.eating()

        console.log("子类方法的重写")
    }
}

var stu1 = new student('lyf',21)
console.log(stu1)
stu1.eating.call(this)
```



关于class和extends，它们都是语法糖，我们可以用babel查看下class类源码的实现

```js
class person{
    
}

// 源码实现
function _instanceof(left, right) { 
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { 
        return !!right[Symbol.hasInstance](left); 
    } else { 
        return left instanceof right; 
    } 
}
function _defineProperties(target, props) { 
    for (var i = 0; i < props.length; i++) { 
        var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; 
        descriptor.configurable = true; 
        if ("value" in descriptor) descriptor.writable = true；		 	 	
        Object.defineProperty(target, descriptor.key, descriptor); 
    } 
}
function _createClass(Constructor, protoProps, staticProps) { 
    if (protoProps) _defineProperties(Constructor.prototype, protoProps); 
    if (staticProps) _defineProperties(Constructor, staticProps); 
    Object.defineProperty(Constructor, "prototype", { 
        writable: false 
    }); 
    return Constructor; 
}
function _classCallCheck(instance, Constructor) { 
    if (!_instanceof(instance, Constructor)) { 
        throw new TypeError("Cannot call a class as a function"); 
    } 
}
var person = /*#__PURE__*/_createClass(function person() {
  _classCallCheck(this, person);
});
```





## 多态

多态是编程语言中的一种概念：为不同数据类型的实体提供统一的接口，或者使用一个单一的符号来表示多种不同的类型

具体在JS的表现即不同的参数会有不同类型的结果，下面的例子就是一个经典的多态：

```js
function sum(a,b){
	console.log(a + b)
}
sum(10,20) //30
sum("abc","cba") //abccba
```



## ES6+知识

由于自ES6来ECMA更新了众多个版本，所以下面只列出一些重要的知识点，更多详情见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects)



### let/const

在ES5中声明变量都是使用var关键字，但是该关键字有个很大的问题，就是会进行作用域提升，于是ES6中就新增了两个关键字用来声明变量：`let`，`const`

::: tip

const定义的基本数据类型是不允许改动的，但是const定义的引用类型是允许改变的

:::

var声明的变量是会进行作用域提升的，作用域提升就是**在声明变量的作用域中，如果这个变量可以在声明之前被访问，那么我们可以称之为作用域提升**

而let/const没有进行作用域提升，因为在执行上下文创建阶段被创建出来

```js
//可以被访问，foo被创建，值是undefined
console.log(foo)
var foo = "111"
//不可以被访问，foo2被创建
console.log(foo2)
let foo2 = "222"
```



::: tip

在全局中var一个变量，其实就是在window上面添加一个属性，这个属性保存的值就是我们设置的变量，也就是说我们声明的变量和环境记录是被添加到变量环境中的，v8中其实是通过VariableMap的一个hashmap来实现它们的存储的。window对象是早期的GO对象，在最新的实现中其实是浏览器添加的全局对象，并且一直保持了window和var之间值的相等性

:::

### 模板字符串

ES6允许我们使用字符串模板来嵌入JS的变量或者表达式来进行拼接，首先，我们会使用 `` 符号来编写字符串，称之为模板字符串，其次，在模板字符串中，我们可以通过 ${expression} 来嵌入动态的内容

```js
function fun(){
	const a = 123, b = '456'
	console.log(`这是a参数:${a}，这是b参数${b}`)
}
```



### 默认参数和剩余参数

在ES6之前，我们编写的函数参数是没有默认值的，所以我们在编写函数时，如果有默认值的需求，需要在函数内部判断赋值，而在ES6中，我们允许给函数一个默认值

```js
function fun(x = 20,y = 30){
	console.log(x,y)
}
foo(50,100)
foo()
```



在ES6之前，是设置了一个伪数组`arguments`对象来表示多个参数，[arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)是早期的ECMAScript中为了方便去获取所有的参数提供的一个数据结构。而ES6后，提供了`rest`参数来表示不定数量的参数，它与`arguments`的区别就在于`rest`参数是一个真正的数组，可以进行数组的所有操作，**该参数就是用来替代`arguments`的**

```js
function foo(m,n,...args){
	console.log(m,n)
	console.log(args)
}

foo(10,20,30,40)
```







### 新增的基本数据类型-Symbol

Symbol是ES6中新增的一个基本数据类型，翻译为符号

我们希望在其中添加一个新的属性和值，但是我们在不确定它原来内部有什么内容的情况下，很容易造成冲突，从而覆盖掉它内部的某个属性

Symbol值是通过Symbol函数来生成的，生成后可以作为属性名，Symbol生成的值是**独一无二**的

```js
const symbol1 = Symbol();
const symbol2 = Symbol(42);
const symbol3 = Symbol('foo');

console.log(typeof symbol1);
// expected output: "symbol"

console.log(symbol2 === 42);
// expected output: false

console.log(symbol3.toString());
// expected output: "Symbol(foo)"

console.log(Symbol('foo') === Symbol('foo'));
// expected output: false
```



### Proxy

**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

如果我们希望监听一个对象的相关操作，那么我们可以先创建一个代理对象（Proxy对象）

之后对该对象的所有操作，都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作



Proxy中最强大的就是它的捕获器（13个），这些捕获器完善了原来的存取器

```js
// 原来的监听对象的操作是对原来的对象进行操作，但是我们监听理论上是不应该去修改原来的对象的
// Proxy类中可以创建一个Proxy代理对象，这个时候就能想在原来对象上进行的监听统一在代理对象上实现
// 代理对象可以监听我们想要对原来对象进行的操作

const obj = {
    name: "lyf",
    age: 21,
}

// 第一个参数是想要代理的原对象
// 第二个参数是捕获器参数,一共有13个捕获器
const objProxy = new Proxy(obj,{
    // 获取值时的捕获器
    // target是原来的obj对象，key是原对象中的属性
    get: function(target,key){
        return target[key]
    },
    // 设置值的捕获器
    set: function(target,key,newValue){
        target[key] = newValue
    },
    // 监听in的捕获器
    has: function(target,key){
        return key in target
    },
    // 监听delete的捕获器
    deleteProperty: function(target,key){
        delete target[key]
    }
})

console.log(objProxy.name)
console.log(objProxy.age)

objProxy.name = "aaa"
objProxy.age = 22

console.log(obj.name)
console.log(obj.age)

// in操作符
console.log("name" in objProxy)

// delete操作
delete objProxy.age
console.log(obj)
```





### Reflect

由于历史原因，ECMA早期的ObjectAPI不是非常的完美，很多API是存在缺陷的，在早期的ECMA规范中没有考虑到这种对 **对象本身** 的操作如何设计会更加规范，所以将这些API放到了Object上面，但是Object作为一个构造函数，这些操作实际上放到它身上并不合适，所以在ES6中新增了Reflect，让我们这些操作都集中到了Reflect对象上

Reflect意思是反射，它是与proxy一一对应的，常见的方法可见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)

```js
const duck = {
  name: 'Maurice',
  color: 'white',
  greeting: function() {
    console.log(`Quaaaack! My name is ${this.name}`);
  }
}

Reflect.has(duck, 'color');
// true
Reflect.has(duck, 'haircut');
// false
```

Object上的方法Reflect基本都有，而且Reflect还可以和proxy一起配合使用

```js
const obj = {
    _name : "lyf",
    _age : 21,
    get name(){
        return this._name
    },
    set name(newValue){
        this._name = newValue
    }
}

const objProxy = new Proxy(obj,{
    // receiver就是当前objProxy对象，作用是改变原对象中get方法的this对象，改变为当前objProxy对象
    // 这样该get方法就会调用两次，第二次才会返回_name值，这样就能在Proxy中进行拦截操作
    get: function(target,key,receiver){
        console.log(receiver)
        return Reflect.get(target,key,receiver)
    },
    set: function(target,key,newValue,receiver){
        Reflect.set(target,key,newValue,receiver)
    }
})

// 在Reflect中访问的是对象中的get方法，在get内部才去访问_name
// 这样就会造成当我们访问对象的时候其实是绕过Proxy代理对象去原对象上访问的
// 这个时候我们想在代理对象中进行的一些拦截就无法实现
objProxy.name = 'aaa'
console.log(objProxy.name)
```



### Set

Set是一个新增的数据结构，可以用来保存数据，类似于数组，但是和数组的区别是元素不能重复，我们可以发现Set中存放的元素是不会重复的，那么Set有一个非常常用的功能就是给**数组去重**

Set常见的属性：

+ size：返回Set中元素的个数



Set常用的方法：

+ add(value)：添加某个元素，返回Set对象本身
+ delete(value)：从set中删除和这个值相等的元素，返回boolean类型
+ has(value)：判断set中是否存在某个元素，返回boolean类型
+ clear()：清空set中所有的元素，没有返回值
+ forEach(callback, [, thisArg])：通过forEach遍历set



```js
let mySet = new Set();

mySet.add(1); // Set [ 1 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add(5); // Set [ 1, 5 ]
mySet.add("some text"); // Set [ 1, 5, "some text" ]
let o = {a: 1, b: 2};
mySet.add(o);

mySet.add({a: 1, b: 2}); // o 指向的是不同的对象，所以没问题

mySet.has(1); // true
mySet.has(3); // false
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5);  // true，从 set 中移除 5
mySet.has(5);     // false, 5 已经被移除

mySet.size; // 4，刚刚移除一个值
```



除了`Set`还有`WeakSet`，`WeakSet` 对象是一些对象值的集合。且其与 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 类似，`WeakSet` 中的每个对象值都只能出现一次。在 `WeakSet` 的集合中，所有对象都是唯一的。

它和 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 对象的主要区别有：

- `WeakSet` **只能是对象**的集合，而不能像 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 那样，可以是任何类型的任意值。
- `WeakSet` 持*弱引用*：集合中对象的引用为*弱*引用。如果没有其它的对 `WeakSet` 中对象的引用，那么这些对象会被当成垃圾回收掉

对象的数量或它们的遍历顺序无关紧要，因此，`WeakSet` 比 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 更适合（和执行）跟踪对象引用，尤其是在涉及大量对象时





::: tip

**备注：** 这也意味着 `WeakSet` 中没有存储当前对象的列表。正因为这样，`WeakSet` 是不可枚举的

:::



### Map

`Map` 对象是键值对的集合。`Map` 中的一个键**只能出现一次**；它在 `Map` 的集合中是独一无二的。`Map` 对象按键值对迭代——一个 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环在每次迭代后会返回一个形式为 `[key，value]` 的数组。迭代按*插入顺序*进行，即键值对按 [`set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set) 方法首次插入到集合中的顺序（也就是说，当调用 `set()` 时，map 中没有具有相同值的键）进行迭代



Map的常用属性：

+ size：返回Map中元素的个数



Map的常用方法：

+ set(key, value)：在Map中添加key、value，并且返回整个Map对象
+ get(key)：根据key获取Map中的value
+ has(key)：判断是否包括某一个key，返回Boolean类型
+ delete(key)：根据key删除一个键值对，返回Boolean类型
+ clear()：清空所有的元素
+ forEach(callback, [, thisArg])：通过forEach遍历Map



```js
const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));
// expected output: 1

map1.set('a', 97);

console.log(map1.get('a'));
// expected output: 97

console.log(map1.size);
// expected output: 3

map1.delete('b');

console.log(map1.size);
// expected output: 2
```



和Map类型的另外一个数据结构称之为WeakMap，也是以键值对的形式存在的，WeakMap的key只能使用对象，不接受其他的类型作为key，WeakMap的key对对象想的引用是弱引用，如果没有其他引用引用这个对象，那么GC可以回收该对象，WeakMap也是不能遍历的



### for in/for of

**for...in语句**以任意顺序迭代一个对象的除[Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)以外的[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)属性，包括继承的可枚举属性。



for...in主要是用来获取key值，而想要获取value值可以使用for...of

```js
let arr = [1,2,3,4]

for(key in arr){
	console.log(key) // 0 1 2 3
}

for(value of arr){
	console.log(value) // 1,2,3,4
}
```





### Flat

flat和flatmap是ES10新增的内置对象，意为降维数组

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组

```js
// flat的使用
const arr = [1,2,3,[20,30],[[109,3],[22,67]]]
const newarr = arr.flat()
console.log(newarr)

const newarr2 = arr.flat(2)
console.log(newarr2)

// flatMap的使用
const nums2 = [10,20,30]
const newnums2 = nums2.flatMap(item => {
    return itme * 2
})


// flatMap的应用场景
const message = ["hello world","hello lyf"]
const words = message.flatMap(item => {
    return item.split(" ")
})
```



### Optional Chaining

在使用`||`的时候，开发者发现该判断是存在缺陷的，即`0`与`""`都会判断为`undefined`或`null`，而有些时候我们需要这两个值而不是`undefined`或`null`，所以提供了`?.`可选链的方式去判断前面的值是否为真的`undefined`或`null`，而且该语法还可以链式判断

```js
const obj = {
	name: "",
	age: 0,
	deepObj: {
		deepObj2: {
			name: 'lyf'
		}
	}
}

console.log( obj.age || obj.name) // undefined
console.log( obj ?. age) // 0

// 如果对象中的某个属性删除了，则需要判断该属性是否存在
// 原始判断
if(obj && obj.deepObj && obj.deepObj.deepObj2 && obj.deepObj.deepObj2.name){
	console.log(obj.deepObj.deepObj2.name)
}

// 利用？.的方式判断,不需要用if去判断undefined
console.log(obj ?. deepObj ?. deepObj2 ?.name )
```







## Promise

[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 是ES6新增的一个类，也可以是一个对象，它代表了一个异步操作的最终完成或者失败，它的出现是为了解决在ES5的时候没有能够解决[回调地狱](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E9%93%BE%E5%BC%8F%E8%B0%83%E7%94%A8)的问题。

本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor，这个回调函数会被立即执行，并传入另外两个回调函数作为参数

整体Promise的使用过程可以划分为三个状态：

+ 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝，即执行executor中的代码的时候
+ 已兑现（fuluilled）：成功状态，即已经兑现，操作成功，执行了resolve函数时处于该状态
+ 已拒绝（rejected）：失败状态，即已经失败，操作失败，执行了reject函数时处于该状态



```js
const mypromise = new Promise((resolve,reject) => {
	
	console.log('当前为pending状态，该代码会立刻执行')
	
	resolve('当前为fuluilled状态，该字符串会作为参数传递到then中')
}).then((res) => {
	// 这里的res就是上面resolve的参数
	console.log(res)
	
	reject('当前为rejected状态，该字符串会作为参数传递到下一个then或者catch中')
}).catch((err) => {
	console.log(err)
})

mypromise.then(() => {
    console.log('当前promise还可以继续链式调用')
})
```



::: tip

then方法本身是有返回值的，它的返回值是一个promise，所以我们可以进行链式调用。而then中的代码在**事件循环**中处于**微任务队列**

:::



Promise方法的原型上还设置了许多扩展的API，可以查看[其他API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95)，常见的有finally，all，race



### 手写Promise

下面我们来手动实现一个简单的Promise：

```js
// Promise结构的设计
// 定义Promise的三种状态    
const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 自定义Promise类
class LPromise{
    // 构造函数中有一个executor作为参数，而这个就是Promise的回调函数
    constructor(executor){
        // 在构造函数内部将要设置的状态以及resolve和reject时的参数
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined

        // 创建一个resolve函数，这个函数接收一个参数，这个参数就是resolve需要传递的值
        const resolve = (value) => {
            // 判断一下当前Promise的状态
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_FULFILLED
                // 调用了queueMicrotask方法，这里的参数是一个回调函数，能保证这个回调函数会在下面then中调用
                // 这里的queueMicrotask是一个微任务
                queueMicrotask(() => {
                    this.value = value
                    this.onfulfilled(this.value)
                })
            }
        }

        // 与上面的resolve同理
        const reject = (reason) => {
            if(this.status === PROMISE_STATUS_PENDING){
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(() => {
                    this.reason = reason
                    this.onrejected(this.reason)
                })
            }
        }

        // 这个构造函数内部会执行这个回调函数，并且将resolve和reject这两个函数作为参数
        executor(resolve,reject)
    }

    // 在Promise类中定义then方法，要求传入两个回调函数，然后将这两个回调函数保存到Promise上
    then(onfulfilled,onrejected){
        this.onfulfilled = onfulfilled
        this.onrejected = onrejected
    }
    
}


// 创建一个promise对象
const promise = new LPromise((resolve,reject) => {
    // 检测构造函数executor是否有立即调用
    console.log("传入的函数被调用了")
    // 检测resolve和reject
    resolve(111)
    reject()
})

// 使用promise的then方法
promise.then(res => {
    console.log(res)
},err => {
    console.log(err)
})
```





## Iterator-Generator

### 迭代器

迭代器（iterator），是确使用户可在容器对象（container，例如链表或数组）上遍访的对象，使用该接口无需关心对象的内部实现细节。从迭代器的定义我们可以看出来，迭代器是帮助我们对某个数据结构进行遍历的对象。



在JavaScript中，迭代器也是一个具体的对象，这个对象需要符合迭代协议（iterator protocol）：

+ 可迭代协议

  + **可迭代协议**允许 JavaScript 对象定义或定制它们的迭代行为，例如，在一个 [`for..of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 结构中，哪些值可以被遍历到。一些内置类型同时是[内置可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#内置可迭代对象)，并且有默认的迭代行为，比如 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 或者 [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，而其他内置类型则不是（比如 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object))）
  + 要成为**可迭代**对象，一个对象必须实现 **@@iterator** 方法。这意味着对象（或者它[原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)上的某个对象）必须有一个键为 `@@iterator` 的属性，可通过常量 [`Symbol.iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 访问该属性
  + 当一个对象需要被迭代的时候（比如被置入一个 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环时），首先，会不带参数调用它的 `@@iterator` 方法，然后使用此方法返回的**迭代器**获得要迭代的值

+ 迭代器协议

  + **迭代器协议**定义了产生一系列值（无论是有限个还是无限个）的标准方式。当值为有限个时，所有的值都被迭代完毕后，则会返回一个默认返回值。
  + 只有实现了一个拥有以下语义（semantic）的 **next()** 方法，一个对象才能成为迭代器：

  1. 返回一个有下面两个属性的对象
  2. done（对象1）：如果迭代器可以产生序列中的下一个值，则为 false。如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的，如果它依然存在，即为迭代结束之后的默认返回值
  3. value（对象2）：迭代器返回的任何 JavaScript 值。done 为 true 时可省略



下面来简单实现一个迭代器：

```js
// 数组
const names = ["123","456","789"]
// 设置索引
let index = 0

const namneIterator = {
    next: function(){
        // return {done: false,value: 123}
        // return {done:false,value:456}
        // return {done:false,value:789}
        // return {done:true,value:undefined}
        if(index < names.length){
            return {done: false,value: names[index++]}
        }else{
            return {done:true,value:undefined}
        }
    }
    @@iterator：function(){
    	return next()
	}
}	
// 相当于for循环遍历这个对象
console.log(namneIterator.next())
console.log(namneIterator.next())
console.log(namneIterator.next())
console.log(namneIterator.next())
console.log(namneIterator.next())
```

::: tip

迭代器的中断：

迭代器在某些情况下会在没有完全迭代完的情况下中断的，比如`break`，`return`，如果想要监听中断事件，可以在迭代器内部添加一个`return`方法，该方法和`next`同级

:::

### 生成器

虽然自定义的迭代器是一个很有用的工具，但是在创建时需要谨慎，因为需要显式地维护其内部状态，即自主设置next，return等符合协议的方法以及对象状态，这个时候生成器就孕育而生了，生成器提供了一个强大的选择：**允许定义一个包含自由迭代算法的函数，即next函数，同时它还可以自动维护自己的状态**。

生成器函数使用`function*`语法编写，最初调用时，生成器函数不执行任何代码，而是返回一种称为 Generator 的迭代器。通过调用生成器的下一个方法消耗值时，Generator 函数将执行，直到遇到 yield 关键字

```js
const names = ["123","456","789"]

function* Generator(arr){
	for(let i =0;i<arr.length;i++){
		yield arr[i];
	}
}

let a = Generator(names)
a.next() // {value: "123",done: "false"}
a.next() // {value: "456",done: "false"}
a.next() // {value: "789",done: "false"}
a.next() // {value: "underfined",done: "true"}
```





当然，我们也可以用生成器来设置参数来修改其内部状态，传递给next的值会被yield接收，需要注意的是，**第一个next默认不接收参数，传入的参数会被忽略**

下面是一个斐波那契数列生成器例子：

```js
function* fibonacci() {
  var fn1 = 0;
  var fn2 = 1;
  while (true) {
    var current = fn1;
    fn1 = fn2;
    fn2 = current + fn1;
    var reset = yield current;
    if (reset) {
        fn1 = 0;
        fn2 = 1;
    }
  }
}

var sequence = fibonacci();
console.log(sequence.next().value);     // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
console.log(sequence.next().value);     // 3
console.log(sequence.next().value);     // 5
console.log(sequence.next().value);     // 8
console.log(sequence.next(true).value); // 0
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 1
console.log(sequence.next().value);     // 2
```





## async/await

async 函数是使用`async`关键字声明的函数。async 函数是 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 构造函数的实例，并且其中允许使用 `await` 关键字。`async` 和 `await` 关键字让我们可以用一种更简洁的方式写出基于 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 的异步行为，而无需刻意地链式调用 `promise`，它诞生的目的就是为了简化使用基于`promise`的API时所需的语法



async 函数可能包含 0 个或者多个 [`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 表达式。await 表达式会暂停整个 async 函数的执行进程并出让其控制权，只有当其等待的基于 promise 的异步操作被兑现或被拒绝之后才会恢复进程。promise 的解决值会被当作该 await 表达式的返回值。使用 `async`/`await` 关键字就可以在异步代码中使用普通的 `try`/`catch` 代码块



我们可以简单利用[babel.js](https://babel.docschina.org/)将`async`和`await`转换成ES5的语法，看看源码里是如何实现这个语法糖的

```js
async function foo() {
  await 1
  await 2
  await 3
}
```

```js
function foo() {
  return _foo.apply(this, arguments);
}
function _foo() {
  _foo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          // await对应的语句
          case 0:
            _context.next = 2;
            return 1;
          case 2:
            _context.next = 4;
            return 2;
          case 4:
            _context.next = 6;
            return 3;
          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _foo.apply(this, arguments);
}
```

可以看到，`async`实际上就是二次封装了`Generator`，利用异步的生成器，通过`next`的方式来实现类似排队的操作









## JS中的事件循环

JavaScript 有一个基于**事件循环**的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。这个模型与其它语言中的模型截然不同，比如 C 和 Java

JavaScript代码在执行过程中，除了依靠函数调用栈来决定函数的执行顺序外，还依靠了任务队列（`task queue`）来搞定异步代码的执行，这整个执行过程称为事件循环。在事件循环期间，运行时最先进入队列的任务会优先执行，被执行完的消息会被移出队列，并作为输入参数来调用与之关联的函数，每次事件循环完都会检查是否还有任务，如果有则继续下一轮，无则结束循环



![JS事件循环](/images/js/1.svg)

一个线程中，事件循环是唯一的，但是任务队列可以拥有多个。任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs

| macro-task(宏任务) | micor-task(微任务)            |
| ------------------ | ----------------------------- |
| script(整体代码)   | process.nextTick              |
| setTimeout         | Promise                       |
| setInterval        | Async/Await(实际就是promise)  |
| setImmediate       | MutationObserver(html5新特性) |
| I/O                |                               |
| UI render          |                               |



::: tip

以 0 为第二参数调用 `setTimeout` 并不表示在 0 毫秒后就立即调用回调函数，其等待的时间取决于队列里待处理的消息数量，也就是说同样的一个setTimeout（不设置第二参数）可能优先级会比以0为第二参数的setTimeout高

:::



JavaScript 的事件循环模型与许多其他语言不同的一个非常有趣的特性是，它永不阻塞。处理 I/O 通常通过事件和回调来执行，所以当一个应用正等待一个 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 查询返回或者一个 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 请求返回时，它仍然可以处理其它事情，比如用户输入



## 路由

了解路由前，我们需要先了解什么是SPA

**SPA**，即**单页面应用**(Single Page Application)。所谓单页 `Web` 应用，就是只有一张 `Web` 页面的应用。单页应用程序 (SPA) 是加载单个 `HTML` 页面并在**用户与应用程序交互时**动态更新该页面的 `Web` 应用程序。浏览器一开始会加载必需的 `HTML` 、 `CSS` 和 `JavaScript` ，所有的操作都在这张页面上完成，都由 `JavaScript` 来控制

在单页面中要实现无感刷新跳转和交互，这就是前端路由的诞生的目的，最早是和`Ajax`配合使用的，后来随着技术的更新迭代，浏览器更新了自带的路由API后，就成为了如今的前端路由

如今的路由一般有两种模式：`hash`和`history`

### hash

Hash的特点：

+ hash变化会触发网页跳转，即浏览器的前进和后退。
+ `hash` 可以改变 `url` ，但是不会触发页面重新加载（hash的改变是记录在 `window.history` 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 `http` 请求，所以这种模式不利于 `SEO` 优化。`hash` 只能修改 `#` 后面的部分，所以只能跳转到与当前 `url` 同文档的 `url` 
+ `hash` 通过 `window.onhashchange` 的方式，来监听 `hash` 的改变，借此实现无刷新跳转的功能
+ `hash` 永远不会提交到 `server` 端（可以理解为只在前端自生自灭）



利用浏览器提供的API简单实现一个hash路由：

```html
// 实现简单的hash路由
<div id="app">
        <a href="#/home">首页</a>
        <a href="#/about">关于</a>

        <div class="router-view"></div>
</div>

    <script>
        const routerView = document.getElementsByClassName("router-view")[0]

        window.addEventListener("hashchange",() => {
            switch(location.hash) {
                case "#/home":
                    routerView.innerHTML = "首页"
                    break;
                case "#/about":
                    routerView.innerHTML = "关于"
                    break;
                default:
                    routerView.innerHTML = ""
            }
        })
    </script>
```



### history

History的特点：

+ 新的 `url` 可以是与当前 `url` 同源的任意 `url` ，也可以是与当前 `url` 一样的地址，但是这样会导致的一个问题是，会把**重复的这一次操作**记录到栈当中
+ 通过 `history.state` ，添加任意类型的数据到记录中。
+ 可以额外设置 `title` 属性，以便后续使用。
+ 通过 `pushState` 、 `replaceState` 来实现无刷新跳转的功能



利用浏览器提供的API简单实现一个history路由：

```html
// 实现history路由
<div id="app">
        <a href="/home">首页</a>
        <a href="/about">关于</a>

        <div class="router-view"></div>
    </div>

    <script>
        // 获取routerview的DOM
        const routerView = document.getElementsByClassName("router-view")[0]

        // 获取所有的a元素，自行监听a元素的改变
        const aEls = document.getElementsByTagName("a")
        for (let el of aEls){
            el.addEventListener("click",e => {
                // 阻止事件的原生绑定事件
                e.preventDefault()
                console.log("a元素发生了点击")
                // 动态获取a元素上的href属性
                const href = el.getAttribute("href")
                // 第三个参数就是改变的url，且整个过程页面没有刷新
                history.pushState({},"",href)
                UrlChange()
            })
        }

        // 执行返回操作时，依然调用UrlChange
        // go 和 pushState不能通过该方法监听到
        window.addEventListener("popstate",UrlChange)

        // 监听url的改变
        function UrlChange() {
            console.log(location.pathname)
            switch(location.pathname) {
                case "/home":
                    routerView.innerHTML = "首页"
                    break;
                case "/about":
                    routerView.innerHTML = "关于"
                    break;
                default:
                    routerView.innerHTML = ""
            }
        }
    </script>
```





对于 `history` 来说，确实解决了不少 `hash` 存在的问题，但是也带来了新的问题。**具体如下：**

+ 使用 `history` 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 `url` ，就会出现 `404` 的页面。
+ 而对于 `hash` 模式来说，  它虽然看着是改变了 `url` ，但不会被包括在 `http` 请求中。所以，它算是被用来指导浏览器的动作，并不影响服务器端。因此，改变 `hash` 并没有真正地改变 `url` ，所以页面路径还是之前的路径， `nginx` 也就不会拦截。
+ 因此，在使用 `history` 模式时，需要**通过服务端来允许地址可访问**，如果没有设置，就很容易导致出现 `404` 的局面



::: tip

`to B` 的系统推荐用 `hash` ，相对简单且容易使用，且因为 `hash` 对 `url` 规范不敏感。`to C` 的系统，可以考虑选择 `H5 history` ，但是需**要服务端支持**；能先用简单的，就别用复杂的，**要考虑成本和收益**。

:::





## 懒加载/预加载

**懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式**。用户滚动到它们之前，可视区域外的图像不会加载。资源预加载是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。**预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源**



懒加载原理：

首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中， 当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。



预加载原理：

通过设置link标签中的rel为preload即可将引入脚本预加载





## 防抖/节流

防抖（Debounce）和节流（Throttle）都是用来控制某个函数在一定时间内触发次数，两者都是为了减少触发频率，以便提高性能或者说避免资源浪费。毕竟JS操作DOM对象的代价还是十分昂贵的

应用场景：处理一些频繁触发的事件，例如mousedown、mousemove、keyup、keydown等，不然的话，页面很可能会十分卡顿哦~



防抖就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```javascript
function debounce(fn,delay){
  			//开始
  			let timerId = null
  			return function(){
  				const context = this
                const args = arguments
                //判断是否有定时器在执行，有就清空
  				if(timerId){
  					//在接收到指令的情况下重新计算函数执行时间
  					window.clearTimeout(timerId)
  				}
  				//没有接收到指令，派发事件，时间自定义
  				timerId = setTimeout(() => {
  					fn.apply(context,args)
  					timerId = null
  				},delay)
  			} 
		}
```

::: tip

频繁操作点赞和取消点赞，因此需要获取最后一次操作结果并发送给服务器；search搜索联想，用户在不断输入值时…

:::



节流就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率

```js
function throttle(fn,delay){
  			//定义开关
  			let canUse = true
  		
  			return function(){
  				if(canUse){
  					//关闭开关
  					canUse = false
  					//定时打开开关，时间自定义
  					setTimeout(() => {
                        //触发事件
                        fn.apply(this,arguments);
                        canUse=true
                    },delay)
  				}else{
                      return ;
                }
  			}
			
  		}
```

::: tip

一般是onrize，onscroll等这些频繁触发的函数，比如你想获取滚动条的位置，然后执行下一步动作；鼠标不断点击触发，mousedown(单位时间内只触发一次)…

:::

## 深拷贝/浅拷贝

深拷贝和浅拷贝实际上就是引用对象的不同形式，因为一个变量名可以是指针，这就意味着两个不同的变量可能所指的内存地址是相同的。如果我们想要拷贝一个完全一样内容的值但内存地址不一样，那这种拷贝就叫做**深拷贝**，而不同指针对应相同内存地址的拷贝则叫**浅拷贝**



```js
// 深拷贝JSON快速实现
const deepObj = JSON.parse(JSON.stringify(obj))

// 递归算法实现深拷贝
function deepCopy(obj) {
			//创建一个新的对象
			var newObj = {}
			//遍历循环obj中所有的属性
			for(var key in obj){
				console.log(key)
				//检查对象中是否含有该属性
				if(obj.hasOwnProperty(key) ==true){
					//instanceof运算符用来判断一个构造函数的prototype属性所指向的对象
					//是否存在另外一个要检测对象的原型链上
					
					console.log(obj[key])
					//判断属性值是否为对象,如果是则递归，如果不是则将属性值赋值给新对象
					if(obj[key] instanceof Object){
						newObj[key] = deepCopy(obj[key])
					}
					else{
						newObj[key] = obj[key]
					}
				}
			}
			return newObj;
		}

// 浅拷贝
const obj3 = Object.assign({},obj)
```



::: tip

- 从服务器fetch到数据之后将其存放在store中，通过props传递给界面，然后我需要对这堆数据进行修改，那涉及到的修改就一定有保存和取消，所以我们需要将这堆数据拷贝到其它地方。
- 当你想使用某个对象的值，在修改时不想修改原对象，那么可以用深拷贝弄一个新的内存对象

:::



## js额外知识



### 严格模式

Javascript提供了一种具有限制性的模式来使代码隐式地脱离"懒散（sloppy）模式"，支持严格模式的浏览器在检测代码中有严格模式时，会以更加严格的方式对代码进行检测和执行，任何不符合规范写法的代码警告都会被浏览器提交到控制台

严格模式通过 **抛出错误** 来消除一些原有的 静默（silent）错误，同时严格模式让JS引擎在执行代码时可以进行更多的优化（不需要对一些特殊的语法进行处理）

```js
"use strict"

var message = "hello world"
console.log(message)
// 静默错误
true.foo = "abc"
```



### 响应式原理（Vue2）

说起响应式原理，那肯定要说到Vue框架，该框架最著名的就是它的响应式系统，它能够在组件中自动跟踪变量的变化，是不是很神奇，那我们来看看响应式是如何实现的



响应式其实就是当我们定义了一个变量，当受到某些回调函数触发而改动时，我们希望与该变量绑定的事件也重新执行，就是说在哪里用到这个变量，就执行哪部分的代码，这样就可以不需要我们再手动进行更新，而是通过响应式来帮助我们自动更新



Vue2中的响应式其实就是前面所学的存取描述符，通过重写Get和Set来帮助我们完成操作

```js
// 保存当前需要收集的响应式函数
// 注意如果没有操作执行的话全局的activeReactiveFn应该为null
// 这样这个函数收集体就会被垃圾回收GC回收掉，是一个虚拟对象
let activeReactiveFn = null

// 定义一个Depend类来收集依赖
class Depend{
    constructor(){
        // 不使用[]的原因是因为在依赖函数中如果调用多次请求同一个对象的属性，则会调用多次
        // Set则不会重复元素的添加，这样函数在多次请求同一个对象的属性时就只会执行一次
        this.reactiveFns = new Set()    
    }

    // notify主要是用来获取reactiveFns中要执行的响应式函数再执行
    notify(){
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }

    // 给depend对象中添加响应函数
    // 当activeReactiveFn存在收集到的函数，就将该函数添加到reactiveFns集合中
    depend(){
        if(activeReactiveFn){
            this.reactiveFns.add(activeReactiveFn)
        }
    }
}

// 封装一个获取depend函数
// 创建一个WeakMap对象用来收集函数与对象的映射关系
const targetMap = new WeakMap()
function getDepend(target,key){
    const map = targetMap.get(target)
    if(!map){
        map = new Map()
        targetMap.set(target,map)
    }

    // 根据key获取depend对象
    const depend = map.get(key)
    if(!depend){
        depend = new Depend()
        map.set(key,depend)
    }
    return depend
}

// 封装一个响应式函数
// 这个函数主要是用来收集要执行的函数，然后赋值给activeReactiveFn，再执行函数体
// 每收集完一次最后收集完要清空activeReactiveFn以便做下一次收集
function watchFn(fn){
    activeReactiveFn = fn
    // 当fn执行的时候，在执行的过程中就是在访问对象中的get方法，此时会将该方法体添加到集合reactiveFns中
    // 最后get方法会返回通过Reflect的get方法得到的对应原函数中的值
    fn()
    activeReactiveFn = null
}

// 设置需要响应式的函数并关联到对应的依赖中
watchFn(function() {
    console.log(obj1.name,"获取第一个对象的name")
})

watchFn(function(){
    console.log(obj1.age,"获取第一个对象的age")
})

watchFn(function(){
    console.log(obj2.name,"获取第二个对象的name")
})

watchFn(function(){
    console.log(obj2.age,"获取第二个对象的age")
})


function reactive(obj){
    // 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
    Object.keys(obj).forEach(key => {
        Object.defineProperty(obj,key,{
            get: function(){
                const depend = getDepend(obj,key)
                depend.depend()
                return value
            },
            set: function(newValue){
                value = newValue
                const depend = getDepend(obj,value)
                depend.notify()
            }
        })
    })
}

// 对象的响应式
// 创建一个对象，这个对象是作为reactive函数的参数传进去的
// 而这个reactive函数就是通过Proxy来监听对象的一个函数
const obj1 = reactive({
    name: 'lyf',
    age: 21
})

const obj2 = reactive({
    name: 'aaa',
    age: 222
})

// 触发响应式系统
obj1.name = 'aaa'
obj2.name = 'lyf'
```

::: tip

Vue2的原理中响应式是使用的`Object.defineProperty`这个API，但是该API是具有缺陷的，监听嵌套层级过深的对象会极大的影响性能，没错，这个就是Vue2中数组的缺陷，不是监听不到数组，而是出于性能考虑，没用通过它来实现数组响应式，所以官方是修改了原生数组的方法，并且提供了API去完善这一缺点，其次，存取器只能对自身存在的属性修改才会去劫持，所以对象新增和删除的属性无法监听，官方也对应提供了新的方法来弥补API的缺陷

:::





### 响应式原理（Vue3）

在上文Vue2响应式的学习中，如果已经开始工作的小伙伴肯定会发现Vue2中所谓的响应式并不是完美的，而是存在一定缺陷的，导致这种结果的根本是出在`Object.defineProperty`API上，那么，我们可以来想一想，要实现响应式，我们该如何去监听呢？

官方提供了一个新的JS内置对象来弥补甚至是代替原来ObjectAPI上的缺陷，之前学的Proxy就是用来代替该API的，**Proxy** 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）



proxy上的捕获器有整整13种，下面来简单看一下Proxy的捕获器

```js
// 原来的监听对象的操作是对原来的对象进行操作，但是我们监听理论上是不应该去修改原来的对象的
// Proxy类中可以创建一个Proxy代理对象，这个时候就能想在原来对象上进行的监听统一在代理对象上实现
// 代理对象可以监听我们想要对原来对象进行的操作

const obj = {
    name: "lyf",
    age: 21,
}

// 第一个参数是想要代理的原对象
// 第二个参数是捕获器参数,一共有13个捕获器
const objProxy = new Proxy(obj,{
    // 获取值时的捕获器
    // target是原来的obj对象，key是原对象中的属性
    get: function(target,key){
        return target[key]
    },
    // 设置值的捕获器
    set: function(target,key,newValue){
        target[key] = newValue
    },
    // 监听in的捕获器
    has: function(target,key){
        return key in target
    },
    // 监听delete的捕获器
    deleteProperty: function(target,key){
        delete target[key]
    }
})

console.log(objProxy.name)
console.log(objProxy.age)

objProxy.name = "aaa"
objProxy.age = 22

console.log(obj.name)
console.log(obj.age)

// in操作符
console.log("name" in objProxy)

// delete操作
delete objProxy.age
console.log(obj)
```



通过这个新的API，就能够弥补Vue2中的缺陷，让我们来重写Vue响应式中的`reactive`方法吧

```js
function reactive(obj){
    // 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
    const objProxy = new Proxy(obj,{
        get: function(target,key,receiver){
            // 根据target和key获取对应的depend
            const depend = getDepend(target,key)
            
            // 执行依赖中的depend方法来将要执行的函数添加到reactiveFns
            // 注意，在get方法中不会调用响应式函数，就是不会执行notify函数
            depend.depend()

            console.log(receiver)
            return Reflect.get(target,key,receiver)
        },
        set: function(target,key,newValue,receiver){
            Reflect.set(target,key,newValue,receiver)
            // 根据target和key获取对应的depend
            const depend = getDepend(target,key)

            // 执行依赖中收集到的notify函数并执行
            depend.notify()
        }
    })
}
```

::: tip

这就是Vue3的响应式原理，在收集依赖和依赖的设置基本上都相同，当然源码肯定会比我手写的复杂的多，当前代码仅供学习参考

::: 