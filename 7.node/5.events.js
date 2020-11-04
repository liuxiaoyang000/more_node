let EventEmitter = require('./EventEmitter');
let {inherits} = require('util')
function Girl() {
}
inherits(Girl, EventEmitter);
let girl = new Girl;
let cry = function (a,b) { console.log('cry',a,b);
 }
let eat = function (a,b) { console.log('eat',a,b) }
girl.on('newListener',function (type) {
  console.log(type);
})
girl.on('失恋', cry); 
girl.prependListener('失恋', eat); 
// girl.off('失恋', eat); 
// girl.off('失恋', cry); 
girl.emit('失恋','a','b');
