const {join} = require('path');

const SRC_PATH = join(__dirname, '../src');

module.exports = {
  contentBase: SRC_PATH,
  port: 3000,
  hot: true,
  inline: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  disableHostCheck: true,
  stats: 'minimal',
};
