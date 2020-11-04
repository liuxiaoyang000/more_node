
function _classCallCheck(sub, constr) {
  if (!(sub instanceof constr)) {
    throw new Error('Cannot with new ')
  }
}
function defineProperties(target,props){
  for (let i = 0; i < props.length;i++ ){
    Object.defineProperty(target,props[i].key,{
      ...props[i]
    });
  }
}
function _createClass(Constructor,protoPropeties,staticProperties) {
  if (protoPropeties){
    defineProperties(Constructor.prototype, protoPropeties);
  }
  if (staticProperties){
    defineProperties(Constructor, staticProperties);
  }
}
let Animal = function () {
  function Animal(type) {
    _classCallCheck(this, Animal);
    this.type = type;
    return {a:1}
  }
  // 第一个参数就是定义哪一个类 第二个参数就是定义公有属性 第三个就是类上的属性
  _createClass(Animal, [
    {
      key: 'eat',
      value: function () {
        console.log('吃')
      }
    },
    {
      key: 'drink',
      value: function () {
        console.log('喝')
      }
    }
  ], [
      {
        key: 'flag', value: function () {
          return '好玩'
        }
      }
    ]); // Object.defineProperty
  return Animal;
}();

function _inherits(subClass,parentClass) {
  subClass.prototype = Object.create(parentClass.prototype,{Constructor:{value:subClass}});
  // subClass.__proto__ = parentClass;
  Object.setPrototypeOf(subClass, parentClass);
}
let Cat = function (Animal) {
  _inherits(Cat, Animal);
  function Cat(type) {
    _classCallCheck(this,Cat);
    let that = this;
    let val = Animal.call(this, type);
    if(typeof val === 'object'){
      that = val;
    }
    return that;
  }
  return Cat;
}(Animal);
let cat  = new Cat('哺乳类');
console.log(cat);

// ast 语法树 把 es6->es5; 