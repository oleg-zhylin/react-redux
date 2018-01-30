const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CommonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const publicDir = 'assets/';

module.exports = function(env) {
    return merge(CommonConfig, {
        output: {
            path: path.join(__dirname, 'server/build'),
            publicPath: '/' + publicDir,
            filename: 'assets/bundle-dev.min.js'
        },
        plugins: [
            new ExtractTextPlugin({
                filename: publicDir+'style-dev.min.css',
                disable: false,
                allChunks: true
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        devtool: 'eval-source-map',
        stats: {
            colors: true,
            warnings: true
        }
    })
};