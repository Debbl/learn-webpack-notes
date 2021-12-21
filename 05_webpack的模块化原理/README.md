## 05_Webpack模块化原理

- https://webpack.docschina.org/configuration/mode/

### Mode配置

- 前面我们一直没有讲mode，但是在这里我们要简单讲一下，后面还会提到它的其他用法。 
- Mode配置选项，可以告知webpack使用响应模式的内置优化： 
  - 默认值是production（什么都不设置的情况下）； 
  - 可选值有：**'none' | 'development' | 'production'**；

| 选项          | 描述                                                         |
| :------------ | :----------------------------------------------------------- |
| `development` | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`. 为模块和 chunk 启用有效的名。 |
| `production`  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称，`FlagDependencyUsagePlugin`，`FlagIncludedChunksPlugin`，`ModuleConcatenationPlugin`，`NoEmitOnErrorsPlugin` 和 `TerserPlugin` 。 |
| `none`        | 不使用任何默认优化选项                                       |

如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`。



### Webpack 模块化

- Webpack打包的代码，允许我们使用各种各样的模块化，但是最常用的是CommonJS、ES Module。 
  - 那么它是如何帮助我们实现了代码中支持模块化呢？
- 我们来研究一下它的原理，包括如下原理： 
  - CommonJS模块化实现原理； 
  - ES Module实现原理； 
  - CommonJS加载ES Module的原理； 
  - ES Module加载CommonJS的原理；
- CommonJs模块

```js
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

```

- esModule模块

```js
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

```

- esModule、CommonJS

```
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

```

