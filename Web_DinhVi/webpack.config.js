"use strict";
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: "./Assets/main.js",

    output: {
        path: path.join(__dirname, "./dist"),
        filename: "build.js"
    },
    devServer: {
        contentBase: ".",
        host: "localhost",
        port: 9000
    },
    plugins: [
        // ...
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader"
            },
             {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json','.css']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    }
};