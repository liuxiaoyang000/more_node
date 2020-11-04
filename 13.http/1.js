// 我们希望把一个很大的文件 算出一个标识来

//  node中提供一个模块 可以进行摘要算法  
// MD5 摘要算法  加密 -》解密
// 相同的内容 摘要出的结果相同
//  MD5 摘要算法 不相同的内容 摘要出的结果 永远长度相同，内容不同的

let crypto = require('crypto'); // 加密用的
let md5 = crypto.createHash('md5');
let newMd5 = md5.update('123456').digest('base64');
console.log(newMd5)
let md51 = crypto.createHash('md5');
console.log(md51.update('123456').digest('base64'))
