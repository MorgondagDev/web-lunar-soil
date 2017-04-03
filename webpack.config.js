const webpack = require('webpack')
const nib = require('nib')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const PORT = process.env.port || 8080
console.log('http://0.0.0.0:' + PORT)

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:' + PORT,
        'webpack/hot/only-dev-server',
        './src/index.jsx',
        './src/style.styl'
    ],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
        }, ],
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "react-hot!babel"
        }, {
            test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader'
        }, {
            test: /\.(styl)$/,
            loaders: ['style-loader', 'css-loader', 'stylus-loader']
        }, {
            test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    stylus: {
        use: [require('nib')()],
        import: ['~nib/lib/nib/index.styl']
    },
    output: {
        path: __dirname + '/dev',
        publicPath: '/',
        filename: 'app.js'
    },
    devServer: {
        contentBase: './dev',
        hot: true,
        historyApiFallback: true
    },
    eslint: {
        configFile: './.eslintrc'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ]
}
