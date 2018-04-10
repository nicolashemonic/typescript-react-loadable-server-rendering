const path = require("path");
const { ReactLoadablePlugin } = require("react-loadable/webpack");

module.exports = {
    // The main entry point of the application
    entry: ["babel-polyfill", path.join(__dirname, "..", "source", "client")],

    // The main entry point source/client/index.tsx
    // Main entry point plus each dynamic import generate a bundle
    // Ex: import(/* webpackChunkName: "about" */ "../pages/about") generate about.js
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
                    // 2. Babel transform React jsx and es2015 syntax into code understandable by the browser
                    //    Babel apply plugins to make code splitting compatible with server rendering
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["es2015", "react"],
                            plugins: ["syntax-dynamic-import", "react-loadable/babel"]
                        }
                    },
                    // 1. TypeScript type check and emit JavaScript es2015 (TypeScript without types) consumable by Babel
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: require.resolve("./tsconfig.json"),
                            context: __dirname
                        }
                    }
                ]
            }
        ]
    },

    // React Loadable generate stats for mapping modules to bundle
    // This file is used on server side rendering to determine which bundle need to be load
    // Webpack build server and client simultaneously so we need to commit reactLodable.json in source
    // this way Webpack will always find the file when the server build append before client
    plugins: [
        new ReactLoadablePlugin({
            filename: path.join(__dirname, "..", "source", "server", "stats", "reactLoadable.json")
        })
    ]
};
