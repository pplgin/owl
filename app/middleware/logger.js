// const webformat = require('./lib/web')
/**
 * owl-logger
 */
module.exports = () => (ctx, next) => {
	return next().then(() => {
		ctx.log.access() // 访问日志
		switch (ctx.status) {
			case 404:
				break;
			default:
				break;
		}
	}).catch(err => {
		ctx.log.error(err.toString())
		ctx.status = 500
		ctx.body = '出错了！'
	})
}