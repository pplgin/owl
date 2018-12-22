const { Controller } = require('../../../lib/owl')

module.exports = class Api extends Controller {
	async test() {
		// this.ctx.coreLogger.info('111')
		// this.ctx.body = 'testwebpao'
		// this.ctx.log.debug('test')
		await this.render('index', {
			content: '这个是个webapi页面'
		})
		// this.ctx.json({
		// 	name: 'test json'
		// })
	}
}