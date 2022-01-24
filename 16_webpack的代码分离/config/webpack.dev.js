const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    compress: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: 'views/landing.html' }],
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
};
