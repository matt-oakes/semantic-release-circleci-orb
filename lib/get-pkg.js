const readPkg = require('read-pkg');
const AggregateError = require('aggregate-error');
const getError = require('./get-error');

module.exports = async (pluginConfig, {cwd}) => {
  try {
    const pkg = await readPkg({cwd});

    if (!pkg.name) {
      throw getError('ENOPKGNAME');
    }

    return pkg;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new AggregateError([getError('ENOPKG')]);
    } else {
      throw new AggregateError([error]);
    }
  }
};
