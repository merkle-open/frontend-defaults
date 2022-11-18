# @namics/commitlint-conventional-changelog [![npm version](https://img.shields.io/npm/v/@namics/commitlint-conventional-changelog.svg)](https://www.npmjs.org/package/@namics/commitlint-conventional-changelog)

> Shareable `commitlint` config enforcing [convention commits](https://conventionalcommits.org/).

## Usage

`npm install --save-dev husky @commitlint/cli @namics/commitlint-conventional-changelog`

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
      "@namics/commitlint-conventional-changelog"
    ]
  },
  ...
```

## License

[MIT License](./LICENSE)
