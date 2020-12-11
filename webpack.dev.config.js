const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');


module.exports = {
    entry: {
        'popup': './src/popup/index.js',
        'sidebar': './src/sidebar/index.js',
        'background': './src/background/index.js',
        'content': "./src/contentScript/index.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '' //were generated files are located
    },
    mode: "development",
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'
        }
    },
    watch: true,
    devtool: 'source-map',
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
        new CleanTerminalPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                    from: './public/manifest_dev.json',
                    to: 'manifest.json'
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
        })
    ]
}