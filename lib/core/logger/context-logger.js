const genWebLog = require('./utils/web')
const genAppLog = require('./utils/app')
const LogMethods = ['trace', 'info', 'warn', 'error']

const ContextLogger = {
  access(responseTime = 0) {
    const { options: { logConfig,  apiTraceKey = '', pkg }, logger } = this._ctx.app
    let fetchTimeToken = []
    if (apiTraceKey) {
      const fetchApis = this._ctx.state[apiTraceKey]
      for (let key in fetchApis) {
        fetchTimeToken.push(`${key}-${fetchApis[key]}ms`)
      }
    }
    const webmsg = genWebLog(this._ctx, {
      project: pkg.name,
      filterHeaders: logConfig.filterHeaders || [],
      responseTime,
      fetchTimeToken: fetchTimeToken.join('|')
    })
    logger.getLogger('web').info(webmsg)
  },
  set ctx(value) {
    this._ctx = value
    return this
  },
  get ctx() {
    return this._ctx
  }
}

LogMethods.forEach(level => {
  Object.defineProperty(ContextLogger, level, {
    value(...args) {
      const { options, logger } = this._ctx.app
      const appmsg = genAppLog.apply(null, [this._ctx, {
        project: options.pkg.name
      }, level, ...args])
      logger.getLogger('app')[level](appmsg)
    }
  })
})

module.exports = ContextLogger
