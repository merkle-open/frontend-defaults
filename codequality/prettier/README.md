# Shared prettier config [![npm](https://img.shields.io/npm/v/@merkle-open/prettier-config.svg)](https://www.npmjs.com/package/@merkle-open/prettier-config)

> reusable prettier config

## Usage

`npm install --save-dev prettier @merkle-open/prettier-config`

**.prettierrc.js**

```js
module.exports = require('@merkle-open/prettier-config');
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
    "prettier": "prettier --write \"**/*.*(gql|graphql|js|jsx|json|md|mdx|ts|tsx|yml|yaml)\"",
    ...
  },
  ...
```

## We recommend to use prettier together with lint-staged and husky

`npm install --save-dev husky lint-staged`

**package.json**

```json
  ...
  "lint-staged": {
    "*.{gql,graphql,js,jsx,json,md,mdx,ts,tsx,yml,yaml}": [
      "prettier --write"
    ]
  },
  "scripts": {
    "prettier": "prettier --write \"**/*.*(gql|graphql|js|jsx|json|md|mdx|ts|tsx|yml|yaml)\"",
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
