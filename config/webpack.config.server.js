const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    // Set Webpack build for Node.js
    target: "node",

    // Ignore node_modules
    externals: [nodeExternals()],

    // The main entry point source/server/index.tsx
    entry: ["babel-polyfill", path.join(__dirname, "..", "source", "server")],

    // Generated bundle location
    output: {
        path: path.join(__dirname, "..", "server"),
        filename: "[name].js"
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
                    // 2. Babel transform React jsx and es2015 synthax into code understandable by the browser
                    //    Babel apply plugins to make code splitting compatible with server rendering
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["es2015", "react"],
                            plugins: ["dynamic-import-node", "react-loadable/babel"]
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
    }
};
