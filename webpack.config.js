const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function (options) {
    options = options || {};

    return {
        target: 'node',
        node: {
            __dirname: false,
            __filename: false,
        },
        entry: {
            server: './src/server.ts',
        },
        devServer: {
            inline: true
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        externals: [/(node_modules|main\..*\.js)/, ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.ts$/,
                exclude: [new RegExp('/\spec.ts$/')],
                loader: 'ts-loader'
            }, ]
        },
        plugins: [
            new DefinePlugin({
                PRODUCTION: options.prod,
            }),
            new CopyWebpackPlugin([{
                    from: './config/config.json',
                    to: './'
                },
                {
                    from: './keys',
                    to: './keys'
                },
            ])
        ]
    }
}