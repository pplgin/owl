## [0.0.3]-2018-12-28

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

