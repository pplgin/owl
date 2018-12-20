const Caches = new Map()
/**
 * 基础扩展
 */
class BaseContextClass {
	constructor(ctx) {
		this.ctx = ctx
		this.app = ctx.app
		this.service = ctx.service
	}
}

/**
 * 基础Controller
 */
class Controller extends BaseContextClass {
	get render() {
		return this.ctx.render.bind(this.ctx)
	}
}
/**
 * 基础Service
 */
class Service extends BaseContextClass {}

/**
 * 基础Model
 */
class Model extends BaseContextClass {
	static caches(key, cb) {
		let cache = Caches.get(`model_${key}`)
		if (!cache) {
			cache = cb() || null
			Caches.set(`model_${key}`, cache)	
		}
		return cache
	}
}

module.exports = {
	BaseContextClass,
	Controller,
	Service,
	Model
}
