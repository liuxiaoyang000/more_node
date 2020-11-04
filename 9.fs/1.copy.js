let fs = require('fs');
// 流的原理  发布订阅来简化 
function copy(source, target,callback) {
  const BUFFER_SIZE = 2;
  fs.open(source, 'r', function (err, rfd) {
    fs.open(target, 'w', function (err, wfd) {
      let buffer = Buffer.alloc(BUFFER_SIZE);
      // bytesRead真实读到的字节个数
      function next() {
        fs.read(rfd, buffer, 0, BUFFER_SIZE, null, function (err, bytesRead) {
          if (bytesRead>0){
            fs.write(wfd, buffer, 0, bytesRead, null, function (err, writen) {
              next();
            });
          }else{
            fs.close(rfd,()=>{});
            fs.close(wfd, () => {});
            callback();
          }
        });
      }
      next();
    });
  });
}
copy('a.md', 'b.md',function () {
  console.log('拷贝完成')
})