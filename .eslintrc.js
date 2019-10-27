const path = require("path");

module.exports = {
    extends: "aperopyl-react",
    parser: "babel-eslint",
    rules: {},
    settings: {
        "import/resolver": {
            webpack: {
                config: path.resolve("webpack.config.docs.js")
            }
        }
    }
};
