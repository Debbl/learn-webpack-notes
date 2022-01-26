import _ from 'lodash';
import dayjs from 'dayjs';

import './bar_01';
import './bar_02';

console.log('Hello Index!');
console.log(_.join(['Hello', 'Index...']));
console.log(dayjs(), 'Index');

// import('lodash').then((res) => {});

// 按钮点击 懒加载组件
const button = document.createElement('button');
button.innerHTML = '加载元素';
button.addEventListener('click', () => {
  import(
    /* webpackChunkName: 'element' */
    // /* webpackPrefetch: true */
    /* webpackPreload: true */
    './element').then(({default: element}) => {
    console.log(element);
    document.body.appendChild(element);
  });
});

document.body.appendChild(button);
