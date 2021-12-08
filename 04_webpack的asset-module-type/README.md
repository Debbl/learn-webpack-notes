## 04 asset module type

- 我们当前使用的webpack版本是webpack5： 
  - 在webpack5之前，加载这些资源我们需要使用一些loader，比如raw-loader 、url-loader、file-loader； 
  - 在webpack5之后，我们可以直接使用资源模块类型（asset module type），来替代上面的这些loader；
- 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader： 
  - **asset/resource** 发送一个单独的文件并导出 URL。之前通过使用 **file-loader** 实现； 
  - **asset/inline** 导出一个资源的 data URI。之前通过使用 **url-loader** 实现； 
  - **asset/source** 导出资源的源代码。之前通过使用 **raw-loader** 实现； 
  - **asset** 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 **url-loader**，并且配置资源 体积限制实现；

### asset/resource

- 比如加载图片，我们可以使用下面的方式

```js
{
    test: /.(png|jpe?g|gif|svg)$/i,
    type: 'asset/resource',
}
```

- 但是，如何可以自定义文件的输出路径和文件名呢？ 

  > [ext] 前面可以不用加.

  - 方式一：修改output，添加**assetModuleFilename**属性； 

  ```js
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, './build'),
      assetModuleFilename: "img/[name].[hash:6][ext]"
    },
  ```

  - 方式二：在Rule中，添加一个**generator**属性，并且设置**filename**；

  ```js
  {
  	test: /.(png|jpe?g|gif|svg)$/,
  	type: 'asset/resource',
  	generator: {
  		filename: "img/[name].[hash:6][ext]"
  	}
  }
  ```

### url-loader的limit效果

- 我们需要两个步骤来实现： 
  - 步骤一：将type修改为**asset**； 
  - 步骤二：添加一个**parser**属性，并且制定dataUrl的条件，添加maxSize属性；

```js
{
	test: /.(png|jpe?g|gif|svg)$/,
	type: 'asset',
	generator: {
		filename: "img/[name].[hash:6][ext]"
	},
	parser: {
		dataUrlCondition: {
			maxSize: 100 * 1024
		}
	}
}
```

### 字体文件 asset/resource

- 这个时候打包会报错，因为无法正确的处理eot、ttf、woff等文件： 
  - 我们可以选择使用file-loader来处理，也可以选择直接使用webpack5的资源模块类型来处理；

```js
{
        test: /\.(woff2?|eot|ttf)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name].[hash:6][ext]"
        }
}
```

