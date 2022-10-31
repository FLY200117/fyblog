# 基础

[[toc]]



typescript是一种JavaScript的超集，简单来说ts文件最终也是会被编译成ts文件的，由于ts是弱语言，而且没有编译阶段，所以使得我们的代码质量参差不齐，比如我们能经常看到这样一条错误语句 `number.length`，这在其他强语言上是不能运行的，在编译阶段就会报错，但是JavaScript不同，只有在运行代码完成后才会报错，相比其他强语言，JavaScript缺少了一个编译过程，这让js本身就变得危险许多，因为js中存在隐式转换，如果运行了错误代码，那么项目是不能正常运行的。



typescript其实就相当于一种编译过程，它让js的编写更加规范，能给大型项目带来更高的可维护性，以及更少的bug，但请记住，typescript是js的一种超集，它们都是弱类型，而且tyepscript和eslint并不一样，eslint主要负责代码规范，ts负责类型检测





## 原始数据类型

js中有几种常见的基础类型，让我们来看看在ts中该如何声明这些基础

```typescript
let isBoolean: boolean = false
let isNumber: number = 123
let isString: string = 'lyf'
let isNull: null = null
let isUndefined: undefined = undefined

// any类型的数据不会被typescript所约束类型，需谨慎使用
// 如果一个变量在声明的时候未指定其类型且没有赋值，那么它会被识别为任意类型
// 如果赋值了就会按照值的类型去默认变量的类型
let Nobind: any = 123
Nobind = 'lyf'

// 可以用void来表示一个没有返回值的函数
function noreturnvalue(): void{
    console.log('我没有任何返回值')
}
```





## 类型推论

类型推论就是ts在没有明确的指定类型的时候推测出一个类型，这就是类型推论



下面代码在编译成js文件之前会报错，原因是不能将一个字符串赋值给一个number的类型

因为在定义的时候ts自动类型推论出`height`为`number`类型，所以不能再继续赋值

```typescript
let height = 12345
height = '111'

// 实际上上面代码等于下面的代码，不进行指定类型时ts会进行类型推论
let height：number = 12345
height = '111'
```



如果我们声明了一个变量但没有赋值，这个时候ts会将这个变量类型推论成`any`

```typescript
let height 
height = 12345
height = '123'
```



## 联合类型

联合类型表示取值可以为多种类型中的一种

```typescript
let isStringOrNumber: string | number
isStringOrNumber = 'lyf'
isStringOrNumber = 123 
```

当typescript不确定一个联合类型的变量到底时哪一个类型的时候，**只能访问此联合类型的所有类型里共有的属性或方法**

```typescript
// 当要确定联合类型的确切类型时，只能访问此联合类型的所有类型里共有的属性或者方法
function getLength(value: string | number):string{
    return value.toString();
}
```





## 接口（对象类型）

在ts中，一般使用接口来定义一个对象的类型，而接口这个概念在很多面向对象语言中都有，它是一个对行为的抽象，它不负责谁来通过，它只负责通过的类型

```typescript
interface Person{
    name: string,
    age: number
}

// 接口规范的数据格式必须符合，属性不能多也不能少
let Lyf: Person = {
    name: 'lyf',
    age: 123
}
```



如果我们想要让某个属性可选，可以通过？的方式来实现

```typescript
// 通过？的方式来将一个属性变得可选，可选并不代表能添加未知属性
interface Person2 {
    name: string,
    age?: number
}

let lyf2: Person2 = {
    name: 'lyf'
}
```



如果我们希望一个接口能有任意属性，可以使用下面的方式

```typescript
interface Person3 {
    name: string,
    age?: number,
    [propName: string]: any
}

let lyf3: Person3 = {
    name: 'lyf',
    phone: 110
}
```

::: tip

一个接口中只能定义一个任意属性

:::

如果需要有多个类型的属性，可以使用联合类型：

```typescript
interface Person4 {
    name: string,
    age: number,
    [propname: string]: string | number
}

// 如果希望对象中的一些字段只能在创建的时候赋值，可以使用readonly定义
interface Person5 {
    readonly name: string,
    age: number
}
```





## 数组

由于在ts中是有元组的存在的，所以ts中的数组里不允许出现其他类型的值

