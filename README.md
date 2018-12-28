## Owl

>框架底层基于 Koa2 实现，兼容 Koa的所有功能, 支持ES6

## Owl核心内容

- Loader (主要将对应目录下的文件挂载到对应的对象上去 目前支持 ：`model、controller、service、router对象`)
- Extend (扩展原有context对象，暂不支持自定义)
- Logger 日志集成
- Router 集成

## 使用方式

环境依赖： node >=9

```
npm install @pplgin/owl
```


## Example

代码目录结构

```
├── app.js
├── config.js
├── controller
├── middleware
├── model
├── router
├── service
└── views
```


引入owl(具体事例可以参考app文件夹)

```javascript
const path = require('path')
const { OwlApplication } = require('@pplgin/owl')
const { pkg, logConfig } = require('./config')
const app = new OwlApplication({
	pkg,
	rootPath:__dirname,
    viewRoot: path.join(__dirname, 'views'),
    logConfig
})
// 启动
app.bootstrap()
```

middleware
```javascript
module.exports = [
    logger, //[logger, { options }]
]
```


controller层

```javascript
const { Controller } = require('@pplgin/owl')
module.exports = class Home extends Controller {
	test() {
		// this.ctx.coreLogger.info('111')
		// let s = this.ctx.service.name.m.list()
		// this.test1()
		this.ctx.body = 'this is home!'
	}

	test1() {
		console.log('xxx')
	}
}
```

service层

```javascript
const { Service } = require('@pplgin/owl')

module.exports = class NewsService extends Service {
  list(page = 1) {
    return {
      id: 1,
      contest: 'test'
    }
  }
}
```
