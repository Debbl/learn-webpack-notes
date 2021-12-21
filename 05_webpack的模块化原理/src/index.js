// esModule 导出 CommonJS 导入
const math = require('./js/math.js');

// CommonJS 导出 esModule 导入
import format from './js/format';

console.log(math.sum(10, 20));
console.log(math.mul(20, 30));

console.log(format.dateFormat("aaa"));
console.log(format.priceFormat("bbb"));
