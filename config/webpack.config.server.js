const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    // Set Webpack build for Node.js
    target: "node",

    // Exclude node_modules from the bundle
    externals: [nodeExternals()],

    // The main entry point source/server/index.tsx
    entry: ["babel-polyfill", path.join(__dirname, "..", "source", "server")],

    // Generated bundle location
    output: {
        path: path.join(__dirname, "..", "server"),
        filename: "[name].js"
    },

    // Source files take into account
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
                    // 2. babel-preset-react transform React jsx and babel-preset-env es2015 syntax into code understandable by the browser
                    //    dynamic-import-node transpile import() to a deferred require() for node
                    //    react-loadable/babel declare wich modules are being loaded
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: [
                                "react",
                                [
                                    "env",
                                    {
                                        modules: false
                                    }
                                ]
                            ],
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
