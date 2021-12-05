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

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config wk.config.js"
  }
```

#### 使用 css-loader

