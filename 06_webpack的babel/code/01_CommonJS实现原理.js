/**
 *  定义了一个对象
 *  模块的路径作为 key 函数作为 value
 */
var __webpack_modules__ = {
  './src/js/format.js': function (module) {
    const dateFormat = (date) => {
      return '2021-12-12';
    };
    const priceFormat = (price) => {
      return '100.00';
    };
    module.exports = {
      dateFormat,
      priceFormat,
    };
  },
};

/**
 * 缓存，加载一次下次可以不用再次加载
 */
var __webpack_module_cache__ = {};

function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  // 1. 判断缓存中是否已经加载
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }

  // 2. 对象的连续赋值，三个值相等，指向同一个对象，一个改变其他都会改变
  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  // 3. 加载执行模块
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

var __webpack_exports__ = {};

/**
 * 立即执行函数 加一个 '!' 可以让当前函数作为一个表达式，取反函数会执行
 */
// 这里正真的开始执行代码
!(function () {
  const { dateFormat, priceFormat } = __webpack_require__('./src/js/format.js');

  console.log(dateFormat('2021'));
  console.log(priceFormat('100'));
})();

//# sourceMappingURL=bundle.js.map
