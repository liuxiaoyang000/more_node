function sum(a,b){
  return a+b;
}
function len(str) {
  return str.length
}

function compose(...fns) {
  return fns.reduce((a,b)=>(...args)=>a(b(...args)))
}
console.log(compose(len, sum)('a', 'b'))