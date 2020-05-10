const {join} = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MAIN_PATH = join(__dirname, '..');
const SRC_PATH = join(MAIN_PATH, 'src');
const OUT_PATH = join(MAIN_PATH, 'build');

module.exports = {
  context: SRC_PATH,
  output: {
    path: OUT_PATH,
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  target: 'web',
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
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
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
      title: 'Elements API',
      template: 'assets/index.html',
    }),
  ],
  stats: {
    colors: true
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      '@component': join(SRC_PATH, 'component'),
      '@modal': join(SRC_PATH, 'modal'),
      '@constant': join(SRC_PATH, 'constant'),
      '@shared': join(SRC_PATH, 'shared'),
      '@type': join(SRC_PATH, 'type'),
      '@images': join(SRC_PATH, 'assets', 'img'),
      '@icons': join(SRC_PATH, 'assets', 'icon')
    },
  }
};
