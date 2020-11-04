let path = require('path');
class P1 {
  apply(compiler){
    compiler.hooks.done.tap('p1',function () {
      console.log('done')
    })
  }
}
class P2 {
  apply(compiler) {
    compiler.hooks.afterCompile.tap('p1', function () {
      console.log('afterCompile')
    })
  }
}
module.exports = {
  mode:'development',
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        // loader就是一个函数 函数的参数是一个源码
        // less-loader 就是将我们的less -> css
        // style-loader 就是将我们的css-> style.innerHTML
        use:[
          // loader可以采用绝对路径来引用
          path.resolve(__dirname,'loaders','style-loader'),
          path.resolve(__dirname,'loaders','less-loader')
        ]
      }
    ]
  },
  plugins:[
    new P1(),
    new P2()
  ]
}

