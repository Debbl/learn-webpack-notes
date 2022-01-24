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

