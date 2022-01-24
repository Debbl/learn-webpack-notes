const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { merge } = require('webpack-merge');

const resolveApp = require('./path');
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

const commonConfig = {
  entry: './src/main.js',
  output: {
    path: resolveApp('./build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': resolveApp('./src'),
      pages: resolveApp('./src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/i,
        use: 'vue-loader',
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new VueLoaderPlugin(),
  ],
};

module.exports = function (env) {
  const isProduction = env.production;
  // console.log(isProduction, '是否为生产环境...');
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
  // console.log(process.env.NODE_ENV, '---> 当前环境');

  const config = isProduction ? prodConfig : devConfig;
  return merge(commonConfig, config);
};
