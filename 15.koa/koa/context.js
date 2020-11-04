let proto = {

}
function defineGetter(property,key) {
  proto.__defineGetter__(key,function () {
    return this[property][key];
  });
}
function defineSetter(property,key) {
  // ctx.body = '123'  ctx.response.body = 123
  proto.__defineSetter__(key,function (value) {
    this[property][key] = value;
  });
};
defineGetter('request','path');
defineGetter('request','url');
defineGetter('response','body');
defineSetter('response','body');
module.exports = proto;

// let obj = {
//   request:{
//     url:'/'
//   }
// }
// obj.__defineGetter__('url',function () {
//   return this['request']['url']
// });
// console.log(obj.url);