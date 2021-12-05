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

