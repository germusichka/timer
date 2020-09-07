const path = require('path')
const fs = require('fs')
const mini_css_extract_plugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
    js: 'js/',
    components: 'components/'
}

// PUG
const PAGES_DIR = `${PATHS.src}/pug/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(item => item.endsWith('.pug'))



module.exports = {

    externals: {
        PATHS: PATHS,
    },

    entry: {
        app: `${PATHS.src}/js/index.js`
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
//        publicPath: '/dist',
    },

    resolve: {
        alias: {
            '~': PATHS.src,
            Components: path.join(PATHS.src, PATHS.js, PATHS.components),
            Assets: path.join(PATHS.src, PATHS.assets),
        },
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /node_modules/,
                },
            },
        },
    },

    plugins: [
        new mini_css_extract_plugin({
            filename: `${PATHS.assets}css/[name].[hash].css`
        }),

        ...PAGES.map(page => new htmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug$/, '.html')}`,
        })),

        new copyWebpackPlugin (
            {
                patterns: [
                    {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`},
                    //{from: `${PATHS.src}/${PATHS.assets}static`, to: ''},
                ],
            }
        ),

        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [

            {
                test: /\.js$/,
                loader: ["babel-loader"],
                exclude: /node_modules/,
            },

            {
                test: /\.pug$/,
                loader: ["pug-loader"],
            },

            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    mini_css_extract_plugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true,
                            config: { path: './postcss.config.js'}
                        },
                    },
                ]
            },

            { 
                test: /\.styl$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    mini_css_extract_plugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true,
                            config: { path: './postcss.config.js'}
                        },
                    },
                    {
                        loader: 'stylus-loader',
                    }
                ]
            },

        ],
    },
}
