## 04 asset module type

- 我们当前使用的webpack版本是webpack5： 
  - 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader； 
  - 在webpack5之后，我们可以直接使用资源模块类型（asset module type），来替代上面的这些loader；
- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader： 
  - **asset/resource** 发送一个单独的文件并导出 URL。之前通过使用 **file-loader** 实现； 
  - **asset/inline** 导出一个资源的 data URI。之前通过使用 **url-loader** 实现； 
  - **asset/source** 导出资源的源代码。之前通过使用 **raw-loader** 实现； 
  - **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 **url-loader**，并且配置资源 体积限制实现；

### asset/resource

- 比如加载图片，我们可以使用下面的方式

```js
{
    test: /.(png|jpe?g|gif|svg)$/i,
    type: 'asset/resource',
}
```

- 但是，如何可以自定义文件的输出路径和文件名呢？ 

  > [ext] 前面可以不用加.

  - 方式一：修改output，添加**assetModuleFilename**属性； 

  ```js
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './build'),
      assetModuleFilename: "img/[name].[hash:6][ext]"
    },
  ```

  - 方式二：在Rule中，添加一个**generator**属性，并且设置**filename**；

  ```js
  {
  	test: /.(png|jpe?g|gif|svg)$/,
  	type: 'asset/resource',
  	generator: {
  		filename: "img/[name].[hash:6][ext]"
  	}
  }
  ```

### url-loader的limit效果

- 我们需要两个步骤来实现： 
  - 步骤一：将type修改为**asset**； 
  - 步骤二：添加一个**parser**属性，并且制定dataUrl的条件，添加maxSize属性；

```js
{
	test: /.(png|jpe?g|gif|svg)$/,
	type: 'asset',
	generator: {
		filename: "img/[name].[hash:6][ext]"
	},
	parser: {
		dataUrlCondition: {
			maxSize: 100 * 1024
		}
	}
}
```

### 字体文件 asset/resource

- 这个时候打包会报错，因为无法正确的处理eot、ttf、woff等文件： 
  - 我们可以选择使用file-loader来处理，也可以选择直接使用webpack5的资源模块类型来处理；

```js
{
        test: /\.(woff2?|eot|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]"
        }
}
```

## 认识plugin

- Webpack的另一个核心是Plugin，官方有这样一段对Plugin的描述： 
  - While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

- 上面表达的含义翻译过来就是： 
  - Loader是用于**特定的模块类型**进行转换； 
  - Plugin可以用于**执行更加广泛的任务**，比如打包优化、资源管理、环境变量注入等；

### CleanWebpackPlugin

- 前面我们演示的过程中，每次修改了一些配置，**重新打包时，都需要手动删除dist文件夹**： 
- 我们可以借助于一个插件来帮助我们完成，这个插件就是**CleanWebpackPlugin**； 
- 首先，我们先安装这个插件：

```shell
npm install clean-webpack-plugin -D
```

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
};
```

### HtmlWebpackPlugin

- 另外还有一个不太规范的地方： 
  - 我们的HTML文件是编写在根目录下的，而**最终打包的dist文件夹中是没有index.html文件的**。 
  - 在进行项目部署的时，**必然也是需要有对应的入口文件index.html**； 
  - 所以我们也需要对**index.html进行打包处理**；

- 对HTML进行打包处理我们可以使用另外一个插件：**HtmlWebpackPlugin**；

```shell
npm install html-webpack-plugin -D
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
```

#### 生成的index.html分析

- 我们会发现，现在自动在dist文件夹中，生成了一个index.html的文件： 
- 该文件中也自动添加了我们打包的bundle.js文件；

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script defer="defer" src="bundle.js"></script>
  </head>
  <body></body>
</html>

```

- 这个文件是如何生成的呢？ 
  - 默认情况下是根据**ejs的一个模板**来生成的；
  - 在html-webpack-plugin的源码中，有一个default_index.ejs模块；

#### 自定义HTML模板

- 如果我们想在自己的模块中加入一些比较特别的内容： 
  - 比如添加一个noscript标签，在用户的JavaScript被关闭时，给予响应的提示； 
  - 比如在开发vue或者react项目时，我们需要一个可以挂载后续组件的根标签  \<div id="app">\</div>；

- 这个我们需要一个属于自己的index.html模块：

> public/index.html

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <noscript>
      <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

- 自定义模板数据填充
  - 上面的代码中，会有一些类似这样的语法<% 变量 %>，这个是EJS模块填充数据的方式。 
  - 在配置HtmlWebpackPlugin时，我们可以添加如下配置： 
    - template：指定我们要使用的模块所在的路径； 
    - title：在进行htmlWebpackPlugin.options.title读取时，就会读到该信息；

> 这里会报一个错误 ReferenceError: BASE_URL is not defined，需要用到 DefinePlugin

### DefinePlugin的介绍

- 这是因为在编译template模块时，有一个BASE_URL： 
  - \<link rel="icon" href="<%= BASE_URL %>favicon.ico">； 
  - 但是我们并没有设置过这个常量值，所以会出现没有定义的错误；

- 这个时候我们可以使用DefinePlugin插件；

#### DefinePlugin的使用

- DefinePlugin允许在编译时创建配置的全局常量，是一个webpack内置的插件（不需要单独安装）：

```js
const { DefinePlugin } = require('webpack');
module.exports = {
  // ...
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack项目",
      template: "./public/index.html"
    })
  ]
};

```

> 这个 BASE_URL 的值是一个字符串

- 这个时候，编译template就可以正确的编译了，会读取到BASE_URL的值；

### CopyWebpackPlugin

- 在vue的打包过程中，如果我们将一些文件放到public的目录下，那么这个目录会被**复制到dist文件夹中**。 
  - 这个复制的功能，我们可以使用CopyWebpackPlugin来完成；
- 安装CopyWebpackPlugin插件：

```shell
npm install copy-webpack-plugin -D
```

- 接下来配置CopyWebpackPlugin即可： 
  - 复制的规则在patterns中设置； 
  - from：设置从哪一个源中开始复制； 
  - to：复制到的位置，**可以省略，会默认复制到打包的目录下**； 
  - globOptions：设置一些额外的选项，其中可以编写**需要忽略的文件**： 
    - .DS_Store：mac目录下回自动生成的一个文件； 
    - index.html：也不需要复制，因为我们已经通过HtmlWebpackPlugin完成了index.html的生成；

```js
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
 	// ...
  plugins: [
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "webpack项目",
      template: "./public/index.html"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: [
              '**/.DS_Store',
              '**/index.html'
            ]
          }
        }
      ]
    })
  ]
};
```

> 忽略的文件记得要用 **/\<filename> 的格式