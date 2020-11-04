let obj = {name:'zfpx',age:9};
let obj1 = {address:'回龙观'}
let school = { ...obj, ...obj1};
// 拷贝 合并  $.extend 
console.log(school);

// 这种拷贝是几层 浅拷贝 深拷贝
let obj = { name: { schoolName: 'zfpx' },a:1};
let newObj = {...obj,name:{...obj.name}};
console.log(newObj);
// 深拷贝的第一种方法
let obj = { name: { schoolName: 'zfpx' }, a: 1 ,reg:undefined};
let newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj)

// 如何实现一个深度拷贝 递归拷贝
let obj = { a: 1}
function deepClone(obj){
  if(obj === null) return null;
  if(typeof obj != 'object') return obj; // 函数拷贝不需要管
  if(obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  let newObj = new obj.constructor;// 对象的构造函数就是构造他的函数
  for(let key in obj){
    newObj[key] = deepClone(obj[key]);
  }
  return newObj
}
let newReg = deepClone(obj);
console.log(newReg);

let obj = { name: 'zfpx', age: 9 };
let obj1 = { address: '回龙观' }
//Object.assign es6  对象的展开是es7
let o = {}
Object.assign(o,obj,obj1);
console.log(o);

// 数组的展开 es6 拼接数组
let arr1 = [1,2];
let arr2 = [3,4];
console.log([...arr1,...arr2])// 语法树 es6->es5 
// Math.max.apply(Math, arr1)
console.log(Math.max(...arr1));

// 剩余运算符 只能放在函数的最后一个参数
function sum(a,...arg){
  return eval(arg.join('+'));
}
let r = sum(1,2,3,4,5);
console.log(r);

// Object.defineProperty

// 写promise es6版本的 传到github上
