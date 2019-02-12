const { Service } = require('../../../lib/owl')

module.exports = class NewsService extends Service {
  async list(page = 1) {
    try {
      const res = await this.ctx.fetch({
        url: 'http://0.0.0.0:3200/test',
        // timeout: 5000
      })
      console.log('res', res)
      return {
        id: 1,
        contest: 'test'
      }
    } catch (error) {
      throw error
    }
  }
}
