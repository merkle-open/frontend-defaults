# Shared stylelint config [![npm](https://img.shields.io/npm/v/@namics/stylelint-config.svg)](https://www.npmjs.com/package/@namics/stylelint-config)

> reusable stylelint config

## Usage

`npm i -D stylelint @namics/stylelint-config`

**stylelint.config.js**

```js
module.exports = require('@namics/stylelint-config');
```

**.stylelintignore**

```
assets/css/**/reset.css
assets/css/**/variables.*
assets/css/**/mixins.*
node_modules/
src/assets/css/**/reset.css
src/assets/css/**/variables.*
src/assets/css/**/mixins.*
```

**package.json**

```json
  ...
  "scripts": {
    "lint:css": "stylelint src/**/*.*ss",
    ...
  },
  ...
```

## We recommend to use stylelint together with lint-staged and husky

`npm i -D husky lint-staged`

**package.json**

```json
  ...
  "lint-staged": {
    "src/**/*.*ss": ["stylelint"]
  },
  "scripts": {
    "lint:css": "stylelint src/**/*.*ss",
    "precommit": "lint-staged",
    ...
  },
  ...
```

## License
[MIT License](./LICENSE)
