const AggregateError = require('aggregate-error');
const verifyOrb = require('./lib/verify');
const publishOrb = require('./lib/publish');

let verified;

async function verifyConditions(pluginConfig, context) {
  const errors = await verifyOrb(pluginConfig, context);

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  verified = true;
}

async function publish(pluginConfig, context) {
  const errors = verified ? [] : await verifyOrb(pluginConfig, context);

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  return publishOrb(pluginConfig, context);
}

module.exports = {verifyConditions, publish};
