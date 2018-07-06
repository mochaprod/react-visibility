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
    devtool: isProduction ? undefined : "inline-source-map",
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-in-view": "ReactInView"
    },
    entry: "./packages/docs/src/App.js",
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
                                "@babel/preset-env",
                                "@babel/preset-react",
                                ["@babel/preset-stage-2", {
                                    "decoratorsLegacy": true
                                }]
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
            "ReactInView": path.resolve("./packages/react-in-view/src/index.js")
        }
    },
    devServer: {
        hot: true,
        compress: true,
        contentBase: PUBLIC_PATH,
        host: "0.0.0.0"
    }
};
