const path = require('path');

module.exports = {
  // 指定入口文件，有一个依赖图可以打包所有的使用的模块
  entry: './src/main.js',
  // 出口文件
  output: {
    filename: 'bundle.js',
    // 必须使用绝对路径
    path: path.resolve(__dirname, './build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }], // 完整写法
        use: ['style-loader', 'css-loader'], // 简写一
        // loader: "css-loader" // 简写二 只用一个 loader
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
};
