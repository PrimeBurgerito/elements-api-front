const {join} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolveTsconfigPathsToAlias = require('./resolve-tsconfig-path-to-webpack-alias');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');
const OUT_PATH = join(MAIN_PATH, 'build');

module.exports = {
  output: {
    path: OUT_PATH,
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader'},
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: [
          {loader: 'babel-loader', options: {babelrc: true}},
          {loader: 'ts-loader', options: {configFile: 'tsconfig.json'}}
        ]
      },
      {test: /\.html$/, loader: 'html-loader'},
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: join(SRC_PATH, 'assets', 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  stats: {
    colors: true
  },
  optimization: {
    splitChunks: {chunks: 'all'},
    runtimeChunk: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: resolveTsconfigPathsToAlias({tsconfigPath: '../tsconfig.json', srcPath: SRC_PATH}),
  }
};
