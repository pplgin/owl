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
    // trace request 
    if (!this.state.requestId) {
      this.state.requestId = nanoid()
    }
    return this.state.requestId
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
	async fetch({ url, method = 'get', data, headers = {}, timeout = 0 }) {
    const { fetchTimeout, apiTraceKey = '' } = this.app.options
    const fSTime = new Date()
    if (apiTraceKey) {
      this.state[apiTraceKey] = this.state[apiTraceKey] || {}
    }
    try {
      const res = await axios({
        method,
        url,
        data,
        headers: {
          ...this.headers,
          ...headers
        },
        timeout: timeout || fetchTimeout || 0
      })
      if (res.status === 200) {
        let result = res.data
        if (result.status === 0) {
          return result.data
        }
        throw result
      }
      throw res.data
    } catch (error) {
      throw error
    } finally {
      if (apiTraceKey) {
        // fetch cost
        this.state[apiTraceKey][url] = new Date() - fSTime
      }
    }
	}
}