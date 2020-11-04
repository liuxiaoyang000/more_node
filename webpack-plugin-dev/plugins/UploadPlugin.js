let path = require('path');
let qiniu = require('qiniu')
class UploadPlugin {
  constructor(options) {
    console.log(options)
    let { bucket = '', domain = "", accessKey = '', secretKey = '' } = options;
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    this.uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
      let assets = compilation.assets;
      let promises = Object.keys(assets).map(filename => {
        return this.upload(filename);
      });
      return Promise.all(promises);
    });
  }
  upload(filename) {
    return new Promise((resolve, reject) => {
      let localFile = path.resolve(__dirname, '../dist', filename)
      this.formUploader.putFile(this.uploadToken, filename, localFile, this.putExtra, function (respErr, respBody, respInfo) {
        respErr ? reject(respErr) : resolve(respBody)
      });
    })
  }
}
module.exports = UploadPlugin;