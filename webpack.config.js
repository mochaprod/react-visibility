const path = require("path");
const chalk = require("chalk");

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const isProduction = process.env.NODE_ENV === PRODUCTION;
const buildType = process.env.BUILD_TYPE || "umd";
const entryFile = "./packages/react-visibility/src/index.js";

console.log(`Building in ${chalk.cyan(process.env.NODE_ENV)}...`);

const getFileName = () =>
    `react-visibility.${buildType}.${isProduction ? PRODUCTION : DEVELOPMENT}`;

/* eslint-disable */
module.exports = {
    mode: isProduction ? PRODUCTION : DEVELOPMENT,
    devtool: isProduction ? undefined : "inline-source-map",
    externals: {
        "react": buildType === "umd" ? "React" : "react"
    },
    entry: {
        [`./dist/${getFileName()}`]: entryFile,
        [`./packages/docs/public/static/${getFileName()}`]: entryFile,
        [`./packages/react-visibility/dist/${getFileName()}`]: entryFile
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./"),
        library: "ReactInView",
        libraryTarget: buildType
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
            }
        ]
    },
    resolve: {
        alias: {}
    }
};
