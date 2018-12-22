const { Controller } = require('../../../lib/owl')

module.exports = class Api extends Controller {
  async test() {
    // this.ctx.coreLogger.info('111')
    let s = this.ctx.service.name.m.list()
    await this.ctx.render('index', {
      content: '这个是napi页面！'
    })
  }
}