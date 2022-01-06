# Webpack 加载 vue

- ## 安装Vue

```shell
npm install vue
```

- ## 写vue文件

> index.js

```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount("#app");

```

> App.vue

```vue
<template>
    <div id="app">
        <h2 class="title">{{message}}</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: "Hello Vue"
            }
        }
    }
</script>

<style scoped lang="less">
    .title {
        color: red
    }
</style>
```

- ## 使用 vue-loader-plugin

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// ...
plugins: [
		// ...   
    new VueLoaderPlugin(),
  ],
```

- ## 处理vue文件中的样式文件

```js
{
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
}
```

