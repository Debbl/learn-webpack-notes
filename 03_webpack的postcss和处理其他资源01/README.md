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

### 一个小的知识点

- index.css引用test.css

> index.css

```css
@import './test.css';

.content {
    color: red;
}

```

> test.css

```css
:fullscreen {

}

.content {
    color: #12345678;
    user-select: none;
    transition: all 2s ease;
}
```

- 可以发现 test.css 并没有被处理
  - 原因是因为index.css先被postcss-loader处理发现里面还有一个test.css就直接往下不是返回再用postcss-loader在处理一遍test.css
- 我们可以在`webpack.config.js`里添加、
  - importLoaders为1返回执行前一个loader

```js
use: [
    'style-loader',
    {
        loader: "css-loader",
        options: {
            importLoaders: 1
        }
    },
    'postcss-loader'
]
```

## 加载和处理其他资源

### file-loader

- 要处理jpg、png等格式的图片，我们也需要有对应的loader：file-loader 
  - file-loader的作用就是帮助我们处理**import/require()**方式引入的一个文件资源，并且会将它放到我们输出的文件夹中；
  - 当然我们待会儿可以学习如何修改它的名字和所在文件夹；

- 安装file-loader

```shell
npm install file-loader -D
```

```js
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: "file-loader"
      }
```

### 文件的名称规则

- 有时候我们处理后的文件名称按照一定的规则进行显示： 
  - 比如保留原来的文件名、扩展名，同时为了防止重复，包含一个hash值等；
- 这个时候我们可以使用PlaceHolders来完成，webpack给我们提供了大量的PlaceHolders来显示不同的内容： 
  - https://webpack.js.org/loaders/file-loader/#placeholders 
  - 我们可以在文档中查阅自己需要的placeholder；
- 我们这里介绍几个最常用的`placeholder`： 
  - [ext]： 处理文件的扩展名； p[name]：处理文件的名称； 
  - [hash]：文件的内容，使用MD4的散列函数处理，生成的一个128位的hash值（32个十六进制）； 
  - [contentHash]：在file-loader中和[hash]结果是一致的（在webpack的一些其他地方不一样，后面会讲到）； p
  - [hash:<length>]：截图hash的长度，默认32个字符太长了； 
  - [path]：文件相对于webpack配置文件的路径；

### 设置文件名称

```js
{
    test: /\.(png|jpe?g|gif|svg)$/,
        use: {
            loader: "file-loader",
                options: {
                    name: "img/[name].[hash:8].[ext]"
                }
        }
}
```

### 设置文件的存放路径

- 当然，我们刚才通过 img/ 已经设置了文件夹，这个也是vue、react脚手架中常见的设置方式： 
  - 其实按照这种设置方式就可以了； 
  - 当然我们也可以通过outputPath来设置输出的文件夹；

```js
 {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "img"
          }
        }
}
```

