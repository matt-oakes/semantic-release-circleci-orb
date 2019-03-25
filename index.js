const AggregateError = require('aggregate-error');
const getPkg = require('./lib/get-pkg');
const verifyOrb = require('./lib/verify');
const prepareOrb = require('./lib/prepare');
const publishOrb = require('./lib/publish');

let verified;
let prepared;

async function verifyConditions(pluginConfig, context) {
  const errors = await verifyOrb(pluginConfig, context);

  try {
    await getPkg(pluginConfig, context);
  } catch (error) {
    errors.push(...error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  verified = true;
}

async function prepare(pluginConfig, context) {
  const errors = verified ? [] : await verifyOrb(pluginConfig, context);

  try {
    await getPkg(pluginConfig, context);
  } catch (error) {
    errors.push(...error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  await prepareOrb(pluginConfig, context);

  prepared = true;
}

async function publish(pluginConfig, context) {
  let pkg;
  const errors = verified ? [] : await verifyOrb(pluginConfig, context);

  try {
    pkg = await getPkg(pluginConfig, context);
  } catch (error) {
    errors.push(...error);
  }

  if (errors.length > 0) {
    throw new AggregateError(errors);
  }

  if (!prepared) {
    await prepareOrb(pluginConfig, context);
    prepared = true;
  }

  return publishOrb(pluginConfig, pkg, context);
}

module.exports = {verifyConditions, prepare, publish};
