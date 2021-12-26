# 08_babel的React的JSX支持

- 在我们编写react代码时，react使用的语法是jsx，jsx是可以直接使用babel来转换的。 
- 对react jsx代码进行处理需要如下的插件： 
  - @babel/plugin-syntax-jsx 
  - @babel/plugin-transform-react-jsx 
  - @babel/plugin-transform-react-display-name
- 但是开发中，我们并不需要一个个去安装这些插件，我们依然可以使用preset来配置：

```shell
npm install @babel/preset-react -D
```

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3, // 指定 core-js 为3的版本
      },
    ],
    ['@babel/preset-react'],
  ],
};

```

