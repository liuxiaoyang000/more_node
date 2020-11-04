let url = require('url')
module.exports = { // ctx.request.url => this=>ctx.request  
  get url(){
    return this.req.url
  },
  get path(){
    let {pathname} = url.parse(this.req.url,true);
    return pathname;
  }
}
