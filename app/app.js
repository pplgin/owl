const path = require('path')
const { OwlApplication } = require('../lib/owl')

const { pkg, logConfig, PORT } = require('./config')


const app = new OwlApplication({
	pkg,
	logConfig,
	PORT,
	rootPath: __dirname,
  viewRoot: path.join(__dirname, 'views'),
})

app.bootstrap()

