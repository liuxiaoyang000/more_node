"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Circle = function Circle() {
  _classCallCheck(this, Circle);

  _defineProperty(this, "a", 1);
} //static PI = 3.14
; // es6中不支持静态属性 但是使用属性解析器后就支持了


var c = new Circle();
console.log(c.a); // 可以直接在类中写属性 this.a = 1;
// 如果加上static 就是类上的属性
// 讲了类 Object.defineProperty
// 箭头函数 模板字符串 数组的方法。。。
// 周日 讲下 node基础
