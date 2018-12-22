const { Service } = require('../../../lib/owl')

module.exports = class NewsService extends Service {
  async list(page = 1) {
    // console.log('xx', JSON.stringify(this.ctx))
    // const res = await this.ctx.fetch({
    //   url: 'http://www.baidu.com'
    // })
    return {
      id: 1,
      contest: 'test'
    }
  }
}
