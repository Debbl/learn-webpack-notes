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

  './src/js/math.js': function (
    __unused_webpack_module,
    __webpack_exports__,
    __webpack_require__
  ) {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
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

var __webpack_module_cache__ = {};

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

!(function () {
  __webpack_require__.n = function (module) {
    var getter =
      // 判断是不是 esModule
      module && module.__esModule
        ? function () {
            return module['default'];
          }
        : function () {
            return module;
          };
    __webpack_require__.d(getter, { a: getter });
    return getter;
  };
})();

!(function () {
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

!(function () {
  __webpack_require__.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
})();

!(function () {
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
})();

var __webpack_exports__ = {};

!(function () {
  'use strict';

  __webpack_require__.r(__webpack_exports__);
  var _js_format__WEBPACK_IMPORTED_MODULE_0__ =
    __webpack_require__('./src/js/format.js');
  var _js_format__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
    _js_format__WEBPACK_IMPORTED_MODULE_0__
  );
  // esModule 导出 CommonJS 导入
  const math = __webpack_require__(/*! ./js/math.js */ './src/js/math.js');

  // CommonJS 导出 esModule 导入

  console.log(math.sum(10, 20));
  console.log(math.mul(20, 30));

  console.log(
    _js_format__WEBPACK_IMPORTED_MODULE_0___default().dateFormat('aaa')
  );
  console.log(
    _js_format__WEBPACK_IMPORTED_MODULE_0___default().priceFormat('bbb')
  );
})();

//# sourceMappingURL=bundle.js.map
