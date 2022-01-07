const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
// 获取配置信息
const config = require('./webpack.config.js');
// webpack 编译器
const compiler =  webpack(config);
// 中间件
const middleware = webpackDevMiddleware(compiler);
// 使用中间件
app.use(middleware);

app.listen(3000, () => {
  console.log("服务已经开启在3000端口...");
})