通常是使用 `类型 + 方括号` 来表示一个数组：

```typescript
// 定义一个数字类型的数组
let arr1: number[] = [1,2,3]
```



同时，我们也可以使用数组泛型来定义一个数组：

```typescript
// 泛型定义数组
let arr2: Array<number> = [1,2,3]
```



在ts中也可以定义一个类元组的数组，即表示数组允许出现任何类型：

```typescript
// 允许出现任何类型
let arr3: any[] = [1,'2',3]
```





## 函数

在js中，函数的定义通常有两种，一种是函数声明，一种是函数表达式

在ts里定义一个函数需要把输入输出都考虑进去，输出一般跟在接收参数的括号后面

```typescript
function sum(x:number,y:number): number {
    return x + y;
}
```



参数方面，ts还能使用？来表示一个参数可选，通过=来设置参数的默认值

```typescript
// 函数还可以如下定义，和上述的定义是一样的
// 使用？可选的时候，需要注意后面不能再跟必需参数
let sum2: (x:number=123,y?:number=456) => number = function (x,y){
    return x + y;
}
```



还可以通过接口来定义一个函数：

```typescript
interface funinterface {
    (source: string,subString: string): boolean;
}

let fun: funinterface
fun = function(source: string,subString: string){
    return true
}
```





## 断言

类型断言可以用来手动指定一个值的类型： `值 as 类型 or <类型>值`

类型断言的好处：

1. 在联合类型中，如果我们不能确定联合类型的变量类型到底是哪一个的时候，只能访问该联合类型的共有属性或方法，如果想访问其中一个类型特有的方法或属性时，就可以使用类型断言

   ```typescript
   interface Cat {
       name: string
   }
   
   interface Fish {
       age: number
   }
   
   function isCat (animal: Cat | Fish) {
       return (animal as Cat).name;
   }
   ```

   

2. 将一个父类断言为更加具体的子类，如果我们知道了具体某一个子类，可以直接断言为子类并访问子类扩展的属性和方法

   ```typescript
   interface smallCat extends Cat {
       age: number;
   }
   
   interface bigCat extends Cat {
       size: string
   }
   
   function Cattype(type: Cat) {
       return (type as smallCat).age
   }
   ```

   

3. 如果在某些情况下我们想创建一个不存在的属性并赋值，可以使用as any（不推荐）

   ```typescript
   (window as any).foo = 1
   ```

   

::: tip

断言是具有限制的，如果A兼容b，那么A能断言成B，B也可以断言成A。 类型断言不是类型转换，它并不会真正影响到变量的类型

:::





## 声明文件

一般来说，声明语句是声明一些全局的变量或者方法的语法，而通常我们会将声明语句单独放到一个文件中来统一管理，该文件就叫做声明文件

**声明文件必须以`.d.ts`为后缀**

ts在解析编译所有.ts文件时，会将声明文件提到全局中，这样其他所有的ts文件都能访问到声明文件中

常用的声明语句：

```typescript
// 全局
declare var a:any;  // 全局变量 // 一般全局的变量都是const，是不允许在其他地方修改的
declare function fun():void // 全局方法
declare class myClass {} // 全局类
declare enum myEnum {} // 全局枚举类型
declare namespace myObj {} // 全局对象（具有子属性）
interface myInterface {} // 全局接口
type myType = {} // 全局类型
```







## 内置对象

js中有很多内置对象，这些内置对象在ts中也有相对应的类型，主要分为三大类：

1. js中的内置对象：

   ```typescript
   // ES+扩展的一些内置对象
   let b:Boolean = new Boolean(1);
   let e:Error = new Error('Error');
   let d:Date = new Date()
   let r:RegExp = /[a-z]/
   ```

   

2. DOM和BOM的内置对象：

   ```typescript
   // DOM和BOM的内置对象
   let body:HTMLElement = document.body
   let allDiv:NodeList = document.querySelectorAll('div');
   document.addEventListener('click',(e: MouseEvent):void => {
       // callbackEvent
   })
   ```

   

::: tip

typescript核心中并不包含Node模块，如果需要，则需引入第三方npm包

```
npm i @types/node --save-dev
```

:::