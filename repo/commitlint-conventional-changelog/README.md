# Shared commitlint config [![npm version](https://img.shields.io/npm/v/@merkle-open/commitlint-conventional-changelog.svg)](https://www.npmjs.org/package/@merkle-open/commitlint-conventional-changelog)

> Shareable `commitlint` config enforcing [conventional commits](https://conventionalcommits.org/).

## Usage

`npm install --save-dev husky @commitlint/cli @merkle-open/commitlint-conventional-changelog`

**package.json**

```json
  ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
	},
	...
  },
  "commitlint": {
    "extends": [
      "@merkle-open/commitlint-conventional-changelog"
    ]
  },
  ...
```

## License

[MIT License](./LICENSE)
