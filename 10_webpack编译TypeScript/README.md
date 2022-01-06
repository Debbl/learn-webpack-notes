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

```
npm install @babel/preset-typescript -D
```

