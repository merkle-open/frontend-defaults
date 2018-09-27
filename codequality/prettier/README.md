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

# Generated
**/bower.json
**/lerna.json

# Build
**/build
**/dist
**/public
**/coverage
**/storybook-static

# Nitro
**/project/blueprints
**/.yo-rc.json
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
    "*.{js,jsx,ts,tsx,json}": ["prettier --list-different --write \"**/*.*(js|jsx|ts|tsx|json)\""]
  },
  "scripts": {
    "prettier": "prettier --write \"**/*.*(js|jsx|ts|tsx|json)\"",
    ...
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  ...
```

## License

[MIT License](./LICENSE)
