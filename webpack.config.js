global.Promise = require('bluebird');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = 'http://localhost:8888/public/assets';
var cssName = process.env.NODE_ENV === 'production' ? 'style-[hash].css' : 'style.css';
var jsName = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

var plugins = [
  new webpack.DefinePlugin({
    BROWSER: JSON.stringify(true),
    NOVE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
  }),
  new ExtractTextPlugin(cssName)
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new CleanWebpackPlugin([ 'public/assets/' ], {
      root: __dirname,
      verbose: true,
      dry: false
    })
  );
  plugins.push(new webpack.optimize.DedupePlugin());
}

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      "node_modules"
    ], 
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: process.env.NODE_ENV !== 'production'
    })
  ],
  output: {
    path: path.join(__dirname, './public/assets/'),
    filename: jsName,
    publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader', 
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader', 
          'postcss-loader', 
          'less-loader'
        ]
      },
      { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
      { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
      { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
      { test: /\.(woff|woff2|ttf|eof)/, loader: 'url-loader?limit=1' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: [/node_modules/, /public/] },
      { test: /\.json$/, loader: 'json-loader' },
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
