const path = require('path')
const { OwlApplication } = require('../lib/owl')

const config = require('./config')


const app = new OwlApplication({
	...config,
	rootPath: __dirname,
  viewRoot: path.join(__dirname, 'views'),
})

app.bootstrap()

