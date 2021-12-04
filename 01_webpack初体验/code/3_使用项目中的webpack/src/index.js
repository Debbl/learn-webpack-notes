import { sum , mul } from './js/math.js';
const {dataFormate, priceFormate} = require('./js/format.js');

console.log(sum(20, 30));
console.log(mul(20, 30));

// Uncaught ReferenceError: require is not defined
// 无法识别 commonJS
console.log(dataFormate("1212"));
console.log(priceFormate("111"));
