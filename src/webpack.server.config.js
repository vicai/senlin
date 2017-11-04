const baseConfig = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');

module.exports = Object.assign({}, {
  target: 'node',
  entry: './containers/ServerApp.jsx',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../functions/build'),
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
  ]
}, baseConfig);
