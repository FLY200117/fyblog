# 进阶

[[toc]]



## 类型别名

在编写ts的时候，可以将一个类型或者联合类型设置别名，这样在使用的时候就能复用这些类型

```typescript
// 可以用type来给一个类型设置别名，这样在使用的时候就不需要编写一些很长的类型；例如联合类型和继承类型
type Name = string;
type NameResolver = () => string
function getname(n: NameResolver):Name{
    if(typeof n === 'string'){
        return n;
    }else{
        return n()
    }
}
```







type同时还能用来定义字符串字面量，在使用的时候就可以对字符串进行约束

```typescript
// 同时type也可以用来定义字符串字面量，在使用的时候就能对字符串进行详细约束
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(el: Element,e: EventNames){

}

handleEvent(document.getElementById('h1'),'click')
```



type之间也能相互继承，但是继承的语法与接口和类不同，想要继承自其他type需要使用`&`

```typescript
type Cat = {
	name: string
}

type SmallCat = Cat & {
	body: string
}
```



type是不能重载的，一个type在被定义后就不能再次更改

### Keyof

keyof类型运算符接收一个对象类型，并且会产生**其键**的**字面量**联合

```typescript
type a = {
    x: number,
    y: string
}

// keyof运算符后面跟一个type类型，会生成其键的字面量联合，下面的b类型与"x"|"y"相同
type b = keyof a
type b = 'x' | 'y'

function foo (arg: b): void{
    console.log(arg.length)
}
```



如果对象中的键是string或者number类型时，keyof则会返回这些类型

```typescript
type Aobj = {
	[n:number]: unknown;
}
// 下面两种表示方式是相同的
type A = keyof Aobj
type A = number


type Bobj = {
    [n:string]: boolean
}
// 下面两种表示方式是相同的
type B = keyof Bobj
type B = string | number
```

::: tip

上面的例子中，B是string和number的联合类型，这是因为在JavaScript中，对象的键会转换为字符串，所以Obj[0]与Obj["0"]是相同的

:::





### Typeof

`typeof`运算符其实就是js中的运算符，用来做类型判断的。在ts中我们还能使用它来引用变量或属性的类型

```typescript
// 会打印出string
console.log(typeof "string")

let s = '123'
let n: typeof s
// 上面的类型和下面是相同的
let n: string
```



通常`typeof`适合与其他类型运算符结合使用，下面是预定义类型`ReturnType<T>`，它主要是获取函数的返回类型

```typescript
type Foo = (x: unknown) => boolean;
type K = ReturnType<Foo>
// 上下相同
type K = boolean
```

一般来说，我们在创建函数的时候想直接将函数类型传入，而不想再声明一个type表示函数的类型时，可以使用`typeof`

```typescript
function foo(x:number): number{
	return x
}

// “foo”表示值，但在此处用作类型。是否指“类型 foo”?
type P = ReturnType<foo>

// 需要与typeof结合使用
type P = ReturnType<typeof foo>
```



### 索引访问类型

我们能通过一个索引访问类型来定义一个在其他类型上指定向的属性，就像访问索引一样简单

```typescript
type Person = {
	age: number;
	name: string;
	height: string | number;
}

type Age = Person['age']
type Age = number
```



索引类型本身也是一种类型，所以我们能在这基础上使用联合类型，`keyof`或其他类型

```typescript
type xiaoming = Person["age" | "name"];
type xiaoming = string | number;

type xiaohong = Person[keyof Person];
type xiaohong = string | number;

type Another = "age" | "name";
type xiaoli = Person[Another];
type xiaoli = number | string;
```

索引类型不能访问不存在的键名

```typescript
type xiaoming = Person['alive']
// 类型“Person”上不存在属性“alive”
```

通常，我们可以将其与typeof结合使用来方便地获取数组元素的类型

```typescript
const arr = [
    {    name: 'lyf',    age: 123},
    {    name: 'cys',    age: 222},
    {    name: 'ylg',    age: 666},
]

type P1 = typeof arr[number]
type p1 = { name: string,age: number }

type P2 = typeof arr[number]["age"]
type p2 = number

type P3 = typeof arr[number]["name"]
type p3 = string
```



需要注意的是，使用索引类型时，定义的变量是不能作为值传入的，想要传入需要使用type

```typescript
const key = 'age'
type k = Person[key]  // 类型“key”不能作为索引类型使用。

type key = 'age'
type k = Person[key]
```





### 映射类型

映射类型基于索引签名的语法，用于声明尚未提前声明的属性类型

映射声明能减少很多重复性的代码，有时候一个对象中的值如果多数都是相同类型时，可以使用映射类型来避免编写过多代码：

```typescript
type Dog = {
    [key: string]: boolean | number;
}

const dog: Dog = {
    isSmall: true,
    isBig: false,
}
```



当使用`PropertyKey`关键字时，映射类型就会变成泛型：

```typescript
type Cat<Type> = {
    [Property in keyof Type]: boolean
}

const cat: Cat<Dog> = {
    isSmall: true,
    isCute: false
}
```





### 模板字符串

在js中存在模板字符串的使用，在ts中语法是相同的，这能让我们在编写type时更加简便：

```typescript
type Animal = 'animal'

type Cat = `i am ${Animal}`

type Dog = 'i am dog'

type detailID = `${ Dog | Cat }_id`
```





## 泛型

泛型是指在定于接口，类或者函数时，不先指定具体的类型，在具体使用的时候再指定类型的一种特性

