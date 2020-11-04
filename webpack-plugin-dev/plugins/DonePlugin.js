class DonePlugin{
  constructor(options){

  }
  apply(compiler){
    compiler.hooks.done.tap('DonePlugin',()=>{
      console.log('~~~编译完成~~~');
    });
  }
}
module.exports = DonePlugin;


// 1.我们想 统计一下 打包出来的文件的名字，包括文件的大小