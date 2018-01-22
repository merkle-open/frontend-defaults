## Commitizen

### Setup

For a lerna project read this [commitizen-config-lerna-scope](./commitizen-config-lerna-scope).

1. First, install the Commitizen cli tools:
```
npm i -D commitizen
```
2. Install the `commitizen` adapter [`cz-conventional-changelog`](https://www.npmjs.com/package/cz-conventional-changelog)
```
npm i -D cz-conventional-changelog
```
3. Add config in package.json
```json
...
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```
4. Add some nice npm run scripts in your package.json pointing to the local version of commitizen:
```json
  ...
  "scripts": {
    "c": "git-cz"
  }
```
5. Add the Commitizen-friendly badge to your README using the following markdown:
```
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
```

> **NOTE:** if you are using `precommit` hooks thanks to something like `husky`, you will need to name your script some thing other than "commit" (e.g. "c": "git-cz"). The reason is because npm-scripts has a "feature" where it automatically runs scripts with the name *prexxx* where *xxx* is the name of another script. In essence, npm and husky will run "precommit" scripts twice if you name the script "commit," and the work around is to prevent the npm-triggered *precommit* script.
