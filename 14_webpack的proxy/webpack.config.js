const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    // publicPath: './abc',
  },
  devServer: {
    hot: true,
    // static: {
    //   directory: path.join(__dirname, './build'),
    //   publicPath: '/abc',
    // },
    static: {
      directory: path.join(__dirname, './static'),
      publicPath: '/static',
    },
    port: 3000,
    open: true,
    compress: true,
    proxy: {
      '/api': 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
      secure: false,
      changeOrigin: true,
    },
    // historyApiFallback: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: 'views/landing.html' }],
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      pages: path.resolve(__dirname, './src/pages'),
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
    new ReactRefreshWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
