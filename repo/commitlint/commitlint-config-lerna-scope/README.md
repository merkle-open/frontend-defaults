## Commitlint for lerna

### Setup

1. First, install the Commitlint cli tools:
```
npm i -D @commitlint/cli
```

2. Install husky git hooks
```
npm i -D husky
```

3. Install the Namics `commitlint conventional` config
```
npm i -D @namics/commitlint-config-conventional
```

4. Install the Namics `commitlint lerna` config
```
npm i -D @namics/commitlint-config-lerna-scope
```

5. Add config in package.json
```json
...
  "commitlint": {
    "extends": [
      "@namics/frontend-defaults/repo/commitlint-config-conventional",
      "@namics/frontend-defaults/repo/commitlint-config-lerna-scopes"
  ]
},
```

6. Add some nice npm run scripts in your package.json pointing to the local version of commitizen:
```json
  ...
  "scripts": {
    "commitmsg": "commitlint -e $GIT_PARAMS"
  }
```
