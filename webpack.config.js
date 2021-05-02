const path = require('path');
const fs = require('fs');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",        
        filename: 'websocketio.min.js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'WebSocketIO',
        umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
}
