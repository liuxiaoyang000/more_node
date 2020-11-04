let HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin{
  constructor({match}){
    // 我需要匹配的文件
    this.match = match;
  }
  processTag(tag, compilation){ // tag就是每一个css / js标签
    let t,urlPath;
    if (tag.tagName === 'link' && this.match.test(tag.attributes.href)){
      t = {
        tagName:'style',
        attributes:{type:'text/css'}
      }
      urlPath = tag.attributes.href;
    }
    if (tag.tagName === 'script' && this.match.test(tag.attributes.src)) {
      t = {
        tagName: 'script',
        attributes: { type: 'application/javascript' }
      }
      urlPath = tag.attributes.src
    }
    if (urlPath){ // 取出路径对应的内容 赋予到当前的标签内
      t.innerHTML = compilation.assets[urlPath].source();
      delete compilation.assets[urlPath];// 资源就不会打包出来了
      return t;
    }
    return tag;
  }
  processTags(data, compilation){
    let headTags = [];
    let bodyTags = []
    data.headTags.forEach((headTag)=>{
      headTags.push(this.processTag(headTag, compilation));
    });
    data.bodyTags.forEach((headTag) => {
      bodyTags.push(this.processTag(headTag, compilation));
    });
    return { ...data, headTags, bodyTags}
  }
  apply(compiler){
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation)=>{
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('InlineSourcePlugin',(data,cb)=>{
        data = this.processTags(data, compilation); // 处理标签后 不需要发射此文件
        cb(null,data);
      })
    })
  }
}

module.exports = InlineSourcePlugin;