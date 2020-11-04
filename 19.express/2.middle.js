let express = require('express');
let multer = require('multer');
var upload = multer({ dest: 'uploads/' })
let app  = express();
let bodyParser = require('body-parser');
// querystring a=1&b=2  qs 解析深层的 
app.use(bodyParser.urlencoded({extended:false})); // 专门处理表单格式
app.use(bodyParser.json());

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.file);
  res.send({name:'上传成功'})
  // req.body will hold the text fields, if there were any
});

// 文件上传需要使用multer


app.post('/login',function(req,res){
  res.send(req.body);
})

app.listen(3000);