## PostCSS 工具

- 什么是PostCSS呢？ 
  - PostCSS是一个通过JavaScript来转换样式的工具； 
  - 这个工具可以帮助我们进行一些CSS的转换和适配，比如**自动添加浏览器前缀、css样式的重置**； 
  - 但是实现这些工具，我们需要借助于PostCSS对应的插件；
- 如何使用PostCSS呢？主要就是两个步骤： 
  - 第一步：查找PostCSS在构建工具中的扩展，比如webpack中的postcss-loader； 
  - 第二步：选择可以添加你需要的PostCSS相关的插件；

### 命令行使用postcss

- 当然，我们能不能也直接在终端使用PostCSS呢？ 

  - 也是可以的，但是我们需要单独安装一个工具postcss-cli； 

- 我们可以安装一下它们：postcss、postcss-cli 

  ```shell
  npm install postcss postcss-cli -D
  ```

- 我们编写一个需要添加前缀的css： 

  - https://autoprefixer.github.io/ 
  - 我们可以在上面的网站中查询一些添加css属性的样式；

```shell
npx postcss ./src/css/test.css -o result.css # 输出文件
```

### 插件autoprefixer

- 因为我们**需要添加前缀**，所以要安装autoprefixer：

```shell
npm install autoprefixer -D
```

- 直接使用使用postcss工具，并且制定使用autoprefixer

```shell
npx postcss --use autoprefixer -o end.css ./src/css/test.css 
```

## postcss-loader

- 真实开发中我们必然不会直接使用命令行工具来对css进行处理，而是可以借助于构建工具： 
  - 在webpack中使用postcss就是使用postcss-loader来处理的；

- 我们来安装postcss-loader：

```shell
npm install postcss-loader -D
```

- 我们修改加载css的loader

> webpack.config.js

```js
use: [
    'style-loader',
    'css-loader',
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    require('autoprefixer')
                ]
            }
        }
    }
]
```

## 单独的postcss配置文件

> postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}

```

## postcss-preset-env

- 事实上，在配置postcss-loader时，我们配置插件并不需要使用autoprefixer。 
- 我们可以使用另外一个插件：postcss-preset-env 
  - postcss-preset-env也是一个postcss的插件； 
  - 它可以帮助我们将一些现代的CSS特性，转成大多数浏览器认识的CSS，并且会根据目标浏览器或者运行时环 境添加所需的polyfill；
  - 也包括会自动帮助我们添加autoprefixer（**所以相当于已经内置了autoprefixer**）；

- 首先，我们需要安装postcss-preset-env

```shell
npm install postcss-preset-env -D
```

- 之后，我们直接修改掉之前的autoprefixer即可

> postcss.config.js

```shell
module.exports = {
  plugins: [
    require('postcss-preset-env')
  ]
}
```

