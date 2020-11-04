function EventEmitter() {
  this._events = Object.create(null);
}
EventEmitter.prototype.prependListener = function (eventName, callback) {
  this.on(eventName, callback,true);
}
EventEmitter.prototype.on = function (eventName,callback,flag) {
  if (!this._events) this._events = Object.create(null);
  if(eventName!='newListener'){
    this._events['newListener'].forEach((fn)=>{
      fn(eventName)
    })
  }
  if(this._events[eventName]){
    if(flag){
      this._events[eventName].unshift(callback);
    }else{
      this._events[eventName].push(callback);
    }
  }else{
    this._events[eventName] = [callback];
  }
}
EventEmitter.prototype.off = function (eventName,callback) {
  // 当前函数绑定的时one l.cry   删除的也是cry
  this._events[eventName] = this._events[eventName].filter((l) => l != callback&& l.l!= callback);
}
EventEmitter.prototype.once = function (eventName, callback) {
  // 先绑定一个临时函数 触发完后 在函数中把自己删除掉
  function one(...args) {
    callback(...args);
    this.off(eventName, one);
  }
  one.l = callback
  this.on(eventName, one);
}
EventEmitter.prototype.emit = function (eventName,...args) {
  this._events[eventName].forEach(fn => {
    fn.call(this,...args);
  });
}
module.exports = EventEmitter

// newListener
// on off once