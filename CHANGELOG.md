## [0.0.9]-2019-3-24

### Feature
- 修改自动加载文件夹

## [0.0.7]-2019-3-15

### Bugfix
- 修复fetch `status=200` 结果不返回问题

## [0.0.6]-2019-2-14

### Features
- 启动配置，添加 `apiTraceKey` 字段追踪 fetch请求记录耗时情况
- web访问日志添加 fetch api 请求时间记录 `time_third_api`


## [0.0.5]-2019-2-12

### Features
- node请求添加超时配置 `fetchTimeout`
- web访问日志添加 node处理耗时时间字段 `time_taken`, `ctx.log.access(responseTime)`

## [0.0.4]-2018-12-28

### Bugfix
- 修复日志header 过滤key前后空格导致过滤失败
- 修复日志s_headers字段为 ctx.response.headers


## [0.0.2]-2018-12-22

### Added

添加实例代码

## [0.0.2]-2018-12-21

### Added
 - TypeScript 支持
 - 日志配置添加过滤headr字段配置`filterHeaders`

```
logCofig: {
	logFilePath: 'string',
	pm2: true,
	filterHeaders: []
	...// log4js config [https://log4js-node.github.io/log4js-node/](https://log4js-node.github.io/log4js-node/)
}
```


## [0.0.1]-2018-12-18

### Added
 - 添加log4js 日志归档格式配置

## [0.0.1]-2018-12-17

### Added
 - 添加log4js自定义配置

```
logCofig: {
	logFilePath: 'string',
	pm2: true,
	...// log4js config [https://log4js-node.github.io/log4js-node/](https://log4js-node.github.io/log4js-node/)
}
```

