const execa = require('execa');
const resolveConfig = require('./resolve-config');

module.exports = async (pluginConfig, {name}, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {version},
    logger,
  } = context;

  logger.log(`Publishing version ${version} to CircleCI Orb registry`);

  const {circleciToken} = resolveConfig(pluginConfig, context);

  const orbRef = `${name}@${version}`;

  const result = execa('circleci', ['orb', 'publish', 'orb.yml', orbRef, '--token', circleciToken], {
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
  return {name: 'CircleCI Orb', url: `https://circleci.com/orbs/registry/orb/${name}`};
};
