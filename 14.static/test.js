let zlib = require('zlib');
let fs = require('fs');
let rs = fs.createReadStream('./a.md.gz')
let gzip = zlib.createGunzip();
rs.pipe(gzip).pipe(fs.createWriteStream('./a.md'))