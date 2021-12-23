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

### source-map

> https://webpack.docschina.org/configuration/devtool/

- 我们的代码通常运行在浏览器上时，是通过打包压缩的： 
  - 也就是真实跑在浏览器上的代码，和我们编写的代码其实是有差异的； 
  - 比如ES6的代码可能被转换成ES5； p比如对应的代码行号、列号在经过编译后肯定会不一致； 
  - 比如代码进行丑化压缩时，会将编码名称等修改； p比如我们使用了TypeScript等方式编写的代码，最终转换成JavaScript；
- 但是，当代码报错需要调试时（debug），调试转换后的代码是很困难的 
- 但是我们能保证代码不出错吗？不可能。 
- 那么如何可以调试这种转换后不一致的代码呢？答案就是source-map 
  - source-map是从**已转换的代码**，映射到**原始的源文件**； 
  - 使浏览器可以**重构原始源并在调试器中显示重建的原始源**；

> 在出现错误后，快速定位打包前的源文件

- 如何可以使用source-map呢？两个步骤： 

  - 第一步：根据源文件，生成source-map文件，webpack在打包时，可以通过配置生成source-map； 

  - 第二步：在转换后的代码，最后添加一个注释，它指向sourcemap； 

    ```
    //# sourceMappingURL=common.bundle.js.map
    ```

#### 分析source-map

- 最初source-map生成的文件带下是原始文件的10倍，第二版减少了约50%，第三版又减少了50%，所以目前一个 133kb的文件，最终的source-map的大小大概在300kb。

- 目前的source-map长什么样子呢？ 
  - version：当前使用的版本，也就是最新的第三版； 
  - sources：从哪些文件转换过来的source-map和打包的代码（最初始的文件）； 
  - names：转换前的变量和属性名称（因为我目前使用的是development模式，所以不需要保留转换前的名 称）；
  - mappings：source-map用来和源文件映射的信息（比如位置信息等），一串base64 VLQ（veriablelength quantity可变长度值）编码；
  - file：打包后的文件（浏览器加载的文件）； 
  - sourceContent：转换前的具体代码信息（和sources是对应的关系）； 
  - sourceRoot：所有的sources相对的根目录；

```json
{
  "version": 3,
  "file": "bundle.js",
  "mappings": "mCAQAA,EAAOC,QAAU,CACfC,WATkBC,GACX,aASPC,YANmBC,GACZ,W,mGCLF,MAAMC,EAAM,CAACC,EAAMC,IACjBD,EAAOC,EAGHC,EAAM,CAACF,EAAMC,IACjBD,EAAOC,ICJZE,EAA2B,GAG/B,SAASC,EAAoBC,GAE5B,IAAIC,EAAeH,EAAyBE,GAC5C,QAAqBE,IAAjBD,EACH,OAAOA,EAAaZ,QAGrB,IAAID,EAASU,EAAyBE,GAAY,CAGjDX,QAAS,IAOV,OAHAc,EAAoBH,GAAUZ,EAAQA,EAAOC,QAASU,GAG/CX,EAAOC,QCpBfU,EAAoBK,EAAI,SAAShB,GAChC,IAAIiB,EAASjB,GAAUA,EAAOkB,WAC7B,WAAa,OAAOlB,EAAgB,SACpC,WAAa,OAAOA,GAErB,OADAW,EAAoBQ,EAAEF,EAAQ,CAAEG,EAAGH,IAC5BA,GCLRN,EAAoBQ,EAAI,SAASlB,EAASoB,GACzC,IAAI,IAAIC,KAAOD,EACXV,EAAoBY,EAAEF,EAAYC,KAASX,EAAoBY,EAAEtB,EAASqB,IAC5EE,OAAOC,eAAexB,EAASqB,EAAK,CAAEI,YAAY,EAAMC,IAAKN,EAAWC,MCJ3EX,EAAoBY,EAAI,SAASK,EAAKC,GAAQ,OAAOL,OAAOM,UAAUC,eAAeC,KAAKJ,EAAKC,ICC/FlB,EAAoBsB,EAAI,SAAShC,GACX,oBAAXiC,QAA0BA,OAAOC,aAC1CX,OAAOC,eAAexB,EAASiC,OAAOC,YAAa,CAAEC,MAAO,WAE7DZ,OAAOC,eAAexB,EAAS,aAAc,CAAEmC,OAAO,K,qCCJvD,MAAM,IAAE9B,EAAG,IAAEG,GAAQ,EAAQ,KAK7B4B,QAAQC,IAAIhC,EAAI,GAAI,KACpB+B,QAAQC,IAAI7B,EAAI,GAAI,KAEpB4B,QAAQC,KAAI,IAAApC,YAAW,QACvBmC,QAAQC,KAAI,IAAAlC,aAAY,QAExBiC,QAAQC,IAAIC,K",
  "sources": [
    "webpack://webpack-mode/./src/js/format.js",
    "webpack://webpack-mode/./src/js/math.js",
    "webpack://webpack-mode/webpack/bootstrap",
    "webpack://webpack-mode/webpack/runtime/compat get default export",
    "webpack://webpack-mode/webpack/runtime/define property getters",
    "webpack://webpack-mode/webpack/runtime/hasOwnProperty shorthand",
    "webpack://webpack-mode/webpack/runtime/make namespace object",
    "webpack://webpack-mode/./src/index.js"
  ],
  "sourcesContent": [
    "const dateFormat = (date) => {\r\n  return '2021-12-12'\r\n}\r\n\r\nconst priceFormat = (price) => {\r\n  return '100.00'\r\n}\r\n\r\nmodule.exports = {\r\n  dateFormat,\r\n  priceFormat\r\n}\r\n",
    "export const sum = (num1, num2) => {\r\n  return num1 + num2;\r\n}\r\n\r\nexport const mul = (num1, num2) => {\r\n  return num1 * num2;\r\n}\r\n",
    "// The module cache\nvar __webpack_module_cache__ = {};\n\n// The require function\nfunction __webpack_require__(moduleId) {\n\t// Check if module is in cache\n\tvar cachedModule = __webpack_module_cache__[moduleId];\n\tif (cachedModule !== undefined) {\n\t\treturn cachedModule.exports;\n\t}\n\t// Create a new module (and put it into the cache)\n\tvar module = __webpack_module_cache__[moduleId] = {\n\t\t// no module.id needed\n\t\t// no module.loaded needed\n\t\texports: {}\n\t};\n\n\t// Execute the module function\n\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n\n\t// Return the exports of the module\n\treturn module.exports;\n}\n\n",
    "// getDefaultExport function for compatibility with non-harmony modules\n__webpack_require__.n = function(module) {\n\tvar getter = module && module.__esModule ?\n\t\tfunction() { return module['default']; } :\n\t\tfunction() { return module; };\n\t__webpack_require__.d(getter, { a: getter });\n\treturn getter;\n};",
    "// define getter functions for harmony exports\n__webpack_require__.d = function(exports, definition) {\n\tfor(var key in definition) {\n\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n\t\t}\n\t}\n};",
    "__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }",
    "// define __esModule on exports\n__webpack_require__.r = function(exports) {\n\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n\t}\n\tObject.defineProperty(exports, '__esModule', { value: true });\n};",
    "// esModule 导出 CommonJS 导入\r\nconst { sum, mul } = require('./js/math.js');\r\n\r\n// CommonJS 导出 esModule 导入\r\nimport { dateFormat, priceFormat } from './js/format';\r\n\r\nconsole.log(sum(10, 20));\r\nconsole.log(mul(20, 30));\r\n\r\nconsole.log(dateFormat('aaa'));\r\nconsole.log(priceFormat('bbb'));\r\n\r\nconsole.log(cba);\r\n"
  ],
  "names": [
    "module",
    "exports",
    "dateFormat",
    "date",
    "priceFormat",
    "price",
    "sum",
    "num1",
    "num2",
    "mul",
    "__webpack_module_cache__",
    "__webpack_require__",
    "moduleId",
    "cachedModule",
    "undefined",
    "__webpack_modules__",
    "n",
    "getter",
    "__esModule",
    "d",
    "a",
    "definition",
    "key",
    "o",
    "Object",
    "defineProperty",
    "enumerable",
    "get",
    "obj",
    "prop",
    "prototype",
    "hasOwnProperty",
    "call",
    "r",
    "Symbol",
    "toStringTag",
    "value",
    "console",
    "log",
    "cba"
  ],
  "sourceRoot": ""
}

```

