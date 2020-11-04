// 箭头函数 简单 这里面没有this指向 没有arguments
// 对象并不是作用域
let a = 100;
let obj = {
  a:1,
  fn:()=>{ // this = obj;
    window.setTimeout(()=> {
      console.log(this.a);
    }, 1000);
  }
}
// this指向
obj.fn();
function a(n1) {
  return function (n2) {
    let sum = n1+n2;
    return sum
  }
}
// 一个参数可以省略圆括号
// 可以省略return和{}，如果返回的是一个对象 要用小阔号包裹起来
let sum = 0;
let a = n1 => n2 => (sum = n1 + n2, sum);
console.log(a(1)(2));

// 数组的方法
// 声明式  编程式
// reduce map filter some every forEach  es5
// find findIndex es6

// let r = [1,2,3,4].reduce((prev,next,currentIndex,arr)=>{
//   console.log(prev, next, currentIndex);
//   return prev+next;
// });
// console.log(r);
function len(str) {
  return str.length;
}
function toUpperCase(str) {
  return str.toUpperCase();
}
function sum(a,b) {
  return a+b;
}
function compose(...fns) {
  let fn = fns.pop();
  return function (...args) {
    let r = fn(...args)
    return fns.reduceRight((prev,next)=>{
      return next(prev);
    }, r); // 第二个参数可以指定prev属性
  }
}
let l = compose(len,toUpperCase,sum)('a','b');
console.log(l);

Array.prototype.reduce = function (callback,prev) {
  for(let i = 0 ; i<this.length;i++){
    if(typeof prev!= 'undefined'){
      prev = callback(prev, this[i],i,this);
    }else{
      // 第一次没有prev 但是下一次有这个prev 需要把索引往后移动一位
      prev = callback(this[i],this[i+1],i+1,this);
      i++;
    }
  }
  return prev
}
let t = [{price:10,count:10},{price:2,count:5},{price:3,count:4}].reduce((prev,current)=>{
  return prev + current.price * current.count
});
console.log(t);
