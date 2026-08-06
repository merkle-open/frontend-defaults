# `@merkle-open/ts-config` v1 → v2 Migration Guide

> Applies to projects moving from `@merkle-open/ts-config` 1.x to 2.0.0-alpha.4 and later.

## What changed

| Area | v1 | v2 |
|------|----|----|
| Package layout | single `tsconfig.json` | split configs: `node`, `browser`, and `browser-react` |
| Base target | `es5` | `es2025` |
| Node module system | legacy defaults | `module` / `moduleResolution: "nodenext"` |
| Browser module system | legacy defaults | `module: "preserve"` / `moduleResolution: "bundler"` |
| JSX | project-specific | `react-jsx` in `browser-react` only |
| Decorators | enabled by default | disabled by default |
| TypeScript peer | older range | `^6.0.0` |

## Choose the right variant

- Use `@merkle-open/ts-config/node` for Node.js apps, CLIs, scripts, and server code.
- Use `@merkle-open/ts-config/browser` for browser apps, libraries, and bundler-based builds that are not React-specific.
- Use `@merkle-open/ts-config/browser-react` for React browser apps.

## Update your config

### Node.js project

```json
{
  "extends": "@merkle-open/ts-config/node"
}
```

### Browser project

```json
{
  "extends": "@merkle-open/ts-config/browser"
}
```

### Browser React project

```json
{
  "extends": "@merkle-open/ts-config/browser-react"
}
```

## If you used the old single config

Replace your previous `extends` entry with the matching variant above.

If your project mixed Node and browser code, split the config by package or by `tsconfig` target.

If you previously depended on React JSX being enabled in `browser`, switch React projects to `browser-react`.

## TypeScript legacy decorators

Only projects that still rely on TypeScript's legacy decorator emit need this:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Common follow-up changes

- Update build tooling if it assumed `es5`.
- Review any custom `module` or `moduleResolution` overrides.
- Verify browser projects still use the `browser` variant.
- Verify Node projects still use the `node` variant.

## Troubleshooting

| Symptom | Likely fix |
|---------|------------|
| `Unknown compiler option` | Check that you are extending the correct variant and that your local TypeScript version is `^6.0.0`. |
| `Cannot use import statement outside a module` | Use the `node` variant for server code, or review your package/module settings. |
| Legacy decorator errors | Add `experimentalDecorators` and `emitDecoratorMetadata` in the consuming project. |
| React JSX errors after upgrade | Use `browser-react` instead of `browser` for React projects. |

## Release notes

See [CHANGELOG.md](https://github.com/merkle-open/frontend-defaults/blob/%40merkle-open/ts-config%402.0.0-alpha.4/codequality/ts-config/CHANGELOG.md) for the exact breaking changes in `2.0.0-alpha.4`.
