# Shared TypeScript config [![npm](https://img.shields.io/npm/v/@merkle-open/ts-config.svg)](https://www.npmjs.com/package/@merkle-open/ts-config)

> Shared TypeScript configuration for Merkle projects.

## Current state

- Package version: `2.0.0-alpha.2`
- Node.js: `^20.19.0 || ^22.13.0 || >=24`
- TypeScript: `^6.0.0`
- Variants: `node`, `browser`, `browser-react`

## Requirements

- Install TypeScript and the shared config:

```bash
npm install --save-dev typescript @merkle-open/ts-config
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

## What changed in v2

- `target` moved from `es5` to `es2025`
- Package split into `node`, `browser`, and `browser-react` variants
- Node variant uses `module` and `moduleResolution: "nodenext"`
- Browser variant uses `module: "preserve"` and `moduleResolution: "bundler"`
- Browser-react variant adds `jsx: "react-jsx"`
- TypeScript legacy decorators stay opt-in for projects that still need them
- `strict` follows the defaults from TypeScript 6

## Migration guide

See [MIGRATION.md](./MIGRATION.md) for the full v1 → v2 migration guide.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and breaking changes.

## License

[MIT License](./LICENSE)
