# Shared html-validate config

> reusable [html-validate](https://gitlab.com/html-validate/html-validate) config

## Usage

`npm install --save-dev @merkle-open/html-validate-config html-validate@7`

**.htmlvalidate.js**

```js
module.exports = require('@merkle-open/html-validate-config');
```

More infos about: [rules](https://html-validate.org/rules/index.html)

**package.json**

```json
{
  "scripts": {
    "lint:html": "html-validate --ext html,htm dist/**/"
  }
}
```

More infos about: [OPTIONS](https://html-validate.org/usage/cli.html#options)

## License

[MIT License](./LICENSE)
