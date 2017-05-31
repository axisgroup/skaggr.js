var webpack = require("webpack");

var config = {
    //context: __dirname,
    entry: {
        app: './src/index.js',
    },
    output: {
        path: __dirname + "/dist", // `dist` is the destination
        filename: "skaggr.js",
        libraryTarget: "umd",
        library: "skaggr",
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        modules: [__dirname, "node_modules"]
    }
};

module.exports = config;