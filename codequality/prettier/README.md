# Shared prettier config [![npm](https://img.shields.io/npm/v/@namics/prettier-config.svg)](https://www.npmjs.com/package/@namics/prettier-config)

> reusable prettier config

## Usage

`npm i -D husky lint-staged prettier @namics/prettier-config`

**.prettierrc.js**

```js
module.exports = require('@namics/prettier-config');
```

**.prettierignore**

```
package-lock.json
build
dist
node_modules
```

**lint-staged.config.js**

```js
module.exports = require('@namics/prettier-config/lint-staged-config');
```

**package.json**

```json
  ...
  "scripts": {
    "prettier": "prettier --write '**/*.*(js|jsx|ts|tsx|json)'",
    "precommit": "lint-staged"
    ...
  },
  ...
```

## License
[MIT License](./LICENSE)
