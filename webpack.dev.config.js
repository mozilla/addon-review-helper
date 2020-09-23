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
        'content': "./src/contentScript/index.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        publicPath: '' //were generated files are located
    },
    mode: "development",
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        index: 'index.html',
        port: 9000
    },
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
                    "style-loader", 'css-loader'
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
                    from: './src/manifest.json',
                    to: ''
                },
                {
                    from: './src/img',
                    to: 'img'
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: [
                'popup'
            ],
            title: 'Popup',
            description: 'Popup',
            template: 'src/popup/template.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'sidebar.html',
            chunks: [
                'sidebar'
            ],
            title: 'sidebar',
            description: 'sidebar',
            template: 'src/popup/template.html'
        })
    ]
}