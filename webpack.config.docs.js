const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const isProduction = process.env.NODE_ENV === PRODUCTION;
const PUBLIC_PATH = path.resolve("./", "packages", "docs", "public");

/* eslint-disable */
module.exports = {
    mode: isProduction ? PRODUCTION : DEVELOPMENT,
    devtool: isProduction ? undefined : "source-map",
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-visibility": "ReactVisibility"
    },
    entry: "./packages/docs/src/index.js",
    output: {
        filename: "docs.client.js",
        path: path.resolve("./", "dist", "docs")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            "presets": [
                                "react-app"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(PUBLIC_PATH, "index.html")
        })
    ],
    resolve: {
        alias: {
            // Use convenient alias to get most up-to-date source.
            "ReactVisibility": path.resolve("./packages/react-visibility/src/index.js")
        }
    },
    devServer: {
        hot: true,
        compress: true,
        contentBase: PUBLIC_PATH,
        historyApiFallback: true,
        host: "0.0.0.0"
    }
};
