const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    chunkIds: 'deterministic',
    splitChunks: {
      // async 异步导入代码
      // initial 同步导入代码
      // all 异步/同步导入代码  (常用)
      chunks: 'all',
      // 最小尺寸 字节 拆分出的包要大于这个值
      minSize: 200,
      // 将大于maxSize的包，拆分成不小于minSize的包
      maxSize: 200,
      // 引入的包，至少被引用了几次， 引用一次就拆分
      minChunks: 1,
      cacheGroups: {
        defaultVenders: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[id].venders.js',
          priority: -10, // 优先级
        },
        // bar: {
        //   test: /bar_/,
        //   filename: '[id].bar.js',
        // },
        default: {
          minChunks: 2, // 引用两次单独打包
          filename: '[id].common.js',
          priority: -20 // 优先级
        }
      },
    },
  },
};
