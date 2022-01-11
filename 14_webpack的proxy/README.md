# Webpack的Proxy

## Proxy 代理

- proxy是我们开发中非常常用的一个配置选项，它的目的设置代理来解决跨域访问的问题： 
  - 比如我们的一个api请求是 http://localhost:8888，但是本地启动服务器的域名是 http://localhost:8000，这 个时候发送网络请求就会出现跨域的问题；
  - 那么我们可以将请求先发送到一个代理服务器，代理服务器和API服务器没有跨域的问题，就可以解决我们的 跨域问题了；
- 我们可以进行如下的设置： 
  - target：表示的是代理到的目标地址，比如 /api-hy/moment会被代理到 http://localhost:8888/apihy/moment；
  - pathRewrite：默认情况下，我们的 /api-hy 也会被写入到URL中，如果希望删除，可以使用pathRewrite； 
  - secure：默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false； 
  - changeOrigin：它表示是否更新代理后请求的headers中host地址；

```js
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
```

## changeOrigin的解析

- 这个 changeOrigin官方说的非常模糊，通过查看源码我发现其实是要修改代理请求中的headers中的host属性： 
  - 因为我们真实的请求，其实是需要通过 http://localhost:8888来请求的； 
  - 但是因为使用了代码，默认情况下它的值时 http://localhost:8000； 
  - 如果我们需要修改，那么可以将changeOrigin设置为true即可；

## historyApiFallback

- historyApiFallback是开发中一个非常常见的属性，它主要的作用是解决SPA页面在路由跳转之后，进行页面刷新 时，返回404的错误。
- boolean值：默认是false p如果设置为true，那么在刷新时，返回404错误时，会自动返回 index.html 的内容；
- object类型的值，可以配置rewrites属性： p可以配置from来匹配路径，决定要跳转到哪一个页面；
- 事实上devServer中实现historyApiFallback功能是通过connect-history-api-fallback库的： 
  - 可以查看connect-history-api-fallback 文档

# resolve模块解析

- resolve用于设置模块如何被解析： 
  - 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库； 
  - resolve可以帮助webpack从每个 require/import 语句中，找到需要引入到合适的模块代码； 
  - webpack 使用 enhanced-resolve 来解析文件路径；
- webpack能解析三种文件路径： 
- 绝对路径
  - 由于已经获得文件的绝对路径，因此不需要再做进一步解析。
- 相对路径 
  - 在这种情况下，使用 import 或 require 的资源文件所处的目录，被认为是上下文目录； 
  - 在 import/require 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径；
- 模块路径 
  - 在 resolve.modules中指定的所有目录检索模块； 
  - 默认值是 ['node_modules']，所以默认会从node_modules中查找文件； 
  - 我们可以通过设置别名的方式来替换初识模块路径，具体后面讲解alias的配置；

## 确实文件还是文件夹

- 如果是一个文件： 
  - 如果文件具有扩展名，则直接打包文件； 
  - 否则，将使用 resolve.extensions选项作为文件扩展名解析；
- 如果是一个文件夹： 
  - 会在文件夹中根据 resolve.mainFiles配置选项中指定的文件顺序查找； 
    - resolve.mainFiles的默认值是 ['index']； 
    - 再根据 resolve.extensions来解析扩展名；

## extensions和alias配置

- extensions是解析到文件时自动添加扩展名： 
  - 默认值是 ['.wasm', '.mjs', '.js', '.json']； 
  - 所以如果我们代码中想要添加加载 .vue 或者 jsx 或者 ts 等文件时，我们必须自己写上扩展名；
- 另一个非常好用的功能是配置别名alias： 
  - 特别是当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要 ../../../这种路径片段； 
  - 我们可以给某些常见的路径起一个别名；

```js
resolve: {
    extensions: ['.js', '.json', '.jsx', '.wasm'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      pages: path.resolve(__dirname, './src/pages'),
    },
  },
```

