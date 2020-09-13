const {join} = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');

const prod = {
  mode: 'production',
  entry: {
    main: ['babel-polyfill', join(SRC_PATH, 'main.tsx')]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: [
          {loader: 'babel-loader', options: {babelrc: true}},
          {loader: 'ts-loader', options: {configFile: 'tsconfig.json'}}
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()],
  },
};

module.exports = merge(common, prod)
