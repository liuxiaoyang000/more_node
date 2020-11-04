class Circle{
  a=1
  //static PI = 3.14
}
// es6中不支持静态属性 但是使用属性解析器后就支持了
let c = new Circle;
console.log(c.a);

// 可以直接在类中写属性 this.a = 1;
// 如果加上static 就是类上的属性

// 讲了类 Object.defineProperty
// 箭头函数 模板字符串 数组的方法。。。

// 周日 讲下 node基础