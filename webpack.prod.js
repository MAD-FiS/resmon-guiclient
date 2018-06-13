const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const WebpackCleanPlugin = require('webpack-clean');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inlineSource: '.js$'
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new WebpackCleanPlugin('dist/main.js'),
        new CopyWebpackPlugin(['src/.htaccess'])
    ]
});
