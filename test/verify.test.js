import test from 'ava';
import tempy from 'tempy';
import verify from '../lib/verify';

test('Verify "CIRCLECI_API_TOKEN" is set', async t => {
  t.deepEqual(await verify({orbName: 'org/orb'}, {env: {CIRCLECI_API_TOKEN: 'my_token'}}), []);
});

test('Return SemanticReleaseError if "CIRCLECI_API_TOKEN" is not set', async t => {
  const [error] = await verify({orbName: 'org/orb'}, {env: {}});

  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'ENOCIRCLECITOKEN');
  t.truthy(error.message);
  t.truthy(error.details);
});

test('Return SemanticReleaseError if "circleci" is not installed', async t => {
  const [error] = await verify({orbName: 'org/orb'}, {env: {CIRCLECI_API_TOKEN: 'my_token', PATH: tempy.directory()}});

  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'ENOCIRCLECICLI');
  t.truthy(error.message);
  t.truthy(error.details);
});

test('Return SemanticReleaseError if "orbName" option is not set', async t => {
  const [error] = await verify({}, {env: {CIRCLECI_API_TOKEN: 'my_token'}});

  t.is(error.name, 'SemanticReleaseError');
  t.is(error.code, 'ENOORBNAME');
  t.truthy(error.message);
  t.truthy(error.details);
});
