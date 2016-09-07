var path = require('path')
var webpack = require('webpack')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var colorFunction = require('postcss-color-function')
var cssnext = require('postcss-cssnext')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'public/bundle.js'
  },
  watch: true,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { 
        presets: ['react', 'es2015']
      }
    }]
  },
  postcss: function() {
    return [precss, autoprefixer, colorFunction, cssnext]
  }
}