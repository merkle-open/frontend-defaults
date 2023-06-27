# Shared stylelint config [![npm](https://img.shields.io/npm/v/@merkle-open/stylelint-config.svg)](https://www.npmjs.com/package/@merkle-open/stylelint-config)

> reusable stylelint config for stylelint 15

## Usage

`npm install --save-dev stylelint@15 @merkle-open/stylelint-config`

**stylelint.config.js**

```js
module.exports = require('@merkle-open/stylelint-config');
```

**.stylelintignore**

```
node_modules/
src/shared/base/reset/css/yui/reset.css
```

**package.json**

```json
{
  "scripts": {
    "lint:css": "stylelint src/**/*.*ss"
  }
}
```

## We recommend to use stylelint together with lint-staged and husky

`npm install --save-dev husky lint-staged`

**package.json**

```json
{
  "scripts": {
    "lint:css": "stylelint src/**/*.*ss"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.*ss": ["stylelint"]
  }
}
```

## License

[MIT License](./LICENSE)
