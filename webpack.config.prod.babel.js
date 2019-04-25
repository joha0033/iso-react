const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: [
        'babel-regenerator-runtime',
        path.resolve(__dirname, 'src')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].js'
    },
    // output: {
    //     path: path.resolve(__dirname, 'public'),
    //     publicPath: '/',
    //     filename: 'bundle.js'
    // },
    plugins: [
        // new BundleAnalyzerPlugin(),
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
        modules: [
            path.resolve('./public'),
            path.resolve('./dist'),
            path.resolve('./node_modules'),
          ]
    },
    module: {
        rules: [
          { 
            test: /\.(js|jsx)$/, 
            exclude: [/node_modules/],
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'env', 'stage-2']
              }
            } 
          }
        ]
      }
};