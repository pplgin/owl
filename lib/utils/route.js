const Router =  require('koa-router')
const compose = require('koa-compose')
const is = require('is-type-of')
const { type } = require('../utils/helper')

const handleRouter = (routers = [], app) => {
  const router = new Router()

  for (let routeConf of routers) {
    let { url, controller, middleware = null, method = 'get' } = routeConf

    if (!url) {
      throw new TypeError(`url be required, ${JSON.stringify(routeConf)}`)
    }

    if (!controller) {
      throw new TypeError('controller be required')
    }

    // controller 文件夹下 eg: api.napi
    if (is.string(controller)) {
      const actions = controller.split('.')
      let obj = actions.reduce((module, key) => module[key], app.controller)
      if(!obj) {
        throw new Error(`controller '${controller}' not exists`)
      }
      controller = obj
    }

    if (!controller) throw new Error('controller not exists')
    
    if (!is.function(controller) && !is.asyncFunction(controller)) {
      throw new TypeError('controller must be function')
    }

    switch (type(middleware)) {
      case 'function':
        router[method](url, middleware, controller)
        break
      case 'array':
        router[method](url, compose(middleware), controller)
        break
      default:
        router[method](url, controller)
        break
    }
  }
  return router
}

module.exports = handleRouter