const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fontDir = 'font/';

module.exports = {
    entry: ['whatwg-fetch', './src/index.js'],
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9'
                        ]
                    }),
                ]
            }
        }),
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true
                }
            },
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [["es2015", { "modules": false }], 'react'],
                    plugins: [
                        'transform-class-properties',
                        'transform-object-rest-spread',
                        ["transform-imports", {}],
                        'transform-runtime',
                        ['transform-react-remove-prop-types', {
                                mode: 'wrap',
                                ignoreFilenames: ['node_modules'],
                                additionalLibraries: ['react-immutable-proptypes']
                            }
                        ]
                    ]
                }
            },
            {
                test: /(\.css|\.scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                plugins: function () {
                                    return [
                                        require("autoprefixer")
                                    ];
                                }
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            minetype: 'application/font-woff',
                            name: fontDir+"[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: fontDir+"[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: 'svgo-loader',
                    options: {
                        name: fontDir+"[name].[ext]",
                        plugins: [
                            {
                                removeDesc: { removeAny: true }
                            },
                            { removeTitle: true },
                            { sortAttrs: true }
                        ]
                    }
                }]
            },
        ]
    },

};