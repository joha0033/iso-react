const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: [
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                WEBPACK: true
            }
        })
    ],
    optimization: {
        splitChunks:{
            chunks: 'all'
        } 
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
};