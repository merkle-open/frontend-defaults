# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

> Current release: `2.0.0`. See [MIGRATION.md](https://github.com/merkle-open/frontend-defaults/blob/%40merkle-open/ts-config%402.0.0/codequality/ts-config/MIGRATION.md) for the v1 → v2 upgrade guide.

## [2.0.0](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.1.2...@merkle-open/ts-config@2.0.0) (2026-08-11)

### ⚠ BREAKING CHANGES

- Upgraded peer dependency to `typescript ^6.0.0`
- Replaced single `tsconfig.json` with variant-based entry points: `@merkle-open/ts-config/node`, `@merkle-open/ts-config/browser`, and `@merkle-open/ts-config/browser-react`
- Updated base target from `es5` to `es2025`
- Removed default legacy decorator flags (`experimentalDecorators`, `emitDecoratorMetadata`)
- Raised Node.js engine requirement to `^20.19.0 || ^22.13.0 || >=24`
- Updated the generic `browser` variant to remove React/Node-specific defaults (`jsx: "react-jsx"` and `types: ["node"]`); use `browser-react` for React-specific browser defaults
- Updated defaults to modern module settings:
  - Browser: `module: "preserve"` and `moduleResolution: "bundler"`
  - Node: `module: "nodenext"` and `moduleResolution: "nodenext"`

## [1.1.2](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.1.1...@merkle-open/ts-config@1.1.2) (2026-02-09)

**Note:** Version bump only for package @merkle-open/ts-config

## [1.1.1](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.1.0...@merkle-open/ts-config@1.1.1) (2024-07-23)

**Note:** Version bump only for package @merkle-open/ts-config

# [1.1.0](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.0.1...@merkle-open/ts-config@1.1.0) (2023-04-08)

### Features

- **ts-config:** add support for TypeScript 5 ([74047b6](https://github.com/merkle-open/frontend-defaults/commit/74047b68d2239594d42317b5d6894577ed734476))

## [1.0.1](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.0.0...@merkle-open/ts-config@1.0.1) (2023-02-18)

**Note:** Version bump only for package @merkle-open/ts-config

# 1.0.0 (2022-11-22)

**Note:** Inital release
