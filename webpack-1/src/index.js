// 默认webpack 会打包 js 

import './index.css';
let str = require('./a');
console.log(str+'2');

function test(target) {
  console.log(target)
}

@test
class A{
  a = 1;
}