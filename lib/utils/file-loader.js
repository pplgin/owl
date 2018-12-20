const debug = require('debug')('file-loader')
const fs = require('fs')
const path = require('path')
const { isDirectory, isFile, fileRequire } = require('./helper')
/**
 * 文件loader
 * @type {[type]}
 */
module.exports = class OWlLoader {
  constructor({ rootPath }) {
    if (!rootPath) {
      throw new TypeError('rootPath is required')
    }
    this.rootPath = rootPath
  }
  /**
	 * 加载路径下的js文件
	 */
  loadFiles(dir, splitter = '.', prefix = '') {
    if (!dir) {
      throw new TypeError('file dir required!')
    }
    debug(`Load file dir: ${dir}`)
    // 遍历文件下所有文件包括文件夹
    const fileList = fs
      .readdirSync(dir)
      .filter(v => isDirectory(path.join(dir, v)) || /.js$/.test(v))
    return fileList.reduce((caches, file) => {
      const filepath = path.join(dir, file)
      if (isDirectory(filepath)) {
        const exportmods = this.loadFiles(filepath, splitter, file)
        return Object.assign(caches, exportmods)
      }
      const { name } = path.parse(filepath)
      let key = prefix ? `${prefix}${splitter}${name}` : name
      caches[key] = fileRequire(filepath)
      return caches
    }, {})
  }

  /**
   * 
   * @param  {string} dir [文件路径]
   * @return {[type]}     [description]
   */
  loadFile(filepath) {
    if (!filepath || !isFile(filepath)) {
      return null
    }
    return fileRequire(filepath)
  }
}