```typescript
function foo<T>(x:number,y:T): Array<T>{
    let result: T[] = []
    result[x] = y
    return result
}

// 使用的时候传入具体的类型，也可以使用自动推算
foo(1,'222')
foo<string>(1,'111')

interface footype<Type> {
    (arg: Type): Type;
}
```



也能用来定于泛型类

```typescript
class MyClass <T> {
    public foo():void {
        console.log('111')
    }
}
```



需要注意的是，使用泛型来定义的时候，是不允许直接使用泛型上具体的属性和方法的，即使你传入的参数是正确的

```typescript
function foo<T>(x: T):T {
	console.log(x.length)
	return x
}

foo('123')
```



泛型还可以继承，如果我们想使用接口上的某属性，可以使用泛型继承接口，但是这种方法会受限与参数，我们传入的参数需要继承接口

```typescript
interface StringLength {
	length: number
}

// 当前打印的x属性上的length是从接口上继承过来的
function foo<T extends StringLength>(x: T): T{
	console.log(x.length)
	return x
}

foo({ length: 10, value: 1 })
```



想要在泛型中使用类输出时，必须要含有一个构造器的类型

```typescript
function foo<T>(a: { new (): T }): T{
	return new a()
}
```



返回的类之间还允许相互嵌套继承

```typescript
class male {
	age: number = 123;
}

class tall {
	height: boolean = true
}


class Animal {
	name: string
}

class Cat extends Animal {
	a: male = new male()
}

class Dog extends Animal {
	b: tall = new tall()
}

function createAnimal<A extends Animal>(c : { new() => A }): A{
	return new c()
}

createAnimal(Cat).a.age
createAnimal(Dog).b.height
```



## 类

在ts中的类其实和js中的差不多，在ts中的类更像java中的类，public，static，以及抽象的概念，这些都是类的基础，下面来看下一个简单的例子：

```typescript
// ts中有三种访问修饰符，分别是public，private，protected，前两个JS模块中已经讲过，具体讲第三个
// protected表示所修饰的属性和方法是受保护的，它和private类似，区别在于它在子类中是允许被访问的
// readonly和其他修饰符在一起使用时，需要放在修饰符的后面
class myClass {
    protected name;
    public readonly id:number = 111 
    public constructor(name) {
        this.name = name
    }

    static stafoo(){

    }
}
```





在类与类之间继承时，需要注意的是需要在构造器中调用父类的构造器super，这点和原生的js一样：

```typescript
class myClass2 extends myClass {
    constructor(name){
        super(name);
        console.log(this.name)
    }
}
```



抽象类中定义抽象方法必须被子类实现：

```typescript
// 修饰符abstract表示抽象类或抽象方法，抽象类时不允许被实例化的
// 抽象类中的抽象方法必须被子类实现
abstract class myClass3 {
    public name;
    public constructor(name){
        this.name = name
    }

    public abstract foo();
}

class myClass4 extends myClass3 {
    constructor(name){
        super(name)
    }

    foo = () => {
        
    }
}
```







## 元组

由于元组是在概念上扩展出来的，所以只在写法上和数组有差别，两者都是能使用数组的原生方法的

```typescript
// 元组就是一个数组内含有不同类型的值
let a: [string,number] = ['lyf',21]
a[0].slice(1)
a[1].toFixed(2)

// 当向元组中添加越界元素时，它的类型会被限制为元组中每个类型的联合类型
a.push('string')
```





## 枚举

枚举类型是用于取值被限定在一定范围内的场景，这个类型也是从概念上扩展出来的，但是他在转换的过程中略有不同

```typescript
enum Days {sum,mon,tue,wed,thu,fri,sat}

// 如果枚举类型中的值为枚举内的枚举名，则会返回它的值，值如果不手动设置会按照索引赋值
// 如果枚举类型中的值为枚举值，则会返回对应的枚举名
console.log(Days['mon'])
console.log(Days[1])
```



在枚举中索引还能手动设置，未被赋值的索引会根据上一个被赋值的索引依次递增

```typescript
// 手动赋值
enum Day {sum=2,mon=3,tue=4,wed,thu,fri,sat}

console.log(Day['sum'])
console.log(Day[2])
console.log(Day[5] == 'wed')
```



::: tip

在赋值的时候需要注意索引是能重复的，typescript默认下会根据索引查找时会将后面的索引覆盖前面的，在使用的时候需要尽量避免重复的情况发生

:::





## 接口

接口在ts中有举足轻重的地位，在ts中接口和类是能相互继承的，包括类实现接口，接口继承接口，接口继承类，第三种情况在其他语言中是不常见的，这是因为ts底层会为类创建一个实例的类型type，由于type是可以继承接口的，所以接口继承类和接口继承接口本质上是相同的

```typescript
// 类实现接口

// 类的继承可以通过接口来规范特征
interface connect {
    foo(): void
}

class father {

}

class son extends father implements connect{
    foo(){
        console.log('我是儿子')
    }
}

class mother implements connect {
    foo(){
        console.log('我是妈妈')
    }
}

// 接口也是可以继承接口的
interface a {
    foo(): void
}

interface b extends a {
    foo2(): void
}

// 在常见的面对对象语言中，接口是不能继承类的，但是在ts中却可以
// 接口继承类时，只能继承类的实例属性和实例方法
class MyClass {
    name: string
}

interface MyInterface extends MyClass{
    age: number
}

let interface: MyInterface = {
    name: '111',
    age: 21
}
```





