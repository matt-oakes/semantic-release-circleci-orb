const execa = require('execa');
const resolveConfig = require('./resolve-config');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {cwd, env} = context;
  const errors = [];
  const {circleciToken} = resolveConfig(pluginConfig, context);

  if (!circleciToken) {
    errors.push(getError('ENOCIRCLECITOKEN'));
  }

  if ((await execa('circleci', ['version'], {reject: false, cwd, env})).code !== 0) {
    errors.push(getError('ENOCIRCLECICLI'));
  }

  return errors;
};
