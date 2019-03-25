module.exports = (pluginConfig, {env}) => ({
  orbName: pluginConfig.orbName,
  orbPath: pluginConfig.orbPath || 'orb.yml',
  circleciToken: env.CIRCLECI_API_TOKEN,
});
