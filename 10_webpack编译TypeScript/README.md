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

