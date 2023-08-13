const { ProgressPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const { resolve } = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

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
  plugins: [new ProgressPlugin()],
};
