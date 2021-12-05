### webpack 配置文件

#### 默认文件

> 在根目录创建一个 `webpack.config.js` 文件（默认是使用这个文件）

```js
const path = require("path");

module.exports = {
  // 指定入口文件，有一个依赖图可以打包所有的使用的模块
  entry: "./src/main.js",
  // 出口文件
  output: {
    filename: "bundle.js",
    // 必须使用绝对路径
    path: path.resolve(__dirname, "./build")
  }
}
```

> 执行 `npx webpack` 可以正常打包

- Webpack 依赖图

> 从入口开始，会生成一个依赖关系图，这个依赖关系图会包含应用程序中所需的所有模块（比如.js文件、css文件、图片、 字体等）然后遍历图结构，打包一个个模块（根据文件的不同使用不同的loader来解析）；

 #### 指定配置文件

> 但是如果我们的配置文件并不是webpack.config.js的名字，而是其他的名字呢？ 比如我们将webpack.config.js修改成了 wk.config.js； 这个时候我们可以通过 `--config` 来指定对应的配置文件；

```shell
npx webpack --config wk.config.js
```

> 可以在 package.json 中添加脚本，方便执行

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config wk.config.js"
  }
```

#### 使用 css-loader

> 我们使用 import 直接引入 .css 文件会报以下错误

```shell
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

ERROR in ./src/css/index.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> .content {
|     color: red;
| }
 @ ./src/js/component.js 1:0-26
 @ ./src/main.js 1:0-24

webpack 5.64.4 compiled with 1 error and 1 warning in 453 ms
```

> 我们可能需要一个 loader 去加载这个文件

- loader 可以用于对模块的源代码进行转换； 
- 我们可以将css文件也看成是一个模块，我们是通过import来加载这个模块的； 
- 在加载这个模块时，webpack其实并不知道如何对其进行加载，我们必须制定对应的loader来完成这个功能；

> 那么我们需要一个什么样的loader呢？

- 对于加载css文件来说，我们需要一个可以读取css文件的loader；

- 这个loader最常用的是css-loader；

> css-loader 安装

```shell
npm install css-loader -D
```

### loader 的三种使用方案

https://webpack.docschina.org/concepts/loaders/#using-loaders

- 内联方式
- CLI方式（webapck5中已弃用）
- 配置文件方式

#### 内联方式

```js
import "css-loader!../css/index.css";
```

#### CLI 方式

> package.json

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --module-bind 'css=style-loader!css-loader' --config wk.config.js"
  }
```

#### loader 配置方式

> 配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息：

- module.rules中允许我们配置多个loader（因为我们也会继续使用其他的loader，来完成其他文件的加载）； 
-  这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个Loader有一个全局的概览；

> module.rules的配置如下：

- rules属性对应的值是一个数组：[Rule]

- 数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性：

  - test属性：用于对 resource（资源）进行匹配的，通常会设置成正则表达式；
  - use属性：对应的值时一个数组：[UseEntry]
    - UseEntry是一个对象，可以通过对象的属性来设置一些其他属性
    - loader：必须有一个 loader属性，对应的值是一个字符串；
    - options：可选的属性，值是一个字符串或者对象，值会被传入到loader中； 
    - query：目前已经使用options来替代；
    - 传递字符串（如：use: [ 'style-loader' ]）是 loader 属性的简写方式（如：use: [ { loader: 'style-loader'} ]）；

  - loader属性： Rule.use: [ { loader } ] 的简写。

**loader 的执行顺序是从右至左的**

##### css-loader

> 处理 css 文件

> 完整写法、简写一、二

```json
module: {
    rules: [
      {
        test: /\.css$/,
        // use: [{ loader: 'style-loader' }, { loader: 'css-loader' }], // 完整写法，可以加 options
        use: ["style-loader", "css-loader"] // 简写一
        // loader: "css-loader" // 简写二 只能用一个 loader
      },
    ],
  },
```

##### style-loader

> 我们已经可以通过css-loader来加载css文件了 

- 但是你会发现这个css在我们的代码中并没有生效（页面没有效果）。

> 这是为什么呢？把 css 通过内联样式插入，**添加一个 style 标签**

- 因为css-loader只是负责将.css文件进行解析，并不会将解析之后的css插入到页面中； 
- 如果我们希望再完成插入style的操作，那么我们还需要另外一个loader，就是style-loader；

##### less文件的处理 less 和 less-loader

- 使用 less 工具处理 .less 文件

```shell
npm install less -D
```

```shell
less ./component.less > component.css # 生成 css 文件
```

- 使用 less-loader

> less-loader 会自动使用 less 工具

```shell
npm install less-loader --dev
```

```json
{
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader'],
}
```

### 浏览器的兼容性

- 我们来思考一个问题：开发中，浏览器的兼容性问题，我们应该如何去解决和处理？ 
  - 当然这个问题很笼统，这里我说的兼容性问题不是指屏幕大小的变化适配； 
  - 我这里指的兼容性是针对不同的浏览器支持的特性：比如css特性、js语法，之间的兼容性；

- 我们知道市面上有大量的浏览器： 

  - 有Chrome、Safari、IE、Edge、Chrome for Android、UC Browser、QQ Browser等等； 

  - 它们的市场占率是多少？我们要不要兼容它们呢？

- 其实在很多的脚手架配置中，都能看到类似于这样的配置信息： 

  - 这里的百分之一，就是指市场占有率

```
> 1%
last 2 versions
not dead
```

市场占有率可以在这里查询

- https://caniuse.com/usage-table

#### browserlist工具

- 但是有一个问题，我们如何可以在css兼容性和js兼容性下共享我们配置的兼容性条件呢？ 
  - 就是当我们设置了一个条件： > 1%； 
  - 我们表达的意思是css要兼容市场占有率大于1%的浏览器，js也要兼容市场占有率大于1%的浏览器； 
  - 如果我们是通过工具来达到这种兼容性的，比如后面我们会讲到的postcss-prest-env、babel、autoprefixer等
- 如何可以让他们共享我们的配置呢？ 
  - 这个问题的答案就是Browserslist；
- Browserslist是什么？Browserslist是一个在不同的前端工具之间，共享目标浏览器和Node.js版本的配置：
  - Autoprefixer
  - Babel
  - postcss-preset-env
  - eslint-plugin-compat
  - stylelint-no-unsupported-browser-features
  - postcss-normalize
  - obsolete-webpack-plugin

#### 浏览器的查询过程

- 我们可以编写类似这样的配置

```
> 1%
lase 2 versions
not dead
```

- 那么之后，这些工具会根据我们的配置来获取相关的浏览器信息，以方便决定是否需要进行兼容性的支持： 
  - 条件查询使用的是`caniuse-lite`的工具，这个工具的数据来自于`caniuse`的网站上；

#### 命令行使用 browserslist工具

```shell
 npx browserslist "> 1%, last 2 versions, not dead"
```

#### 配置browserslist

- 在 package.json 中配置

```json
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not dead"
  ]
```

- `.browserslist`文件

```
> 1%
last 2 versions
not dead
```

