## Commitizen for lerna

### Setup

1. First, install the Commitizen cli tools:
```
npm i -D commitizen
```
2. Install the `commitizen` adapter [`cz-conventional-changelog`](https://www.npmjs.com/package/cz-conventional-changelog)
```
npm i -D cz-conventional-changelog
```
3. Install the `commitizen customizable` adapter [`cz-customizable`](https://www.npmjs.com/package/cz-customizable)
```
npm i -D cz-customizable
```
4. Install the Namics config
```
npm i -D @namics/frontend-defaults
```
5. Add config in package.json
```json
...
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./node_modules/@namics/commitizen-config-lerna-scope"
    }
  }
```
6. Add some nice npm run scripts in your package.json pointing to the local version of commitizen:
```json
  ...
  "scripts": {
    "c": "git-cz",
    "generate-changelog": "conventional-changelog -p atom -i CHANGELOG.md -s -r 0"
  }
```
7. Add the Commitizen-friendly badge to your README using the following markdown:
```
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
```

> **NOTE:** if you are using `precommit` hooks thanks to something like `husky`, you will need to name your script some thing other than "commit" (e.g. "c": "git-cz"). The reason is because npm-scripts has a "feature" where it automatically runs scripts with the name *prexxx* where *xxx* is the name of another script. In essence, npm and husky will run "precommit" scripts twice if you name the script "commit," and the work around is to prevent the npm-triggered *precommit* script.
