module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'entry',
        // corejs: 3, // 指定 core-js 为3的版本
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};
