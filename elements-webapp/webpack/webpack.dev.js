const {join} = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');

const dev = {
  entry: {
    main: ['babel-polyfill', join(SRC_PATH, 'main.tsx')]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: require('./devServer.js'),
  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development')
        }
      }
    }),
  ]
};

module.exports = merge(common, dev);
