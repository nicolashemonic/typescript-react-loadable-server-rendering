const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    // Set Webpack build for Node.js
    target: "node",

    // Ignore node_modules
    externals: [nodeExternals()],

    // The main entry point of the server application
    entry: {
        main: path.join(__dirname, "..", "source", "server")
    },

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
                    // 2. Babel transform and apply plugins on the TypeScript output regardless options below
                    {
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["es2015", "react"],
                            plugins: ["dynamic-import-node", "react-loadable/babel"]
                        }
                    },
                    // 1. TypeScript type check the source code and regardless tsconfig.server.json keep intact the code
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: require.resolve("./tsconfig.server.json"),
                            context: __dirname
                        }
                    }
                ]
            }
        ]
    }
};
