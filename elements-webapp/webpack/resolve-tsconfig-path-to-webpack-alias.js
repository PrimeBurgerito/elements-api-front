const {resolve} = require('path');

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} srcPath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({
                                       tsconfigPath = '../tsconfig.json',
                                       srcPath = __dirname,
                                     } = {}) {
  const {paths} = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((origKey) => {
    const key = origKey.replace('/*', '');
    aliases[key] = resolve(srcPath, paths[origKey][0].replace('/*', '').replace('*', ''));
  });

  return aliases;
}

module.exports = resolveTsconfigPathsToAlias;
