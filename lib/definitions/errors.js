const pkg = require('../../package.json');

const [homepage] = pkg.homepage.split('#');
const linkify = file => `${homepage}/blob/master/${file}`;

module.exports = {
  ENOCIRCLECITOKEN: () => ({
    message: 'No CircleCI token specified.',
    details: `A [CircleCI API token](${linkify(
      'README.md#circleci-authentication'
    )}) must be created and set in the \`CIRCLECI_API_TOKEN\` environment variable on your CI environment.

Please visit your account page on [circleci.com](https://circleci.com/account/api) and to set it in the \`CIRCLECI_API_TOKEN\` environment variable on your CI environment.`,
  }),
  ENOCIRCLECICLI: () => ({
    message: 'The circleci CLI must be installed.',
    details: `The \`circleci\` command line has to be installed in your CI environment and available in the \`PATH\` environment varialbe.

See [CircleCI installation](${linkify('README.md#circleci-installation')}) for more details.`,
  }),
  ENOORBNAME: () => ({
    message: 'Missing `orbName` option.',
    details: `Please make sure to add a valid \`orbName\` option when configuring semantic release. It should be in the format \`organisation/orb\`.`,
  }),
  EINVALIDORBNAME: () => ({
    message: 'Invalid `orbName` option format.',
    details: `Please make sure to add a valid \`orbName\` option when configuring semantic release. It should be in the format \`organisation/orb\`.`,
  }),
  EINVALIDORBPATH: orbPath => ({
    message: 'Invalid `orbPath` option.',
    details: `Please make sure to add a valid \`orbPath\` option when configuring semantic release and ensure you have either included the YAML file in git or packed it locally on CI before attempting a release. The path you have configured is \`${orbPath}\`.`,
  }),
};
