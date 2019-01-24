# Shared tslint config [![npm](https://img.shields.io/npm/v/@namics/tslint-config.svg)](https://www.npmjs.com/package/@namics/tslint-config)

> reusable tslint config

## Usage

`npm i -D tslint @namics/tslint-config`

**tslint.json**

```json
{
  "defaultSeverity": "error",
  "extends": ["@namics/tslint-config"],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}
```

**package.json**

```json
  ...
  "scripts": {
    "lint:ts": "tslint 'src/**/*.{ts,tsx}'",
    ...
  },
  ...
```

## Usage with prettier

The [`tslint-config-prettier`](https://www.npmjs.com/package/tslint-config-prettier) npm package disables all conflicting rules that may cause such problems. Prettier takes care of the formatting whereas tslint takes care of all the other things.

`npm i -D tslint tslint-config-prettier @namics/tslint-config`


**tslint.json**

```json
{
  "defaultSeverity": "error",
  "extends": ["@namics/tslint-config", "tslint-config-prettier"],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}
```

**package.json**

```json
  ...
  "scripts": {
    "lint:ts": "tslint 'src/**/*.{ts,tsx}'",
    ...
  },
  ...
```

See [@namics/tslint-config](https://unpkg.com/@namics/tslint-config) on unpkg

## License
[MIT License](./LICENSE)
