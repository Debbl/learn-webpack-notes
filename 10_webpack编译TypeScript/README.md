# 08_babel对TypeSctipt支持

- 在项目开发中，我们会使用TypeScript来开发，那么TypeScript代码是需要转换成JavaScript代码。 

- 可以通过TypeScript的compiler来转换成JavaScript： 

  ```shell
  npm install typescript -D
  ```

- 另外TypeScript的编译配置信息我们通常会编写一个tsconfig.json文件：

  ```shell
  tsc --init
  ```
  
- 编译 TS 代码

- ```
  npx tsc
  ```

## 使用ts-loader

- 如果我们希望在webpack中使用TypeScript，那么我们可以使用ts-loader来处理ts文件：

```
npm install ts-loader -D
```

## 配置ts-loader

```js
{
	test: /\.ts$/,
	use: 'ts-loader'
}
```

## 使用 babel-loader

> 使用 ts-loader 不能添加 polyfill ，使用 babel-loader 可以解决这一问题

- 除了可以使用TypeScript Compiler来编译TypeScript之外，我们也可以使用Babel：
  - Babel是有对TypeScript进行支持； 
  - 我们可以使用插件： @babel/tranform-typescript； 
  - **但是更推荐直接使用preset**：@babel/preset-typescript；
- 安装 @babel/preset-typesctipt

> 使用预设

```shell
npm install @babel/preset-typescript -D
```

```js
{
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader'
}
```



# ts-loader和babel-loader选择

- 那么我们在开发中应该选择ts-loader还是babel-loader呢？ 
- 使用ts-loader（TypeScript Compiler） 
  - 来直接编译TypeScript，那么只能将ts转换成js； 
  - 如果我们**还希望在这个过程中添加对应的polyfill，那么ts-loader是无能为力的**； 
  - 我们需要借助于babel来完成polyfill的填充功能；
- 使用babel-loader（Babel） 
  - 来直接编译TypeScript，也可以将ts转换成js，并且可以**实现polyfill的功能**； 
  - **但是babel-loader在编译的过程中，不会对类型错误进行检测**；
- 那么在开发中，我们如何可以同时保证两个情况都没有问题呢？

# 编译TypeScript最佳实践

- 事实上TypeScript官方文档有对其进行说明
- https://www.typescriptlang.org/docs/handbook/babel-with-typescript.html

- 我们使用Babel来完成代码的转换，使用tsc来进行类型的检查。
- 但是，如何可以使用tsc来进行类型的检查呢？ 
  - 在这里，我在scripts中添加了两个脚本，用于类型检查； 
  - 我们执行 npm run type-check可以对ts代码的类型进行检测； 
  - 我们执行 npm run type-check-watch可以实时的检测类型错误；

> noEmit 不输出文件，只进行类型检查

```json
  "scripts": {
    "build": "npm run type-check && webpack",
    "type-check": "tsc --noEmit",
    "type-check-watch": "tsc --noEmit --watch"
  },
```

