# Releasing

## Pre-requisites

```bash
yarn
```

## Releasing

Dry run it first to check the output:
```bash
GH_TOKEN=... yarn semantic-release --no-ci --dry-run
```

Then run it for real:
```bash
GH_TOKEN=... yarn semantic-release --no-ci
```