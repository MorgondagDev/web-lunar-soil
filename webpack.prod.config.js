'use strict'
const webpack = require('webpack');
const nib = require('nib');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const reactRenderPlugin = require('react-render-webpack-plugin');

module.exports = {
    entry: [
        './src/index.jsx',
        './src/style.styl'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'app.min.js'
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "react-hot!babel"
        }, {
            test: /\.(png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader'
        }, {
            test: /\.styl?$/,
            loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
        },{
            test: /.*\.(ico|eot|ttf|woff|woff2)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        },
        {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?{optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        ]
    }]
    },
    stylus: {
        use: [nib()]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('style.min.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new reactRenderPlugin({
            'file': 'src/app.jsx',
            'parentClass': 'app-react'
        })
    ]
};
