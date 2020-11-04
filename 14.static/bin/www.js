#! /usr/bin/env node

// 需要在命令行下解析用户执行的参数
let package = require('../package.json');
let comannder = require('commander');
let parser = {
  port:3000,
  host:'localhost',
  dir:process.cwd()
}
comannder.on('--help',function () {
  console.log('Usage: ')
  console.log('  zf-server -p 3000');
})
let args = comannder
  .version(package.version)
  .option('-p,--port <v>','server port')
  .option('-o,--host <v>','server hostname')
  .option('-d,--dir <v>', 'server directory')
  .parse(process.argv);

let Server = require('../server');
let server = new Server({ ...parser, ...args });
server.start(); // 启动一个服务