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
