const path = require("path");

module.exports = {
    extends: "aperopyl",
    parser: "babel-eslint",
    rules: {},
    settings: {
        "import/resolver": {
            webpack: {
                config: path.resolve("./webpack.config.docs.js")
            }
        }
    }
};
