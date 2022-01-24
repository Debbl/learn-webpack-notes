import _ from 'lodash';
import dayjs from 'dayjs';

import './bar_01';
import './bar_02';

console.log('Hello Webpack!');
console.log(_.join(['Hello', 'Main']));
console.log(dayjs(), 'Main');

import(/* webpackChunkName: "foo" */'./foo').then((res) => {
  console.log(res);
});
import(/* webpackChunkName: "foo_02" */'./foo_02').then((res) => {
  console.log(res);
});
