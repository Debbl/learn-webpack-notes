import './math.js';

console.log('Hello Webpack!');
console.log('Hello Webpack middleware!');

if (module.hot) {
  module.hot.accept('./math.js', () => {
    console.log("math模块发生了更新...")
  })
}
