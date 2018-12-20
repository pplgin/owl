const debug = require('debug')('owl-loader')
const path = require('path')
const is = require('is-type-of')
const FileLoader = require('../utils/file-loader')
const { wrapController, type, fileRequire, isDirectory, moduleProxy } = require('../utils/helper')

const handleView = require('../utils/view')
const handleRouter = require('../utils/route')

module.exports = class Loader extends FileLoader {
  constructor(app, options = {}) {
    super(options)
    this.options = options
    this.app = app
  }

  load() {
    const { app } = this
    // 加载service
    app.logger.info('Register Service')
    this.register(app.context, 'service')
    // 注入model
    app.logger.info('Register Models')
    this.register(app.context, 'model')
    // 加载控制器
    app.logger.info('Register Controller')
    this.register(app, 'controller', wrapController)
    // 加载middleware
    app.logger.info('Loading middleware')
    this.loadMiddleware()
    // 加载路由
    app.logger.info('Loading router')
    this.loadRouter()
    this.registerRender()
  }
  /**
	 * 劫持target，对象转换链式写法
	 * @param {*} target app | context
	 * @param {string} property 类别目录 service model controller
	 * eg, 使用 ctx.service.foo.fun, ctx.modle.foo.test
	 */
  register(target, property, decorate = null) {
    const dir = path.join(this.rootPath, property)
    if (!isDirectory(dir)) {
      throw new TypeError(`${dir} is required`)
    }
    // 缓存文件路径
    debug(`category: ${property}, directory: ${dir}`)
    const modules = this.loadFiles(dir)
    Object.defineProperty(target, property, {
      get() {
        return moduleProxy.call(this, modules, decorate)
      }
    })
  }

  /**
   * 扩展Render
   */
  registerRender() {
    const { options, context } = this.app
    const render = handleView({
      viewRoot: options.viewRoot
    })
    Object.defineProperty(context, 'render', {
      async value(viewName, data) {
        try {
          this.body = await render(viewName, data)
        } catch (err) {
          throw err
        }
      }
    })
  }
  /**
   * 加载路由配置
   * router文件夹下的index.js
   * eg: module.exports = [{
   *  url: '/',  // 类型string
   *  method: 'get|post|put|delete', // koa-router 支持的所有方法 默认不填 get
   *  middleware: null | funciton | array[funciton], // 路由中间件
   *  controller: function | string,
   * }]
   * 
   * 其中 controller 为字符串时 加载的是对应controller下的文件路径 eg:
   * controller tree:  /controller/home.js or /controller/home/api/napi.js
   * 配置为: 'home.[method]', 'home.api.napi.[method]'
   */
  loadRouter() {
    let routers = this.loadFile(path.join(this.rootPath, 'router/index.js'))
    if (!routers) routers = [] //不存在router文件夹
    if (!is.array(routers)) throw new TypeError('routers must be array!')
    Object.defineProperty(this.app, 'router', {
      value: handleRouter(routers, this.app)
    })
  }

  /**
   * 加载middleware中间件
   * middleware文件夹下的index.js
   * eg: module.exports = [{
   *  handle: 'koa-favicon' //中间件名称 类型 string | function
   *  options: {}   //中间件初始化参数 string | object
   * }]
   */
  loadMiddleware() {
    let middlewares = this.loadFile(path.join(this.rootPath, 'middleware/index.js'))

    if (!middlewares && !is.array(middlewares)) throw new TypeError('middlewares must be array!')

    const middlewareType = {
      'string': function(filename, ...args) {
        return fileRequire(filename)(...args)
      },
      'function': function(func, ...args) {
        return func(...args)
      },
      'array': function(arr) {
        const [ func, options = null ] = arr
        return options ? this[type(func)](func, options) : this[type(func)](func)
      }
    }

    for (const middleware of middlewares) {
      let nw = middlewareType[type(middleware)](middleware)
      if (nw && is.function(nw)) {
        this.app.use(nw)
      }
    }
  }
}