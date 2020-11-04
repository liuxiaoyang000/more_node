// 事件模块 发布订阅 发布  订阅
// {水开了:['洗脸','吃饭']}
// {失恋:['哭','购物']}
let EventEmitter = require('events');
let util = require('util');
function Girl() {
  
}
util.inherits(Girl, EventEmitter);
let girl = new Girl;
// 当我绑定依次方法时就会触发newListener事件
// girl.on('newListener',function (type) {
  
// })
let cry = function(){console.log('cry')}
let eat = function(){console.log('eat')} 
// girl.setMaxListeners(1)
girl.once('失恋', cry); // {失恋:[cry]}  触发依次后删除掉
girl.on('失恋', eat); // {失恋:[cry,eat]}
girl.prependListener('失恋',eat);
// newListener 监听用户是否绑定了新的事件


// girl.off('失恋',cry);
// console.log(EventEmitter.defaultMaxListeners);
// console.log(girl.eventNames())
// 发布
girl.emit('失恋')
girl.emit('失恋')