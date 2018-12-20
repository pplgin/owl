const nunjucks = require('nunjucks')

/**
 * 处理 render函数
 */
const handleRender = ({ viewRoot }) => {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewRoot))
  return (viewName, data) => {
    return new Promise((resolve, reject) => {
      env.render(viewName + '.html', data, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}

module.exports = handleRender