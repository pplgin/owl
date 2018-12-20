const nanoid = require('nanoid')
const axios = require('axios')
const ip = require('ip')
const os = require('os')

const { ContextLogger } = require('../core/logger')
const serverIp = ip.address()
const serverHostName = os.hostname()

module.exports = {
  /**
   * 扩展ctx.log
   */
  get log() {
    ContextLogger.ctx = this
    return ContextLogger
  },
  /**
   * 重写ip
   */
  get clientIP() {
    let clientIP =
      this.req.headers['x-forwarded-for'] ||
      (this.req.connection && this.req.connection.remoteAddress) ||
      (this.req.connection &&
        this.req.connection.socket &&
        this.req.connection.socket.remoteAddress) ||
      (this.req.socket && this.req.socket.remoteAddress)

    if (clientIP) {
      clientIP = clientIP.replace(/\:\:ffff\:/, '')
      if (clientIP.indexOf(',') !== -1) {
        clientIP = clientIP.substr(0, clientIP.indexOf(','))
      }
    }
    return clientIP
  },
  get serverIp() {
    return serverIp
  },
  get serverHostName() {
    return serverHostName
  },
  get requestId() {
    return nanoid()
  },
  /**
   * ctx.json
   * @param {object} data 
   */
  json(data) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(data)
    return
  },
  /**
	 * feth
	 */
	fetch({ url, method = 'get', data, headers = {} }) {
		return axios({
			method,
			url,
			data,
			headers: {
				...this.headers,
				...headers
			}
		})
			.then(res => {
				if (res.status === 200) {
					let result = res.data
					if (result.status === 0) {
						return result.data
					}
					throw result
				}
				throw res.data
			})
			.catch(err => {
				throw err
			})
	}
}