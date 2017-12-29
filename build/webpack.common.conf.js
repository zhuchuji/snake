const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = {
	entry: {
		app: './src/main.js',
	},
	output: {
		filename: 'js/[name].[hash:8].js',
		path: path.resolve('dist')
	},
	resolve: {
		alias: {
			'@component': path.resolve('src/component')
		}
	},
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', include: path.resolve('src') },
			{ 
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				}),
				include: path.resolve('src')
			}
		]
	}
}

module.exports = webpackConfig