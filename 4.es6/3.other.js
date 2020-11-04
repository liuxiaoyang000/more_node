// Symbol js的数据类型 number string boolean null  undefined object
// Symbol是第七种
// 一般用作常量

// console.log(typeof Symbol());
// console.log(Symbol() === Symbol());
// console.log(Symbol('a') === Symbol('a'));
const a1 = Symbol.for('a'); // 先声明一个Symbol
// console.log(Symbol.keyFor(a1))


// map set 集合 放的东西不能重复 可以被迭代
let arr1 = [1,2,3,3,2,1];
let arr2 = [4,5,6,1,2]

// 并集 
let s = [...new Set([...arr1,...arr2])]; // Symbol.iterator
// console.log(s);
// 交集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let r = [...s1].filter(item=>{ // 如果返回true表示留下
  return s2.has(item);
});
console.log(r);
// 差集
let d = [...s1].filter(item => { // 如果返回true表示留下
  return !s2.has(item);
});
console.log(d);


let s = new Set([1,2,4]);
s.delete(2);
console.log(s);


let map = new Map();
map.set('js',['nodejs']);
map.set('js',['js1']);

map.forEach((item,key)=>{
  console.log(item, key)
})
let name = 'zfpx';
let age = 10;

let val = `${name}今年${age}岁了
你好
`
console.log(val);