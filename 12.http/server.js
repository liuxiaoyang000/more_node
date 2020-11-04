
let http = require('http');
let fs = require('fs');
let statObj = fs.statSync('./1.txt');
http.createServer(function (req,res)  {
  let range = req.headers.range;
  if(range){
    let [,start,end] =  range.match(/bytes=(\d*)-(\d*)/);
    // 如果没有开始默认是0 如果没有结束 默认结束是总大小-1
    start = start? Number(start):0;
    end = end ? Number(end) : statObj.size - 1;
    res.statusCode = 206;
    res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`);
    res.setHeader('Accept-Ranges','bytes');
    fs.createReadStream('1.txt',{start,end}).pipe(res);
  }else{
    fs.createReadStream('./1.txt').pipe(res);
  }
}).listen(3000,'localhost',function () {
  console.log('localhost 3000');
})