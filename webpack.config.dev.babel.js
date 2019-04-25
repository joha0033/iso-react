import webpack from 'webpack'
import path from 'path'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
export default {
    mode: 'development',
    entry: [ // list of files that babel will load automatically as it assembles
        'webpack-hot-middleware/client?reload=true',
        'babel-regenerator-runtime', // to use yield
        path.resolve(__dirname, 'src/')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        chunkFilename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
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
        extensions: [ '.js', '.jsx', '.json'],
        modules: [
            path.resolve('./public'),
            path.resolve('./dist'),
            path.resolve('./node_modules'),
          ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src')
            }
        ]
    }
}