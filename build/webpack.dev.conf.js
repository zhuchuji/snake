const webpackMerge = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.common.conf.js')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

const devConfig = webpackMerge(commonConfig, {
	devtool: '#cheap-module-eval-source-map',
	devServer: {
		contentBase: false,
		port: 8080,
		hot: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			inject: true
		}),
		new extractTextPlugin({
			filename: 'style/[name].[contenthash:8].css'
		})
	]
})

module.exports = devConfig