const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    splitChunks: {
      // async 异步导入代码
      // initial 同步导入代码
      // all 异步/同步导入代码  (常用)
      chunks: 'all',
    },
  },
};
