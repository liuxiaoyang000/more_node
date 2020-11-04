"use strict";

var _class, _descriptor;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

// @babel/preset-env 把es6转化成es5
// @babel/plugin-proposal-class-properties转化class上的属性的
// @符号表示是装饰器，他可以修饰类 类中的属性和方法
// 修饰类就有一个参数 参数是是当前的类
//@flag
var Person = (_class =
/*#__PURE__*/
function () {
  function Person() {
    _classCallCheck(this, Person);

    this.a = 1;

    _initializerDefineProperty(this, "message", _descriptor, this);
  }

  _createClass(Person, [{
    key: "say",
    value: function say() {
      console.log('-----------', this);
      console.log('饿了');
    }
  }]);

  return Person;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "message", [type], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return "懒惰";
  }
}), _applyDecoratedDescriptor(_class.prototype, "say", [logger], Object.getOwnPropertyDescriptor(_class.prototype, "say"), _class.prototype)), _class);
var p = new Person();
console.log(p.a); // 装饰器

function flag(target) {
  target.flag = '人';
}

console.log(Person.flag); // 如果是属性 第一个参数是类的原型,第二个参数是属性

function type(target, prorperty, descriptor) {
  descriptor.writable = false;
} //p.message = '勤劳';
// 第三个参数中descriptor他的value是一个值 没有initailizar


function logger(target, prorperty, descriptor) {
  var old = descriptor.value;
  console.log(prorperty);

  descriptor.value = function () {
    console.log('before');
    old.call(target.prototype);
    console.log('after');
  };
}

p.say();
