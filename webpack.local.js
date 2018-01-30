const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonConfig = require('./webpack.common');

const publicDir = 'assets/';

module.exports = function(env) {
    return merge(CommonConfig, {
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: '/' + publicDir,
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ExtractTextPlugin('style.css')
        ],
        stats: {
            colors: true,
            reasons: true
        },
        devtool: 'eval-source-map',
        devServer: {
            port: 8888,
            contentBase: 'server/build/',
            clientLogLevel: 'info',
            hot: true,
            inline: true,
            historyApiFallback: true,
            compress: true,
            stats: {
                children: false
            },
            proxy: {
                "/api": {
                    target: "http://localhost:8889"
                }
            }
        },
    })
};