
module.exports = [
	{
		url: '/',
		middleware: (ctx, next) => next(),
		controller: 'home.test'
	}, {
		url: '/webapi',
		controller: 'api.webapi.test'
	}, {
		url: '/napi',
		controller: 'api.napi.test'
	},
]