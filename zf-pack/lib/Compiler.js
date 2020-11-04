let path = require('path');
let fs = require('fs');
let babylon = require('babylon'); // babylon.parse(code) -> ast
let t = require('@babel/types');
// es6模块需要 多.default一下
let traverse = require('@babel/traverse').default; // module.exports.default
let generator = require('@babel/generator').default;
let {SyncHook} = require('tapable');
let ejs = require('ejs');
class Compiler {
  constructor(config) {
    // 所有的配置文件
    this.config = config;
    // 需要获取当前执行命令的绝对路径
    this.root = process.cwd();
    // 找到配置文件中的入口
    this.entry = config.entry;
    // 入口文件的id
    this.entryId;
    // 所有的依赖列表
    this.modules = {}

    this.hooks = {
      entryOption: new SyncHook(),
      run:new SyncHook(),
      compile:new SyncHook(),
      afterCompile:new SyncHook(),
      afterPlugins:new SyncHook(), // 插件都执行后调用此方法
      emit:new SyncHook(), // 文件发射出来了
      done:new SyncHook()
    }
    if (Array.isArray(config.plugins)){
      config.plugins.forEach(p=>{ // 每个插件都需要有一个apply方法
        p.apply(this); // 每个插件都能拿到compiler对象
      })
    }
    this.hooks.afterPlugins.call();
  }
  getSource(modulePath) { // 获取资源
    // 需要判断modulePath 是否是less文件
    // 获取规则 
    let rules = this.config.module.rules; // rules是所有的规则 
    let content = fs.readFileSync(modulePath, 'utf8');
    for(let i = 0;i<rules.length;i++){
      let rule = rules[i]; // 一条规则
      let {test,use} = rule;
      let len = use.length - 1;// 默认定位到最后一个loader
      if (test.test(modulePath)){
        // 这个路径需要用loader来解析
        function normalLoader(){
          let loader = require(use[len--]);
          content = loader(content);
          if(len>=0){
            normalLoader(); //  递归来解析loader
          }
        }
        normalLoader();
      }
    }
    return content;
  }
  // 绝对路径  是否是主入口
  buildModule(modulePath, isEntry) { // 创建模块
    // 文件的源代码
    let source = this.getSource(modulePath);
    // modulePath目前是绝对路径 path.relative
    //root => c:/index   modulePath=> c:/index/a/b/q     => a/b/q
    // 获取到了模块的相对路径
    let moduleId = './' + path.relative(this.root, modulePath);
    if (isEntry) {
      this.entryId = moduleId;
    }
    // AST语法解析 写一个专门的方法用来解析源代码
    // 处理当前模块的父路径
    // sourceCode 就是转化后的代码
    let { sourceCode, dependencies } = this.parse(source, path.dirname(moduleId)); // ./src
    this.modules[moduleId] = sourceCode;
    // 需要拿到当前文件的依赖 "递归"搜索依赖
    dependencies.forEach(dep=>{ // ./src/a.js
      this.buildModule(path.resolve(this.root, dep),false);
    });
  }
  parse(source, parentPath) {
    let ast = babylon.parse(source);
    let dependencies = []; // 存放依赖关系的
    traverse(ast, {
      CallExpression(p) {
        let node = p.node;
        // 找到了require方法
        if (node.callee.name === 'require') { // 取到名字
          node.callee.name = '__webpack_require__';
          // ./main/a
          let moduleName = node.arguments[0].value;
          moduleName = moduleName + (path.extname(moduleName) ? '' : '.js');
          // ./src/main/a;
          moduleName = './' + path.join(parentPath, moduleName);
          // 把依赖添加进去
          dependencies.push(moduleName);
          // 替换变量名
          node.arguments = [t.stringLiteral(moduleName)]
        }
      }
    });
    let sourceCode = generator(ast).code;
    return { sourceCode, dependencies }

    // ast 1) 转化树 2) 遍历树 3) 更改树 4) 输出代码
    // esprima es-travase esCodegen
    // babel (babylon   @babel/traverse @babel/types  @babel/generator)
  }
  run() {
    this.hooks.run.call();
    // run方法的作用是
    // 1) 创建模块 需要根据当前的绝对路径
    this.hooks.compile.call();
    this.buildModule(path.resolve(this.root, this.entry), true);
    this.hooks.afterCompile.call();
    // 2) 创建完后 把成功的文件写出来
    this.emitFile(); // 发射文件
    this.hooks.emit.call();
    this.hooks.done.call();
  }
  emitFile(){
    // 模板的内容
    let templateStr = this.getSource(path.resolve(__dirname,'temp.ejs'));

    let str = ejs.render(templateStr,{modules:this.modules,entryId:this.entryId});
    // 写入到打包的文件中
    let main = path.join(this.config.output.path, this.config.output.filename);
    fs.writeFileSync(main, str);
  }
}

module.exports = Compiler;