const fs = require('fs')
const path = require('path')

/**
 * check path is exist
 */
const isExist = dir => {
	dir = path.normalize(dir)
	try {
		fs.accessSync(dir, fs.R_OK)
		return true
	} catch (e) {
		return false
	}
}

/**
 * check filepath is file
 */
const isFile = filePath => {
	if (!isExist(filePath)) return false
	try {
		const stat = fs.statSync(filePath)
		return stat.isFile()
	} catch (e) {
		return false
	}
}

/**
 * check path is directory
 */
const isDirectory = filePath => {
	if (!isExist(filePath)) return false
	try {
		const stat = fs.statSync(filePath)
		return stat.isDirectory()
	} catch (e) {
		return false
	}
}

const type = obj =>
	Array.isArray(obj) ? 'array' : obj === null ? 'null' : typeof obj

/**
 *  warp controller
 * @param {Controller对象} Controller
 */
const wrapController = Controller => {
  const methods = Reflect.ownKeys(Controller.prototype)
  return methods.reduce((ret, method) => {
		if (method !== 'constructor') {
			ret[method] = (ctx, ...args) => {
				return new Controller(ctx)[method](...args)
			}
		}
		return ret
	}, {})
}

/**
 * [moduleProxy 模块转换成链式写法]
 * @param  {Object} modules [description]
 * @param  {[type]} wrapfnc [description]
 * @return {[type]}         [description]
 */
function moduleProxy(modules = {}, wrapFn = null){
	let keys = []
	const ob = new Proxy({}, {
		get: (target, key) => {
			keys.push(key)
			const module = modules[keys.join('.')]
			if (module) {
				// 改变this 指向问题
				if (wrapFn) return wrapFn(module)
				// export class
				return new module(this)
			}
			return ob
		}
	})
	return ob
}
/**
 * 加载文件
 * @param {string} filepath 文件路径
 */
function fileRequire(filepath) {
	try {
		return require(filepath) 
	} catch (err) {
		err.message = `owl load module "${filepath}" failed`
		throw err
	}
}

/**
 * 对象扩展
 * @param {object} target 
 * @param {object} source 
 */
function extend(target = {}, source = {}) {
	const properties = Object.getOwnPropertyNames(source)
	.concat(Object.getOwnPropertySymbols(source))
	for (const property of properties) {
		let descriptor = Object.getOwnPropertyDescriptor(source, property)
		Object.defineProperty(target, property, descriptor)
	}
}
module.exports = {
	isDirectory,
	isExist,
	isFile,
	type,
	fileRequire,
	moduleProxy,
	wrapController,
	extend
}
