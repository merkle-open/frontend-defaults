# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

> Current release: `2.0.0`. See [MIGRATION.md](https://github.com/merkle-open/frontend-defaults/blob/%40merkle-open/ts-config%402.0.0/codequality/ts-config/MIGRATION.md) for the v1 → v2 upgrade guide.

## [2.0.0](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@2.0.0-alpha.4...@merkle-open/ts-config@2.0.0) (2026-08-11)

### Notes

- Promoted the v2 alpha line to the final stable `2.0.0` release.
- Finalized README/MIGRATION/CHANGELOG versioned links for the stable release tag.

## [2.0.0-alpha.4](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@2.0.0-alpha.3...@merkle-open/ts-config@2.0.0-alpha.4) (2026-08-06)

### Fixes

- Removed redundant "What changed in v2" block from README to avoid duplication with changelog/migration docs.

## [2.0.0-alpha.3](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@2.0.0-alpha.2...@merkle-open/ts-config@2.0.0-alpha.3) (2026-08-06)

### Fixes

- Updated README and migration/changelog links to use versioned GitHub URLs so npm package pages resolve correctly.

## [2.0.0-alpha.2](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@2.0.0-alpha.1...@merkle-open/ts-config@2.0.0-alpha.2) (2026-08-06)

### ⚠ BREAKING CHANGES

- Removed `jsx: "react-jsx"` from the generic `browser` variant
- Added `browser-react` as the opt-in React-specific browser variant
- Removed `types: ["node"]` from the generic `browser` variant

### Features

- Added `tsconfig.browser-react.json`
- Added package export for `./browser-react`
- Updated README and migration guide for generic browser vs React browser usage

## [2.0.0-alpha.1](https://github.com/merkle-open/frontend-defaults/compare/@merkle-open/ts-config@1.1.2...@merkle-open/ts-config@2.0.0-alpha.1) (2026-07-03)

### ⚠ BREAKING CHANGES

- Upgraded peer dependency to `typescript ^6.0.0`
- Replaced single `tsconfig.json` with variant-based exports:
  - `@merkle-open/ts-config/node`
  - `@merkle-open/ts-config/browser`
- Updated base target from `es5` to `es2025`
- Removed default legacy decorator flags (`experimentalDecorators`, `emitDecoratorMetadata`)
- Raised Node.js engine requirement to `^20.19.0 || ^22.13.0 || >=24`

### Features

- Added `tsconfig.base.json`, `tsconfig.node.json`, and `tsconfig.browser.json`
- Added package exports for `.`, `./node`, and `./browser`
- Updated browser defaults to modern settings:
  - `module: "preserve"`
  - `moduleResolution: "bundler"`
  - `jsx: "react-jsx"`
- Updated node defaults to modern settings:
  - `module: "nodenext"`
  - `moduleResolution: "nodenext"`

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
