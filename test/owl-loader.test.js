const path = require('path')
const OwlLoader = require('../lib/core/loader')

describe('owl-loader', () => {
  const app = {}
  const loader = new OwlLoader(app, {
    rootPath: path.join(__dirname, 'testcase')
  })
  it('service loader should be success', () => {
      loader.register(app, 'service')
      expect(app.service.a.test()).toBe('a')
      expect(app.service.package1.b.test()).toBe('b')
      expect(app.service.package2.c.test()).toBe('c')
  })

  it('controller loader should be success', () => {
    loader.register(app, 'controller')
    expect(app.controller.a.test()).toBe('a')
    expect(app.controller.package1.b.test()).toBe('b')
    expect(app.controller.package2.c.test()).toBe('c')
  })
})