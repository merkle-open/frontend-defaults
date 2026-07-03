# Shared TypeScript config [![npm](https://img.shields.io/npm/v/@merkle-open/ts-config.svg)](https://www.npmjs.com/package/@merkle-open/ts-config)

> Shared TypeScript configuration for Merkle projects (TypeScript 6).

## Requirements

- Node.js: `^20.19.0 || ^22.13.0 || >=24`
- TypeScript: `^6.0.0`

## Installation

```bash
npm install --save-dev typescript @merkle-open/ts-config
```

## Usage

Version 2 provides two dedicated variants:

- `@merkle-open/ts-config/node` for Node.js/server projects
- `@merkle-open/ts-config/browser` for browser/bundled projects

### Node.js

```json
{
  "extends": "@merkle-open/ts-config/node"
}
```

### Browser / Bundler

```json
{
  "extends": "@merkle-open/ts-config/browser"
}
```

## What changed in v2

- `target` moved from `es5` to `es2025`
- Package split into `node` and `browser` variants
- Node variant uses `module`/`moduleResolution: "nodenext"`
- Browser variant uses `module: "preserve"` and `moduleResolution: "bundler"`
- JSX defaults to `"react-jsx"` in browser variant
- Legacy decorators are no longer enabled by default
- `strict` defaults from TypeScript 6 are used

## Legacy decorator opt-in

If your project still requires legacy decorators (for example Angular/NestJS patterns), add this in your project `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## License

[MIT License](./LICENSE)
