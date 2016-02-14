var webpack = require('webpack');

const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src/scripts/main.js'),
  dist: path.join(__dirname, 'assets/scripts')
};

module.exports = {
  entry: {
    bundle: [
      PATHS.src
    ]
  },

  output: {
      path: PATHS.dist,
      filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue'   // loader to use for matched files
      }
    ]
  }
};