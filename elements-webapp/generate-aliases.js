const fs = require('fs');
const {resolve, relative} = require('path');

const srcPath = resolve(__dirname, 'src');

/**
 * Returns an object mapping names of subdirectories in ./src to their absolute paths, eg:
 * {
 *   component: '/some/absolute/path/to/sales-frontend/frontend/src/component',
 *   model: '/some/absolute/path/to/sales-frontend/frontend/src/model',
 *   ...
 * }
 */
async function getAliases() {
  const names = await new Promise(fulfill => {
    fs.readdir(srcPath, (error, names) => {
      if (error) throw error;
      fulfill(names);
    });
  });

  const dirs = await Promise.all(
    names.map(name => {
      const path = resolve(srcPath, name);

      return new Promise(fulfill =>
        fs.lstat(path, (error, stat) => {
          if (error) throw error;
          fulfill(stat.isDirectory() && !name.startsWith('__') && {['@' + name]: path});
        })
      );
    })
  );

  const aliases = dirs.reduce((aliases, dir) => (dir ? {...aliases, ...dir} : aliases), {});

  aliases['@jest-helpers'] = resolve(__dirname, 'test/jest/helpers');

  return aliases;
}

/**
 * Write aliases to "compilerOptions.paths" in ./tsconfig.json file.
 */
async function syncAliasesToTsConfig(aliases) {
  const tsconfig = require('./tsconfig.json');
  const tsAliases = {};

  for (const [name, path] of Object.entries(aliases)) {
    const relPath = relative(srcPath, path);
    tsAliases[name] = [relPath];
    tsAliases[name + '*'] = [relPath + '*'];
  }

  tsconfig.compilerOptions.paths = {
    ...tsconfig.compilerOptions.paths,
    ...tsAliases
  };

  return new Promise(fulfill => {
    fs.writeFile(resolve(__dirname, 'tsconfig.json'), JSON.stringify(tsconfig, null, 2) + '\n', error => {
      if (error) throw error;
      fulfill();
    });
  });
}

async function generateAliases() {
  const aliases = await getAliases();

  await syncAliasesToTsConfig(aliases);
}

if (require.main === module) {
  generateAliases();
}

module.exports = getAliases;
