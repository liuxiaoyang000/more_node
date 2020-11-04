class FileListPlugin{ 
  constructor(opts={}){
    this.filename =  opts.filename || 'list.md'
  }
  apply(comipler){
    // 在文件发射之前 文件资源已经准备好了 compliation.assets
    comipler.hooks.emit.tapAsync('FileListPlugin', (compliation,cb)=>{
      let str = `## Assets    size\r\n`
      let assets = compliation.assets; // {build.js:{source,size},index.html:{source,size}}
      Object.entries(assets).forEach(([filename,sourceObj]) => {
        str += `- ${filename}    ${sourceObj.size()}\r\n`
      });;
      assets[this.filename] = {
        source(){
          return str;
        },
        size(){
          return str.length;
        }
      }
      cb();
    });
  }
}
module.exports = FileListPlugin;