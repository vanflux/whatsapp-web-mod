const { ProgressPlugin } = require("webpack");
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
  plugins: [new ProgressPlugin()],
};
