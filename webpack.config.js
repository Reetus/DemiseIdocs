const path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: "./src/ts/app.ts",
    output: {
        filename: "./public/js/app-min.js"
    },
    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.ts$/,
                use: ["ts-loader"]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ minimize: true, sourceMap: true })
    ],
    devtool: 'source-map'
};