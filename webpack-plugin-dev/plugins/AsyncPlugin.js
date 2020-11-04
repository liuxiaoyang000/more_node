class AsyncPlugin {
  apply(compiler){
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation,cb)=>{
      console.log(compilation.assets) // moduleId : source
      setTimeout(() => {
        console.log('emit one')
        cb();
      }, 1000);
    });
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation)=>{
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
          console.log('emit two')
          resolve();
        }, 1000);
      })
    })
  }
}
module.exports = AsyncPlugin;