function loader(source){ // source less-loader转化后的结果

  // 最终的loader需要 返回一个js的脚本的字符串
  let str = `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style);
  `
  return str;
}
module.exports = loader;

// let path = require('path');
// let fs = require('fs')
// let r = fs.readFileSync(path.resolve(__dirname,'css.css'),'utf8');

// let str=  `
//   let a = ${JSON.stringify(r)}
// `
// console.log(str);