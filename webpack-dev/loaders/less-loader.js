let less = require('less');
function loader(source) {
  let css;
  // 转化的过程 同步的
  less.render(source,(err,output)=>{
    css = output.css
  });
  css = css.replace(/\n/g,'\\n');
  return css;
}
module.exports = loader;