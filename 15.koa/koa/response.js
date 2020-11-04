module.exports = {
  set body(val){
    this.res.statusCode = 200; // 调用ctx.body = xxxx 需要把状态设置成200
    this._body = val
  },
  get body(){
    return this._body
  }
}