#### 下面几个值不会生成source-map

- false：不使用source-map，也就是没有任何和source-map相关的内容。 
- none：production模式下的默认值，不生成source-map。 
- eval：development模式下的默认值，不生成source-map 
  - 但是它会在eval执行的代码中，添加 //# sourceURL=； 
  - 它会被浏览器在执行时解析，并且在调试面板中生成对应的一些文件目录，方便我们调试代码；

#### eval 的效果

```js
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/format */ \"./src/js/format.js\");\n/* harmony import */ var _js_format__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_format__WEBPACK_IMPORTED_MODULE_0__);\n// esModule 导出 CommonJS 导入\r\nconst { sum, mul } = __webpack_require__(/*! ./js/math.js */ \"./src/js/math.js\");\r\n\r\n// CommonJS 导出 esModule 导入\r\n\r\n\r\nconsole.log(sum(10, 20));\r\nconsole.log(mul(20, 30));\r\n\r\nconsole.log((0,_js_format__WEBPACK_IMPORTED_MODULE_0__.dateFormat)('aaa'));\r\nconsole.log((0,_js_format__WEBPACK_IMPORTED_MODULE_0__.priceFormat)('bbb'));\r\n\r\nconsole.log(cba);\r\n\n\n//# sourceURL=webpack://webpack-mode/./src/index.js?");
```

- 不生成 source-map
- 所有函数通过 eval 来执行，可以把代码变成字符串来执行，正常执行
- 映射到源文件

> 可以精确到错误在那一列

- source-map值
  - 生成一个独立的source-map文件，并且在bundle文件中有一个注释，指向source-map文件；
- eval-source-map值
  - eval-source-map：会生成sourcemap，但是source-map是以DataUrl添加到eval函数的后面
- inline-source-map值
  - inline-source-map：会生成sourcemap，但是source-map是以DataUrl添加到bundle文件的后面
- cheap-source-map
  - 会生成sourcemap，但是会更加高效一些（cheap低开销），因为它**没有生成列映射（Column Mapping）** 
  - 因为在开发中，我们只需要行信息通常就可以定位到错误了

#### 多个值的组合

- 事实上，webpack提供给我们的26个值，是可以进行多组合的。 

- 组合的规则如下： 

  - inline-|hidden-|eval：三个值时三选一； 

  - nosources：可选值； 

  - cheap可选值，并且可以跟随module的值；

    ```
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    ```

#### 最佳实践

- 开发阶段：推荐使用 source-map或者cheap-module-source-map 
  - 这分别是vue和react使用的值，可以获取调试信息，方便快速开发；

- 测试阶段：推荐使用 source-map或者cheap-module-source-map 
  - 测试阶段我们也希望在浏览器下看到正确的错误提示； 
- 发布阶段：false、缺省值（不写）