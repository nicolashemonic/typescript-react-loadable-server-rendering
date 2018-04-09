const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

module.exports = {
    // The main entry point of the application
    entry: ["babel-polyfill", path.join(__dirname, "..", "source", "client")],

    // Main entry point plus each dynamic import generate a bundle
    // Ex: import(/* webpackChunkName: "hello" */"../components/hello") generate hello.js
    output: {
        path: path.join(__dirname, "..", "client"),
        filename: "[name].js",
        chunkFilename: "[name].js",
        publicPath: "/static/js/"
    },

    // Webpack need to resolve ts(x) file from source code and js(x) files from dependencies
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    // Plugins in charge to transform the source code
    // Rules are applied from right to left (ts-loader then babel-loader)
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    // 2. Babel transform and apply plugins from the TypeScript output regardless options below
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["es2015", "react"],
                            plugins: ["syntax-dynamic-import", "react-loadable/babel"]
                        }
                    },
                    // 1. TypeScript type check the source code and regardless tsconfig.client.json keep intact the code
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: require.resolve("./tsconfig.client.json"),
                            context: __dirname
                        }
                    }
                ]
            }
        ]
    },

    // React Loadable generate stats for mapping modules to bundle
    // This file is used on server side rendering to determine which bundle need to be load
    // Webpack build frontend and backend simultaneously so we need to commit reactLodable.json in source
    // this way Webpack will always find the file when he build backend before frontend
    plugins: [
        new ReactLoadablePlugin({
            filename: path.join(__dirname, "..", "source", "server", "stats", "reactLoadable.json")
        })
    ]
};
