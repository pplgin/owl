const { Controller } = require('../../lib/owl')

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