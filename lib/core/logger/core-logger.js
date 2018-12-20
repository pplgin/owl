const debug = require('debug')('owl-logger')
const path = require('path')
const log4js = require('log4js')
const CORELOGGER = Symbol('#owl/logger')

const logLayout = {
	type: 'pattern',
	pattern: '%m'
}

const LogMethods = ['trace', 'debug', 'info', 'warn', 'error']

/**
 * 生产日志配置
 * @param  {[type]} logFilePath  [目录地址]
 * @param  {[type]} layout   [日志格式配置]
 * @param  {Array}  logFiles [日志文件名称]
 * @return {[type]}          [description]
 */
const getLogConfigs = (logFilePath, layout = logLayout, logFiles = [], pattern = '-yyyy-MM-dd' ) => {
	const { dir, name, ext } = path.parse(logFilePath)
	const filePath = ext ? dir : `${dir}/${name}`
	const fileName = ext ? name : 'logstash'
	return logFiles.reduce(
		(logConfig, logType) => {
			logConfig.appenders[logType] = {
				layout,
				type: 'dateFile',
				filename: `${filePath}/${fileName}_${logType}.log`,
				pattern,
			}
			logConfig.categories[logType] = {
				appenders: [logType],
				level: 'ALL'
			}
			return logConfig
		},
		{
			appenders: {},
			categories: {}
		}
	)
}

module.exports = class CoreLogger {
	constructor(config) {
		this.configure(config)
    this[CORELOGGER] = this.getLogger()
		LogMethods.forEach(level => {
			Object.defineProperty(this, level, {
				get() {
					return this[CORELOGGER][level].bind(this[CORELOGGER])
				}
      })
		})
	}

	/**
   * 默认初始化日志文件、
   * @param  {[type]} options.logFilePath [日志文件路径]
   * @param  {[type]} options.layout      [log4js格式]
   * 
   */
	configure({ logFilePath = __dirname, layout = logLayout, ...conf }) {
		const { appenders, categories } = getLogConfigs(logFilePath, layout, [
			'app',
			'web'
		], conf.pattern)
		const config = {
			appenders: {
				console: { type: 'stdout' },
				...appenders
			},
			categories: {
				default: { appenders: ['console'], level: 'ALL' },
				...categories
			},
			...conf
		}
		debug(`owl-logger:config, ${JSON.stringify(config)}`)
		log4js.configure(config)
	}

	/**
   * 设置日志类型
   */
	getLogger(_type = 'console') {
		//  = log4js.getLogger(_type)
		if (_type !== 'console' && ['web', 'app'].indexOf(_type) === -1) {
			debug(`${_type} is not valid, please use 'app' or 'web' instead of '${_type}'!`)
			_type = 'console'
		}
		return log4js.getLogger(_type)
	}
}
