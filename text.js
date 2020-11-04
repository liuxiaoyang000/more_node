function anonymous(data
) {
  let tmpl = ''
  with (data) {
    tmpl += `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
    `
    arr.forEach(item => {
      tmpl += `
      <li>1</li>
    `
    })
    tmpl += `
</body>
</html>
`
  }
  return tmpl
}
let r= anonymous({arr:[1,2,3]});
console.log(r);