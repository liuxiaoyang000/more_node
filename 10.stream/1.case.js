let ReadStream = require('./ReadStream');

let rs = new ReadStream('a.md',{
  autoClose:true,
  flags:'r',
  highWaterMark:3,
  start:0,
  end:6,
  encoding:'utf8'
});
rs.on('open',function () {
  console.log('open')
});
let arr = [];
rs.on('data',function (data) {
  arr.push(data);
  console.log(data);
});
rs.on('end',function (params) {
  console.log(Buffer.concat(arr).toString())
})
rs.on('error',function (err) {
  console.log(err);
})
rs.on('close', function () {
  console.log('close');
})

// on off emit once newListener