import './math.js';
import React from 'react';
import Vue from 'vue';
import ReactDom from 'react-dom';
import ReactApp from './App.jsx';
import VueApp from './App.vue';

console.log('Hello Webpack!');
console.log('Hello Webpack middleware!');

if (module.hot) {
  module.hot.accept('./math.js', () => {
    console.log('math模块发生了更新...');
  });
}

// React 代码
ReactDom.render(<ReactApp />, document.getElementById('app'));

// Vue 代码
new Vue({
  render: h => h(VueApp)
}).$mount('#root')
