module.exports = (pluginConfig, {env}) => ({
  commandName: pluginConfig.commandName || 'circleci',
  orbName: pluginConfig.orbName,
  orbPath: pluginConfig.orbPath || 'orb.yml',
  rcOverrideTag: pluginConfig.rcOverrideTag || 'dev:first',
  circleciToken: env.CIRCLECI_API_TOKEN,
});
