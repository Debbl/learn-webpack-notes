# Webpack的代码分离

## 认识代码分离

- 代码分离（Code Splitting）是webpack一个非常重要的特性： 
  - 它主要的目的是将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件； 
  - 比如默认情况下，所有的JavaScript代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载， 就会影响首页的加载速度；
  - 代码分离可以分出出更小的bundle，以及控制资源加载优先级，提供代码的加载性能；
  
- Webpack中常用的代码分离有三种：
  - 入口起点：使用entry配置手动分离代码；
  
  ```js
    entry: {
      main: './src/main.js',
      index: './src/index.js',
    },
    output: {
      path: resolveApp('./build'),
      filename: '[name].bundle.js',
      clean: true,
    },	
  ```
  
  - 防止重复：使用Entry Dependencies或者SplitChunksPlugin去重和分离代码；
  
    - Entry Dependencies
  
    ```js
      entry: {
        main: { import: './src/main.js', dependOn: 'shared' },
        index: { import: './src/index.js', dependOn: 'shared' },
        // lodash: 'lodash',
        // dayjs: 'dayjs',
        shared: ['lodash', 'dayjs']
      },
    ```
  
    > Tip:  去除注释信息
    >
    > ```js
    > const TerserPlugin = require("terser-webpack-plugin");
    > 
    > module.exports = {
    >   mode: 'production',
    >   optimization: {
    >     minimizer: [
    >       new TerserPlugin({
    >         extractComments: false,
    >       }),
    >     ],
    >   },
    > };
    > ```
  
    - SplitChunksPlugin
  
      - 另外一种分包的模式是splitChunk，它是使用SplitChunksPlugin来实现的： 
        - 因为该插件webpack已经默认安装和集成，所以我们并不需要单独安装和直接使用该插件； 
        - 只需要提供SplitChunksPlugin相关的配置信息即可；
      - Webpack提供了SplitChunksPlugin默认的配置，我们也可以手动来修改它的配置： 
        - 比如默认配置中，chunks仅仅针对于异步（async）请求，我们可以设置为initial或者all；
  
      ```js
      const TerserPlugin = require('terser-webpack-plugin');
      
      module.exports = {
        mode: 'production',
        optimization: {
          minimizer: [
            new TerserPlugin({
              extractComments: false,
            }),
          ],
          splitChunks: {
            // async 异步导入代码
            // initial 同步导入代码
            // all 异步/同步导入代码  (常用)
            chunks: 'all',
          },
        },
      };
      ```
  
      > 952.bundle.js 为打包的代码
  
      ![](./images/01.png)
  
      - ```js
          optimization: {
            minimizer: [
              new TerserPlugin({
                extractComments: false,
              }),
            ],
            splitChunks: {
              // async 异步导入代码
              // initial 同步导入代码
              // all 异步/同步导入代码  (常用)
              chunks: 'all',
              // 最小尺寸 字节 拆分出的包要大于这个值
              minSize: 200,
              // 将大于maxSize的包，拆分成不小于minSize的包
              maxSize: 200,
              // 引入的包，至少被引用了几次， 引用一次就拆分
              minChunks: 1,
              cacheGroups: {
                defaultVenders: {
                  test: /[\\/]node_modules[\\/]/,
                  filename: '[id].venders.js',
                  priority: -10, // 优先级
                },
                // bar: {
                //   test: /bar_/,
                //   filename: '[id].bar.js',
                // },
                default: {
                  minChunks: 2, // 引用两次单独打包
                  filename: '[id].common.js',
                  priority: -20 // 优先级
                }
              },
            },
          },
        ```
  
        > 常用设置
  
      - ```
          optimization: {
            splitChunks: {
              chunks: 'all',
              cacheGroups: {
                defaultVenders: {
                  test: /[\\/]node_modules[\\/]/,
                  filename: '[id].venders.js',
                },
              },
            },
          },
        ```
  
- 主要有四个文件

  - main.bundle.js
  - id.vender.js // 第三方的
  - id.common.js // 引用多次的
  - runtime.js


## 动态导入(dynamic import)

> 会生成新文件

- 另外一个代码拆分的方式是动态导入时，webpack提供了两种实现动态导入的方式： 
  - 第一种，使用ECMAScript中的 import() 语法来完成，也是目前推荐的方式； 
  - 第二种，使用webpack遗留的 require.ensure，目前已经不推荐使用；
- 比如我们有一个模块 bar.js： 
  - 该模块我们希望在代码运行过程中来加载它（比如判断一个条件成立时加载）； 
  - 因为我们并不确定这个模块中的代码一定会用到，所以最好拆分成一个独立的js文件； 
  - 这样可以保证不用到该内容时，浏览器不需要加载和处理该文件的js代码； 
  - 这个时候我们就可以使用动态导入；
- 注意：使用动态导入bar.js： 
  - 在webpack中，通过动态导入获取到一个对象； 
  - 真正导出的内容，在改对象的default属性中，所以我们需要做一个简单的解构；

### optimization.chunkIds配置

-  optimization.chunkIds配置用于告知webpack模块的id采用什么算法生成。 
  - 有三个比较常见的值： 
    - natural：按照数字的顺序使用id； 
    - named：development下的默认值，一个可读的名称的id； 
    - deterministic：确定性的，在不同的编译中不变的短数字id ü在webpack4中是没有这个值的； 
  - 那个时候如果使用natural，那么在一些编译发生变化时，就会有问题；
- 最佳实践： 
  - 开发过程中，我们推荐使用named； 
  - 打包过程中，我们推荐使用deterministic；

### 动态导入的文件命名

- 动态导入的文件命名： 

  - 因为动态导入通常是一定会打包成独立的文件的，所以并不会再cacheGroups中进行配置； 
  - 那么它的命名我们通常会在output中，通过 chunkFilename 属性来命名；

  ```js
    output: {
      path: resolveApp('./build'),
      filename: '[name].bundle.js',
      clean: true,
      chunkFilename: '[id].[name].chunk.js'
    },
  ```

  - 但是，你会发现默认情况下我们获取到的 [name] 是和id的名称保持一致的 p如果我们希望修改name的值，可以通过magic comments（魔法注释）的方式；

  ```js
  import(/* webpackChunkName: "foo" */'./foo').then((res) => {
    console.log(res);
  });
  import(/* webpackChunkName: "foo_02" */'./foo_02').then((res) => {
    console.log(res);
  });
  ```


## 懒加载的运用

动态import使用最多的一个场景是懒加载（比如路由懒加载）：

> element.js

```js
const element = document.createElement('div');

element.innerHTML = 'Hello Element';

export default element;
```

> index.js 按钮点击加载组件

```js
const button = document.createElement('button');
button.innerHTML = '加载元素';
button.addEventListener('click', () => {
  import(/* webpackChunkName: 'element' */'./element').then(({default: element}) => {
    console.log(element);
    document.body.appendChild(element);
  });
});

document.body.appendChild(button);
```

