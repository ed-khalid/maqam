const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dir } = require('console');
module.exports = {

    entry: './src/index.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
            ,
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist') ,
        compress: true,
        port:8000 
    },
    resolve: {
        extensions: ['.ts', '.js']
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Scales',
            template: 'index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
} 
