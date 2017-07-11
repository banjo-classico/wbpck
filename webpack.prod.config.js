const webpack = require("webpack")
const webpackConfig = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = Object.assign({}, webpackConfig, {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                autoprefixer: false,
                minimize: false,
                camelCase: true,
                modules: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]___[hash:base64:5]",
              }
            },
            {
              loader: "postcss-loader",
            }
          ],
        }),
        exclude: /global\.css$/,
      },
      {
        test: /global\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      ...webpackConfig.module.rules,
    ],
  },
  plugins: [
    ...webpackConfig.plugins,
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production"),
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
  ]
});
