const { Service } = require('../../../lib/owl')

module.exports = class NewsService extends Service {
  list(page = 1) {
    return {
      id: 1,
      contest: 'test'
    }
  }
}