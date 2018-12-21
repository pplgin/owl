const genWebLog = require('./utils/web')
const genAppLog = require('./utils/app')
const LogMethods = ['trace', 'info', 'warn', 'error']

const ContextLogger = {
  access() {
    const { options, logger } = this._ctx.app
    const { filterHeaders = [] } = options.logConfig
    const webmsg = genWebLog(this._ctx, {
      project: options.pkg.name,
      filterHeaders
    }, options)
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
