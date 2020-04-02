const execa = require('execa');
const resolveConfig = require('./resolve-config');
const getError = require('./get-error');

module.exports = async (pluginConfig, context) => {
  const {cwd, env} = context;
  const errors = [];
  const {commandName, circleciToken, orbName, orbPath} = resolveConfig(pluginConfig, context);

  if (!circleciToken) {
    errors.push(getError('ENOCIRCLECITOKEN'));
  }

  if ((await execa(commandName, ['version'], {reject: false, cwd, env})).code !== 0) {
    errors.push(getError('ENOCIRCLECICLI'));
  }

  if (!orbName) {
    errors.push(getError('ENOORBNAME'));
  }
  // TODO: Validate that the name is in the correct format

  if (!orbPath) {
    errors.push(getError('EINVALIDORBPATH', {orbPath}));
  }
  // TODO: Validate that the orb file is present and readable

  return errors;
};
