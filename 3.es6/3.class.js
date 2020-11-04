// 原生的构造函数 
// 以前认为类必须要大写
// 类也可以当作函数来调用 在es6中类只能new
function Animal(type){
  this.type = type;
}
Animal.fn = function () { // 静态方法
  console.log('fn')
}
Animal.prototype.eat = function () {
  console.log('eat');
}
function Cat(type) {
  //Animal.call(this,type)
}

// 3.继承父类实例上的所有属性 
// Cat.prototype = new Animal();
// let cat = new Cat('哺乳类'); // 初始化子类不能 给父类传参

// 2.获取父类的公共属性
// function create(parentPrototype) {
//   let Fn = function () {}
//   Fn.prototype = parentPrototype;
//   let fn = new Fn;
//   fn.consructor = Cat;
//   return fn
// }
Cat.prototype = Object.create(Animal.prototype,{consructor:{value:Cat}});
// Object.setPrototypeOf(Cat.prototype, Animal.prototype);
// Cat.prototype.__proto__ = Animal.prototype;
let cat = new Cat();
console.log(cat.consructor);

// 1.继承实例上的属性
// let cat = new Cat('哺乳类')
// console.log(cat.eat)

// 可以通过constructor 判断是不是类的实例
// console.log(Animal.prototype.constructor == Animal);
// Animal.prototype.constructor.fn();
// let a1 = new Animal('哺乳类');
// let a2 = new Animal('哺乳类');
// console.log(a1.eat === a2.eat);