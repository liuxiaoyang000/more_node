// 十进制转化成2进制 任意进制的转化
let r = (0x11).toString(8);
console.log(r);
// 1011 将他转化成 十进制
let r1 = parseInt('1011', 2);
console.log(r1);


// base64  编码 是靠的转化
// utf8中1个汉字3个字节 一个字节8个位
// base64 遵循着规范 要求每个字节不得超过64
// 00111111  3*8 => 4*6的格式 => 每个字节都转化成10进制

// 珠
console.log(Buffer.from('珠')); // 0xe7 0x8f 0xa0
console.log((0xe7).toString(2));
console.log((0x8f).toString(2));
console.log((0xa0).toString(2));


console.log(parseInt('00111001', 2))
console.log(parseInt('00111000', 2))
console.log(parseInt('00111110', 2))
console.log(parseInt('00100000', 2))
// 57 56 62 32
let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str += 'abcdefghijklmnopqrstuvwxyz'
str += '0123456789'
str+='+/'

console.log(str[57] + str[56] + str[62] + str[32]);


// 把一个张图 按照base64编码 进行转化