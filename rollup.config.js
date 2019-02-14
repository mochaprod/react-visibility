const path = require("path");
const chalk = require("chalk");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");

const PRODUCTION = "production";
const DEVELOPMENT = "development";

const isProduction = process.env.NODE_ENV === PRODUCTION;

const BUILD_TYPES = [
    "cjs",
    "umd"
];

const DESTINATIONS = [
    "./packages/react-visibility/dist"
];

const getFileName = (
    buildType, env
) => `react-visibility.${buildType}.${env}.js`;

function createBuild(
    type
) {
    process.env.NODE_ENV = type === "cjs"
        ? DEVELOPMENT
        : PRODUCTION;

    const build = process.env.NODE_ENV;

    return {
        external: ["react"],
        input: path.resolve(
            "./packages/react-visibility/src/index.js"
        ),
        output: DESTINATIONS.map(destination => ({
            name: "ReactVisibility",
            file: path.join(destination, getFileName(type, build)),
            format: type
        })),
        plugins: [
            babel({
                babelrc: false,
                presets: ["react-app"],
                runtimeHelpers: true
            }),
            resolve({
            }),
            commonjs({
                include: "node_modules/**"
            }),
            build === PRODUCTION
                ? uglify()
                : undefined
        ]
    };
}

module.exports = BUILD_TYPES.map(type => createBuild(type));
