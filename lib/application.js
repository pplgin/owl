const http = require('http')
const Application = require('koa')
const { CoreLogger } = require('./core/logger')
const Loader = require('./core/loader')
const { extend } = require('./utils/helper')
const OWL_LOGGER = Symbol('#owl-logger')

/**
 * 扩展基本配置
 */
module.exports = class OwlApplication extends Application {
  constructor(options) {
    super()
    this.options = Object.assign({
      rootPath: __dirname,        // 项目根路径
      viewRoot: __dirname,        // view路径
      PORT: 5000,
    }, options)

    /**
     * 初始化加载对应的loader
     */
    new Loader(this, this.options).load()

    /**
     * 扩展context对象
     */
    extend(this.context, require('./extend/context'))
  }
  /**
   * 加载日志
   */
  get logger() {
    if (!this[OWL_LOGGER]) {
      const { logFilePath, ...args} = this.options.logConfig
      this[OWL_LOGGER] = new CoreLogger({
        logFilePath,
        ...args
      })
    }
    return this[OWL_LOGGER]
  }

  /**
   * 代码启动
   */
  bootstrap(cb) {
		const { PORT } = this.options
    // 注入路由
    this.use(this.router.middleware())
    const server = http.createServer(this.callback())
    if (cb && typeof cb === 'function') {
      return server.listen(PORT, cb.bind(this))
    }

    return server.listen(PORT, () => {
      this.logger.info(`🚀 OwlApp Server is running at: http://0.0.0.0:${PORT}`)
    })
  }
}