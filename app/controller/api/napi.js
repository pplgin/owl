const { Controller } = require('../../../lib/owl')

module.exports = class Api extends Controller {
  async test() {
    try {
      let s = await this.ctx.service.name.m.list()
      await this.ctx.render('index', {
        content: '这个是napi页面！'
      })
    } catch (error) {
      this.ctx.log.warn(error.message || 'none')
      this.ctx.status = 200
      this.ctx.body = error.message
    }
  }
}