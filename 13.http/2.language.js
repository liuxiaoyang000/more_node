// 多语言  通过路径来切换语言 

// 可能通过 点击事件来切换语言，通过后端实现多语言

let langs = {
  en:"hello world",
  zh:'你好世界',
  ja: 'こんにちは、世界',
  'zh-CN':'你好世界,你好世界'
}
let defaultLanguage = 'ja';

// zh-CN;q=0.8,zh;q=0.9,en,ja;q=0.8 
let http = require('http');
http.createServer(function (req,res) {
    let l = req.headers['accept-language'];
    res.setHeader('Content-Type','text/plain;charset=utf8');
    if(l){ // 接收的是什么语言
      // [zh-CN;q=0.8,zh;q=0.9,en;q=1,ja;q=0.8]
      let arr = l.split(',').map(item=>{
        let [lan,q="q=1"] = item.split(';');
        return {
          name:lan,
          q: Number(q.split('=')[1])
        }
      }).sort((a,b)=>b.q-a.q);
      for (let i = 0; i < arr.length;i++){
        let l = arr[i].name;
        if (langs[l]){
          return res.end(langs[l]);
        }
      }
      res.end(langs[defaultLanguage]);
    }else{
      res.end(langs[defaultLanguage]);
    }
}).listen(5000);

// 防盗链