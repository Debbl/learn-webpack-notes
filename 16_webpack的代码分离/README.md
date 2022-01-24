# Webpack的环境分离

## 如何区分开发环境

- 目前我们所有的webpack配置信息都是放到一个配置文件中的：`webpack.config.js` 
  - 当配置越来越多时，这个文件会变得越来越不容易维护； 
  - 并且某些配置是在开发环境需要使用的，某些配置是在生成环境需要使用的，当然某些配置是在开发和生成环 境都会使用的；
  - 所以，我们最好对配置进行划分，方便我们维护和管理；
- 那么，在启动时如何可以区分不同的配置呢？ 
  - 方案一：编写两个不同的配置文件，开发和生成时，分别加载不同的配置文件即可； 
  - 方式二：使用相同的一个入口配置文件，通过设置参数来区分它们；

```js
  "scripts": {
    "build": "webpack",
    "serve": "webpack serve",
    "build2": "webpack --config ./config/webpack.common.js --env production",
    "serve2": "webpack serve --config ./config/webpack.common.js --env development"
  },
```

> --env 的参数会传给函数的 env 形参

```js
module.exports = function (env) {
  const isProduction = env.production === 'production';
  console.log(isProduction, '是否是生产环境...');
  console.log(env);
  return {
    entry: './src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../build'),
    },
    plugins: [new HtmlWebpackPlugin()],
  };
};
```

## 入口文件解析 `context`

- 我们之前编写入口文件的规则是这样的：./src/index.js，但是如果我们的配置文件所在的位置变成了 config 目录， 我们是否应该变成 ../src/index.js呢？ 
  - 如果我们这样编写，会发现是报错的，依然要写成 ./src/index.js； 
  - 这是因为入口文件其实是和另一个属性时有关的 context；
- context的作用是用于解析入口（entry point）和加载器（loader）：
- 官方说法：默认是当前路径（默认是webpack的启动目录）

> ./config/webpack.common.js

```js
module.exports = function (env) {
  const isProduction = env.production === 'production';
  console.log(isProduction, '是否是生产环境...');
  console.log(env);
  return {
    // context的作用是用于解析入口（entry point）和加载器（loader）
    context: path.resolve(__dirname, './'),
    entry: '../src/main.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../build'),
    },
    plugins: [new HtmlWebpackPlugin()],
  };
};
```

## 配置文件分离

- 路径 path.js

> 解决 context 配置问题

- babel.config.js
- 插件 merge

> babel.config.js

```js
const presets = [
  '@babel/preset-env', //
  '@babel/preset-react',
];

const plugins = [];

console.log(process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  plugins.push(['react-refresh/babel']);
} else {
}

module.exports = {
  presets,
  plugins,
};

```

> 这个 process 是 Node 里的全局变量，相当于浏览器里的 window 和 document，这里在webpack.common.js 里给 process.env.NODE_ENV 赋值了。

