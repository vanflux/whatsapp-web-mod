const { DefinePlugin, ProgressPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { resolve } = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const { readFileSync } = require("fs");

module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, "./tsconfig.json"),
      }),
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new ProgressPlugin(),
    new DefinePlugin({
      WAPI_JS_CODE: readFileSync(resolve(__dirname, "./src/page/features/wapi/downloaded/wapi.js"), "utf8"),
    }),
  ],
};
