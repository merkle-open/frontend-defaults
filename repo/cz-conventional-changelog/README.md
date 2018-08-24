# Shared commitizen conventional changelog config [![npm version](https://img.shields.io/npm/v/@namics/cz-conventional-changelog.svg)](https://www.npmjs.org/package/@namics/cz-conventional-changelog)

> reusable commitizen conventional changelog config

## Usage

`npm i -D commitizen @namics/cz-conventional-changelog`

**package.json**

```json
  ...
  "scripts": {
    "cz": "git-cz",
    ...
  },
  "config": {
    "commitizen": {
      "path": "@namics/cz-conventional-changelog"
    }
  },
  ...
```

Part of the [commitizen](https://github.com/commitizen/cz-cli) family. Prompts for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) standard.

## License

[MIT License](./LICENSE)
