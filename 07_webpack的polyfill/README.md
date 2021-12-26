# 07_Polyfill

- Polyfill是什么呢？ 
  - 翻译：一种用于衣物、床具等的聚酯填充材料, 使这些物品更加温暖舒适； 
  - 理解：更像是应该填充物（垫片），一个补丁，可以帮助我们更好的使用JavaScript；
- 为什么时候会用到polyfill呢？ 
  - 比如我们使用了一些语法特性（例如：Promise, Generator, Symbol等以及实例方法例如 Array.prototype.includes等）
  - 但是某些浏览器压根不认识这些特性，必然会报错； 
  - 我们可以使用polyfill来填充或者说打一个补丁，那么就会包含该特性了；

## 如何使用polyfill？

- babel7.4.0之前，可以使用 @babel/polyfill的包，但是该包现在已经不推荐使用了：
- babel7.4.0之后，可以通过单独引入core-js和regenerator-runtime来完成polyfill的使用：

```shell
npm install core-js regenerator-runtime --save
```

### 配置babel.config.js

- 我们需要在babel.config.js文件中进行配置，给preset-env配置一些属性：
- useBuiltIns：设置以什么样的方式来使用polyfill； 
- corejs：设置corejs的版本，目前使用较多的是3.x的版本，比如我使用的是3.8.x的版本； 
  - 另外corejs可以设置是否对提议阶段的特性进行支持； 
  - 设置 proposals属性为true即可；

### useBuiltIns属性设置

- useBuiltIns属性有三个常见的值
- 第一个值：false 
  - 打包后的文件不使用polyfill来进行适配； 
  - 并且这个时候是不需要设置corejs属性的；

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
      },
    ],
  ],
};

```

- 第二个值：usage 
  - 会根据源代码中出现的语言特性，自动检测所需要的polyfill； 
  - 这样可以确保最终包里的polyfill数量的最小化，打包的包相对会小一些； 
  - 可以设置corejs属性来确定使用的corejs的版本；

> 使用 polyfill 时可能与其他的库的 polyfill 有冲突，可以在 rules 里面排除 node_modules 文件夹

```js
{
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          loader: 'babel-loader'
        },
      },
```

> core-js 的版本问题
>
> 最终配置

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3 // 指定 core-js 为3的版本
      },
    ],
  ],
};
```

- 第三个值：entry 

  - 如果我们依赖的某一个库本身使用了某些polyfill的特性，但是因为我们使用的是usage，所以之后用户浏览器 可能会报错；
  - 所以，如果你担心出现这种情况，可以使用 entry； 
  - 并且需要在入口文件中添加 `import 'core-js/stable'; import 'regenerator-runtime/runtime'; 
  - **这样做会根据 browserslist 目标导入所有的polyfill，但是对应的包也会变大**

  ```js
  module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3, // 指定 core-js 为3的版本
        },
      ],
    ],
  };
  ```

  > 导入core-js/stable和regenerator-runtime

  ```js
  import 'core-js/stable';
  import 'regenerator-runtime/runtime';
  
  const message = "Hello World";
  
  const foo = (info) => {
    console.log(info);
  }
  
  const p = new Promise((resolve, reject) => {})
  
  foo(message);
  ```

## 认识Plugin-transform-runtime（了解）

- 在前面我们使用的polyfill，默认情况是添加的所有特性都是全局的 
  - 如果我们正在编写一个工具库，这个工具库需要使用polyfill； 
  - 别人在使用我们工具时，工具库通过polyfill添加的特性，可能会污染它们的代码； 
  - 所以，当编写工具时，babel更推荐我们使用一个插件： @babel/plugin-transform-runtime来完成polyfill 的功能；
- 安装 @babel/plugin-transform-runtime：

```shell
npm install @babel/plugin-transform-runtime --save
```

> 因为我们使用了corejs3，所以我们需要安装对应的库：

```shell
npm install @babel/runtime-corejs3 --save
```

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'entry',
        // corejs: 3, // 指定 core-js 为3的版本
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};
```

