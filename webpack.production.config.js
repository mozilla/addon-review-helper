const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        'popup': './src/popup/index.js',
        'sidebar': './src/sidebar/index.js',
        'background': './src/background/index.js',
        'content': "./src/contentScript/index.js",
        'options': "./src/options/index.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '' //were generated files are located
    },
    mode: "production",
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'
        }
    },
    watch: true,
    module: {
        rules: [{
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"

                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader"
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                    from: './public/manifest.json',
                    to: ''
                },
                {
                    from: './public/img',
                    to: 'img'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: [
                'popup'
            ],
            title: 'Popup',
            description: 'Popup',
            template: 'src/popup/template.html',
            cache: false
        }),
        new HtmlWebpackPlugin({
            filename: 'sidebar.html',
            chunks: [
                'sidebar'
            ],
            title: 'sidebar',
            description: 'sidebar',
            template: 'src/popup/template.html',
            cache: false
        }),
        new HtmlWebpackPlugin({
            filename: 'background.html',
            chunks: [
                'background'
            ],
            cache: false
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            description: 'options',
            template: 'src/options/options.html',
            chunks: [
                'options'
            ],
            cache: false
        })
    ]
}