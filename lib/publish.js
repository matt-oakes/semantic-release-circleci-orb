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

  const {commandName, circleciToken, orbName, orbPath, rcOverrideTag} = resolveConfig(pluginConfig, context);

  let nextVersion = version
  if (version.includes('rc')) {
    logger.log(`Detected rc (${version}) orb release, using pushing to rcOverrideTag version (${rcOverrideTag})`)
    nextVersion = rcOverrideTag
  }

  const orbRef = `${orbName}@${nextVersion}`;

  const result = execa(commandName, ['orb', 'publish', orbPath, orbRef, '--token', circleciToken], {
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
