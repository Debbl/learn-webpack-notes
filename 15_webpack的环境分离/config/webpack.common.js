const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
