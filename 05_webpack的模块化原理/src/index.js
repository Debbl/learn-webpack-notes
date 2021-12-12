const { sum, mul } = require("./js/math");

import { dataFormat, priceFormat } from "./js/format";

console.log(sum(10, 20));
console.log(mul(10, 20));
console.log(dataFormat('2021'));
console.log(priceFormat('100'));
