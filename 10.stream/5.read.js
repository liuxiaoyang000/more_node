let {Readable} = require('stream');
// 通过父类创建一个自己的可读流
let fs = require('fs');
fs.createReadStream('./1.txt');
// 自定义的可读流
class MyRead extends Readable{
  constructor(){
    super();
    this.index = 0;
  }
  _read(){ // 可以重写_read方法 来实现自己的逻辑
    if(this.index == 9){
      this.push(null);
    }else{
      this.push(this.index++ +'');
    }
  }
}
let myrRead = new MyRead;
myrRead.on('data',function (data) {
  console.log(data);
});
myrRead.on('end', function (data) {
  console.log('end');
})