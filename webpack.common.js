const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin({
            DEFAULT_AUTH_SERVER: JSON.stringify(process.env.AUTH_SERVER || 'http://tbajorek.pl:5000'),
            DEFAULT_MONITORS: process.env.MONITORS || JSON.stringify([
                {
                    address: 'http://tbajorek.pl:4000',
                    description: 'tbajorek official server'
                }
            ])
        })
    ]
};
