// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	lintOnSave: true,
	pluginOptions: {
		quasar: {
			importStrategy: 'kebab',
			rtlSupport: false,
		},
	},
	transpileDependencies: ['quasar'],
	configureWebpack: {
		resolve: {
			alias: {
				src: path.resolve(__dirname, 'src/'),
				'@models': path.resolve(__dirname, 'src/models/'),
				'@components': path.resolve(__dirname, 'src/components/'),
				'@services': path.resolve(__dirname, 'src/services/'),
				'@assets': path.resolve(__dirname, 'src/assets/'),
				'@views': path.resolve(__dirname, 'src/views/'),
				'@mixins': path.resolve(__dirname, 'src/mixins/'),
				'@store': path.resolve(__dirname, 'src/store/'),
			},
			extensions: ['.ts', '.js', '.vue', '.json', '.d.ts'],
		},
	},
};
