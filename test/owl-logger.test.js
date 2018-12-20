const path = require('path')
const fs = require('fs')
const { CoreLogger } = require('../lib/core/logger')

describe('owl-logger', () => {
  const fname = new Date().getTime()
  const logFilePath = path.join(__dirname, `../logs/${fname}.log`)
  const logger = new CoreLogger({
    logFilePath
  })
  it('logger-app should be success', () => {
    const log = logger.getLogger('app')
    log.info('app-test')
    setTimeout(() => {
      let text = fs.readFileSync(`logs/${fname}_app.log`, 'utf-8')
      console.log('text', text)
      expect(text).toBe("app-test\n")
    }, 100)
  })

  it('logger-web should be success', () => {
    const log = logger.getLogger('web')
    log.info('web-test')
    setTimeout(() => {
      let text = fs.readFileSync(`logs/${fname}_web.log`, 'utf-8')
      console.log('text', text)
      expect(text).toBe("web-test\n")
    }, 100)
  })
})