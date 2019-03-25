# semantic-release-circleci-orb

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to publish [CircleCI Orbs](https://circleci.com/orbs/).

[![npm latest version](https://img.shields.io/npm/v/semantic-release-circleci-orb/latest.svg)](https://www.npmjs.com/package/semantic-release-circleci-orb)

| Step               | Description                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify the presence of the `CIRCLECI_API_TOKEN` environment variable, `orbName` option, and the `circleci` CLI. |
| `publish`          | Publish the CircleCI orb.                                                                                       |

## Install

```bash
$ npm install semantic-release-circleci-orb -D
```

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
    [
      "semantic-release-circleci-orb",
      {
        "orbName": "react-native-community/circleci-orb",
        "orbPath": "orb.yml"
      }
    ]
  ]
}
```

## Configuration

### Environment variables

| Variable              | Description                                           |
|-----------------------|-------------------------------------------------------|
| `CIRCLECI_API_TOKEN`  | The token used to authenticate with CircleCI account. |

### Options

| Options   | Description                                                                                                                | Default                           |
|-----------|----------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| `orbName` | **Required**. The name of the Orb in the format of `organisation/orb`. For example, `react-native-community/circleci-orb`. | *None. You need to set your own.* |
| `orbPath` | The path to the Orb YAML file. This needs to be a single (packed) YAML file.                                               | `orb.yml`                         |

### CircleCI CLI installation

The plugin uses the `circleci` CLI which has to be installed in your CI environment and available in the `PATH`.

### CircleCI authentication

The CircleCI authentication configuration is **required** and can be set via environment variables.

Visit your account page on [CircleCI.com](https://circleci.com/account/api) to obtain your API token. The token has to be made available in your CI environment via the `CIRCLECI_API_TOKEN` environment variable.
