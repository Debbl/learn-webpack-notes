// esModule 导出 CommonJS 导入
const { sum, mul } = require('./js/math.js');

// CommonJS 导出 esModule 导入
import { dateFormat, priceFormat } from './js/format';

console.log(sum(10, 20));
console.log(mul(20, 30));

console.log(dateFormat('aaa'));
console.log(priceFormat('bbb'));
