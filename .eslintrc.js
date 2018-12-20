module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'global-require': 'off',
		'handle-callback-err': 'off',
		'no-new-require': 'off',
		'comma-spacing': ['error', { before: false, after: true }],
		// indent: ['error', 2, { SwitchCase: 1, VariableDeclarator: 1 }],
		'linebreak-style': ['error', 'unix'],
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		semi: ['error', 'never']
	}
}
