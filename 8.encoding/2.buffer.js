// Buffer 缓存 他的展现方式是16进制 16进制短
// node中的buffer可以和字符串来转化

// 后续可能会用它实现文件的上传 需要了解buffer的基本操作

// 如何声明一个buffer  buffer声明后不能更改长度
// 1.通过数字声明一个buffer
// let buf1 = Buffer.alloc(3); // 3指代的是字节
// console.log(buf1.length);
// let buf2 = Buffer.from([100,2,3]); // 可以存放数组或者字符粗
// console.log(buf2);
// let buf3 = Buffer.from('珠峰');
// console.log(buf3.length);

// 2.buffer中有slice方法 buffer也可以循环
// 截取 把内存空间进行截取
// let arr = [1,{name:'zfpx'},2];
// let newArr = arr.slice(1,2);
// newArr[0].name = 'jw';
// console.log(arr);

// let buffer = Buffer.from([0,1,2]);
// console.log(buffer)
// let newBuffer = buffer.slice(0,1)
// newBuffer[0] = 100;
// console.log(buffer);


// buffer中的方法 copy concat 
//  把两个小buffer 拷贝到一个大的内存空间上
let buf1 = Buffer.alloc(12);
// let buf2 = Buffer.from('珠峰');
// let buf3 = Buffer.from('培训');
// target targetStart sourceStart sourceEnd;
Buffer.prototype.copy = function (target,targetStart,sourceStart,sourceEnd) { 
  for(let i = 0;i<sourceEnd-sourceStart;i++){
    target[targetStart+i] = this[sourceStart+i];
  }
}
// buf2.copy(buf1,3,3,6);
// buf3.copy(buf1,6,3,6);
// console.log(buf1.toString());

// cocat
let buf2 = Buffer.from('珠峰');
let buf3 = Buffer.from('培训');
// 拼接方法 返回的是一个新的buffer
Buffer.concat1 = function (lists, length = lists.reduce((prev, next) => prev + next.length, 0)) {
  let buffer = Buffer.alloc(length);
  let offset = 0;
  for (let i = 0; i < lists.length;i++){
    lists[i].copy(buffer, offset, 0, lists[i].length);
    offset += lists[i].length;
  }
  return buffer.slice(0,offset);
}
console.log(Buffer.concat1([buf2, buf3],3).toString());


// indexOf 和字符串的indexof一样
let index = Buffer.from('珠峰*珠峰*').indexOf('*',7);
// buffer没有分割的方法

Buffer.prototype.split = function (sep) {
  let arr = []; // 存放结果的
  let pos = 0;
  // 找不到返回-1
  let len = Buffer.from(sep).length;
  let offset = 0; // 偏移量
  while (-1 != (offset = this.indexOf(sep,pos))) {
    arr.push(this.slice(pos,offset));
    pos = offset+len;
  }
  console.log(pos)
  arr.push(this.slice(pos));
  return arr;
}
let arrs = Buffer.from('珠峰你珠峰你珠峰').split("你");
console.log(arrs);