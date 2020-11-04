let express = require('express');
let middle = require('webpack-dev-middleware');

let app = express(); // 

let webpack = require('webpack');
let config = require('./webpack.config.js');
let compiler = webpack(config);
app.use(middle(compiler));

// 在服务端启动webpack 3000
app.get('/user',function(req,res){
  res.json({name:'jw111'});
});
app.listen(3000);