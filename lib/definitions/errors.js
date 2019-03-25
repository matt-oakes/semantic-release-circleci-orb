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
  ENOPKGNAME: () => ({
    message: 'Missing `name` property in `package.json`.',
    details: `The \`package.json\`'s [name](https://docs.npmjs.com/files/package.json#name) property is required in order to publish a CircleCI Orb using this plugin.

Please make sure to add a valid \`name\` for your package in your \`package.json\`. It should be in the format organisation/orb.`,
  }),
  ENOPKG: () => ({
    message: 'Missing `package.json` file.',
    details: `A [package.json file](https://docs.npmjs.com/files/package.json) at the root of your project is required to publish a CircleCI Orb.

Please follow the [npm guideline](https://docs.npmjs.com/getting-started/creating-node-modules) to create a valid \`package.json\` file.`,
  }),
};
