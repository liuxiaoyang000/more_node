
export let a = 1;
export let b = 2;  // {a:1,b:2}
export default 'XXX'

import * as str from './export';
console.log(str.a, str.b);


import xxxx from './export';
console.log(xxxx);
