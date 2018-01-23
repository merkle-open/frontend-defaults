## Commitlint

### Setup

For a lerna project read this [commitlint-config-lerna-scope](./commitlint-config-lerna-scope).

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
npm i -D @namics/frontend-defaults
```

4. Add config in package.json
```json
...
  "commitlint": {
    "extends": [
      "@namics/frontend-defaults/repo/commitlint-config-conventional"
  ]
},
```

5. Add some nice npm run scripts in your package.json pointing to the local version of commitizen:
```json
  ...
  "scripts": {
    "commitmsg": "commitlint -e $GIT_PARAMS"
  }
```
