const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { merge } = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');
const resolveApp = require('./path');
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');

const commonConfig = {
  entry: {
    // main: { import: './src/main.js', dependOn: 'shared' },
    // index: { import: './src/index.js', dependOn: 'shared' },
    // // lodash: 'lodash',
    // // dayjs: 'dayjs',
    // shared: ['lodash', 'dayjs']
    main: './src/main.js',
    index: './src/index.js',
  },
  output: {
    path: resolveApp('./build'),
    filename: '[name].bundle.js',
    clean: true,
    chunkFilename: '[id].[name].chunk.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    // true || multiple || single
    // runtimeChunk: 'single',

    // runtimeChunk: {
    //   name: "runtime"
    // },

    runtimeChunk: {
      name: function(entrypoint) {
        return `runtime-${entrypoint.name}`;
      }
    },
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      cacheGroups: {
        defaultVenders: {
          test: /[\\/]node_modules[\\/]/,
          filename: '[id].venders.js',
          priority: -10, // 优先级
        }
      },
    },
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
