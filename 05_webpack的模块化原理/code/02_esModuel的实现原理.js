'use strict';
var __webpack_modules__ = {
  './src/js/math.js': function (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) {
    // 记录是一个 __esModule: { value: true }，这个模块是 esModule
    __webpack_require__.r(__webpack_exports__);
    // 给 exports 设置了一个代理 definition (一种语法不能使用)
    __webpack_require__.d(__webpack_exports__, {
      sum: function () {
        return sum;
      },
      mul: function () {
        return mul;
      },
    });
    const sum = (num1, num2) => {
      return num1 + num2;
    };

    const mul = (num1, num2) => {
      return num1 * num2;
    };
  },
};

// 模块缓存
var __webpack_module_cache__ = {};

// require 加载模块
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }

  var module = (__webpack_module_cache__[moduleId] = {
    exports: {},
  });

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

// 立即执行函数
!(function () {
  // 函数本身也是一个对象，给对象添加一个属性: d => function
  __webpack_require__.d = function (exports, definition) {
    for (var key in definition) {
      if (
        __webpack_require__.o(definition, key) &&
        !__webpack_require__.o(exports, key)
      ) {
        Object.defineProperty(exports, key, {
          enumerable: true,
          get: definition[key],
        });
      }
    }
  };
})();

// 立即执行函数
!(function () {
  // 添加了一个 O 属性
  __webpack_require__.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
})();

!(function () {
  // 定义了一个属性 r
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // 标记是 esModule
    Object.defineProperty(exports, '__esModule', { value: true });
  };
})();

var __webpack_exports__ = {};

!(function () {
  __webpack_require__.r(__webpack_exports__);
  var _js_math_js__WEBPACK_IMPORTED_MODULE_0__ =
    // 加载模块
    __webpack_require__('./src/js/math.js');

  // 一个特殊的语法 (0, function)
  console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.sum)(10, 20));
  console.log((0, _js_math_js__WEBPACK_IMPORTED_MODULE_0__.mul)(20, 30));
})();

//# sourceMappingURL=bundle.js.map
