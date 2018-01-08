var path = require('path')
var webpack = require('webpack')
"use strict";


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
                     // other vue-loader options go here
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
        extensions: ['*', '.js', '.vue', '.json']
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