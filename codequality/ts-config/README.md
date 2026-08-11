# Shared TypeScript config [![npm](https://img.shields.io/npm/v/@merkle-open/ts-config.svg)](https://www.npmjs.com/package/@merkle-open/ts-config)

> Shared TypeScript configuration for Merkle projects.

## Current state

- Node.js: `^20.19.0 || ^22.13.0 || >=24`
- TypeScript: `^6.0.0`
- Variants: `node`, `browser`, `browser-react`

## Requirements

- Install TypeScript and the shared config:

```bash
npm install --save-dev typescript@6 @merkle-open/ts-config
```

## Usage

Use the variant that matches the project type.

### Node.js / server

```json
{
  "extends": "@merkle-open/ts-config/node"
}
```

### Browser / bundler

```json
{
  "extends": "@merkle-open/ts-config/browser"
}
```

### Browser / React

```json
{
  "extends": "@merkle-open/ts-config/browser-react"
}
```

## Migration guide

See [MIGRATION.md](./MIGRATION.md) for the full v1 → v2 migration guide.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and breaking changes.

## License

[MIT License](./LICENSE)
