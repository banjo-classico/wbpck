const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    "babel-polyfill",
    './index.js',
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: 'bundle.js',
    publicPath: "/",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', "movio"]
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["movio", "react"],
            },
          },
          {
            loader: "svg-react-loader",
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true
    }),
    new ModernizrWebpackPlugin({
      htmlWebpackPlugin: true,
      'feature-detects': [
        'inputtypes'
      ]
    }),
  ],
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ],
    extensions: [".js", ".jsx"],
    alias: {
      "ie": "component-ie"
    }
  },
  externals: {
  'cheerio': 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
 },
}
