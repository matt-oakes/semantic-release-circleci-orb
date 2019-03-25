const execa = require('execa');
const resolveConfig = require('./resolve-config');

module.exports = async (pluginConfig, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {version},
    logger,
  } = context;

  logger.log(`Publishing version ${version} to CircleCI Orb registry`);

  const {circleciToken, orbName, orbPath} = resolveConfig(pluginConfig, context);

  const orbRef = `${orbName}@${version}`;

  const result = execa('circleci', ['orb', 'publish', orbPath, orbRef, '--token', circleciToken], {
    cwd,
    env,
  });
  result.stdout.pipe(
    stdout,
    {end: false}
  );
  result.stderr.pipe(
    stderr,
    {end: false}
  );
  await result;

  logger.log(`Published ${orbRef}`);
  return {name: 'CircleCI Orb', url: `https://circleci.com/orbs/registry/orb/${orbRef}`};
};
