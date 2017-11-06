const path = require('path');

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'firebase-database': path.resolve(__dirname, '../functions/firebase-database'),
    },
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, "./node_modules")],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss-loader',
        'sass-loader',
      ],
    }]
  }
};
