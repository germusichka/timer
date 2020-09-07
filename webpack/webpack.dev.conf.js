const {merge} = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: baseWebpackConfig.externals.PATHS.dist,
        port: 8081,
        overlay: {
            warnings: false,
            errors: false,
        },
    },

    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].map'
        }),
    ],
})

module.exports = new Promise(resolve => resolve(devWebpackConfig))



