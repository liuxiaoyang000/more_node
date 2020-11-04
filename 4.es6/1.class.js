// @babel/preset-env 把es6转化成es5
// @babel/plugin-proposal-class-properties转化class上的属性的
// @符号表示是装饰器，他可以修饰类 类中的属性和方法
// 修饰类就有一个参数 参数是是当前的类
//@flag
class Person {
  a=1;
  @type message ="懒惰";
  @logger
  say(){
    console.log('-----------',this)
    console.log('饿了')
  }
}

let p = new Person;
console.log(p.a);

// 装饰器
function flag(target){
  target.flag = '人';
}
console.log(Person.flag);

// 如果是属性 第一个参数是类的原型,第二个参数是属性
function type(target,prorperty,descriptor) {
  descriptor.writable = false;
}
//p.message = '勤劳';
// 第三个参数中descriptor他的value是一个值 没有initailizar
function logger(target, prorperty, descriptor) {
  let old = descriptor.value;
  console.log(prorperty)
  descriptor.value = function () {
    console.log('before');
    old.call(target.prototype);
    console.log('after');
  }
}
p.say();