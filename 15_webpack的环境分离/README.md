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

