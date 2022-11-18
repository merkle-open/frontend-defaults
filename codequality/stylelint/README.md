# Shared stylelint config [![npm](https://img.shields.io/npm/v/@namics/stylelint-config.svg)](https://www.npmjs.com/package/@namics/stylelint-config)

> reusable stylelint config for stylelint 14

## Usage

`npm install --save-dev stylelint@14 @namics/stylelint-config`

**stylelint.config.js**

```js
module.exports = require('@namics/stylelint-config');
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
