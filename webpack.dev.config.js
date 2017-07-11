const webpack = require("webpack");
const webpackConfig = require("./webpack.base.config");

const target = process.env.TARGET || "http://localhost:3000";

module.exports = Object.assign({}, webpackConfig, {
  module: {
    rules: [
      ...webpackConfig.module.rules,
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              autoprefixer: false,
              minimize: false,
              camelCase: true,
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64:5]",
            }
          },
          {
            loader: "postcss-loader",
          },
        ],
        exclude: /global\.css$/,
      },
      {
        test: /global\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ]
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./build",
    historyApiFallback: true,
    //to enable proxy access for IE and mobile testing.
    disableHostCheck: true,
    proxy: {
      '/api': {
        target,
        secure: true,
        host: target,
        changeOrigin: true,
      },
      '/token': {
        target,
        secure: true,
        host: target,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    ...webpackConfig.plugins,
    new webpack.DefinePlugin({
     "process.env": {
        "NODE_ENV": JSON.stringify("development"),
      }
    })
  ],
})
