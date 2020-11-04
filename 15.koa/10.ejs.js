// ejs可以渲染数据 最终返回一个字符串

let ejs = require('ejs');
let fs = require('fs');
let path = require('path');
let templateStr = fs.readFileSync(path.join(__dirname, 'index.ejs'),'utf8');
// 普通字符串可以这么实现
// function render(str,obj) {
//   return str.replace(/<%=([\s\S]*?)%>/g,function () {
//     return obj[arguments[1]];
//   })
// }
// let r = render(templateStr,{name:'zfpx',age:9});
// console.log(r);
// new Function  with
/*
let tmpl = '';
tmpl+=`

*/

// 1.用一个变量拼出自己想要的结果， 2.加上一个with方便取值
// 3.在把这个变量返回   4.让字符串变成函数执行一下 拿到最终的结果
function render(templateStr,data) {
  // 拼出来一个js的脚本字符串
  let str = `let tmpl = ''\r\n`;
  str+= `with(b){\r\n`
  str += "tmpl+=`"
  let content =  templateStr.replace(/<%([\s\S]*?)%>/g,function () {
    return '`\r\n'+arguments[1] +'\r\ntmpl+=`'
  });
  content+='`\r\n}'
  let tail =  `\r\nreturn tmpl`;
  let fnStr = str + content + tail;
  let fn = new Function('b',fnStr);
  return fn(data);
};
let r = render(templateStr,{arr:[1,2,3]});
console.log(r);

let obj = {
  arr:1
}
with(obj){
  console.log(arr);
}
