let fs = require('fs');

// 我有一个需求 想把10个数写到文件中，但是只用1个字节的内存
let ws = fs.createWriteStream('1.txt',{
  highWaterMark:16*1024
})
let i = 0 ;

function write() {
  let flag = true
  while (i<=9 && flag) {
    flag = ws.write(i++ +'');
  }
}
write();
ws.on('drain',()=>{
  console.log('干了')
  write();
})