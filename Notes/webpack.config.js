const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

var config = {
    /*
     * app.tsx represents the entry point to your web application. Webpack will
     * recursively go through every "require" statement in app.tsx and
     * efficiently build out the application's dependency tree.
     */
    entry: ["./src/app.tsx"],

    /*
     * The combination of path and filename tells Webpack what name to give to
     * the final bundled JavaScript file and where to store this file.
     */
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },

    /*
     * resolve lets Webpack now in advance what file extensions you plan on
     * "require"ing into the web application, and allows you to drop them
     * in your code.
     */
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    plugins: [
      new ExtractTextPlugin("[name].css", {allChunks: true})
    ],

    postcss() {
        return [autoprefixer];
    },

    module: {
        /*
         * Each loader needs an associated Regex test that goes through each
         * of the files you've included (or in this case, all files but the
         * ones in the excluded directories) and finds all files that pass
         * the test. Then it will apply the loader to that file. I haven't
         * installed ts-loader yet, but will do that shortly.
         */
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css', 'postcss!sass'])
            },
            {
                test: /\.node$/,
                loader: 'node-loader'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        module: 'empty'
    }
};

module.exports = config;
