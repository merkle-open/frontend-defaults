# Shared prettier config [![npm](https://img.shields.io/npm/v/@namics/prettier-config.svg)](https://www.npmjs.com/package/@namics/prettier-config)

> reusable prettier config

## Usage

`npm i -D prettier @namics/prettier-config`

**.prettierrc.js**

```js
module.exports = require('@namics/prettier-config');
```

**.prettierignore**

```
# Node
**/node_modules
**/package.json
**/package-lock.json

# Config
**/bower.json
**/lerna.json

# Build
**/build
**/dist
**/public
**/coverage
**/storybook-static

# generator-nitro
**/project/blueprints
```

**package.json**

```json
  ...
  "scripts": {
    "prettier": "prettier --write \"**/*.*(js|jsx|ts|tsx|json)\"",
    ...
  },
  ...
```

## We recommend to use prettier together with lint-staged and husky

`npm i -D husky lint-staged`

**package.json**

```json
  ...
  "lint-staged": {
    "*.{js,jsx,ts,tsx,json}": ["prettier --list-different \"**/*.*(js|jsx|ts|tsx|json)\""]
  },
  "scripts": {
    "prettier": "prettier --write \"**/*.*(js|jsx|ts|tsx|json)\"",
    "precommit": "lint-staged",
    ...
  },
  ...
```

## License
[MIT License](./LICENSE)
