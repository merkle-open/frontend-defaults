# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.2](https://github.com/namics/frontend-defaults/compare/@namics/frontend-defaults-cli@0.2.1...@namics/frontend-defaults-cli@0.2.2) (2019-05-19)

**Note:** Version bump only for package @namics/frontend-defaults-cli





## [0.2.1](https://github.com/namics/frontend-defaults/compare/@namics/frontend-defaults-cli@0.2.0...@namics/frontend-defaults-cli@0.2.1) (2019-04-30)


### Bug Fixes

* **cli:** update namics eslint config and update dependencies ([6ae0ef9](https://github.com/namics/frontend-defaults/commit/6ae0ef9))





# 0.2.0 (2019-04-29)


### Bug Fixes

* **cli:** --es option should not be needed for --eslint ([f1e5854](https://github.com/namics/frontend-defaults/commit/f1e5854))


### Features

* add typescript-eslint and remove tslint ([0a1acc1](https://github.com/namics/frontend-defaults/commit/0a1acc1))
* **cli:** use --eslint --ts for typescript-eslint ([8d09dc5](https://github.com/namics/frontend-defaults/commit/8d09dc5))



# 0.1.1 (2019-04-12)


### Bug Fixes

* **cli:** add npm-run-all if linters exist and optimize typings ([e9c98fa](https://github.com/namics/frontend-defaults/commit/e9c98fa))
* **cli:** babel polyfill as dependency and core-js just for ts ([6e41fe7](https://github.com/namics/frontend-defaults/commit/6e41fe7))
* **cli:** execution of eslint and tslint should succeed ([7f87243](https://github.com/namics/frontend-defaults/commit/7f87243))
* **cli:** prettier not written by using inquirer ([7dbef56](https://github.com/namics/frontend-defaults/commit/7dbef56))
* **cli:** prevent uncatched promises while stop execution ([250bfb2](https://github.com/namics/frontend-defaults/commit/250bfb2))
* **cli:** rename '.gitignore' template file to 'gitignore' ([cdd1632](https://github.com/namics/frontend-defaults/commit/cdd1632))
* **cli:** replace console.log with document.write in webpack template ([19f21f5](https://github.com/namics/frontend-defaults/commit/19f21f5))
* **cli:** tslint without prettier shouldn't add tslint-config-prettier ([b5e1b76](https://github.com/namics/frontend-defaults/commit/b5e1b76))
* **cli:** use 'babel.conifg.js' and add babel only in es mode ([1c795d2](https://github.com/namics/frontend-defaults/commit/1c795d2)), closes [#10](https://github.com/namics/frontend-defaults/issues/10)
* **cli:** use correct pathname for git exist check ([c9b9b9a](https://github.com/namics/frontend-defaults/commit/c9b9b9a))
* **cli:** use git status for git exist check ([d3d6c87](https://github.com/namics/frontend-defaults/commit/d3d6c87))
* **cli:** use require instead of readFile for fetch package.json ([255364d](https://github.com/namics/frontend-defaults/commit/255364d))


### Features

* **cli:** add `rebuild node-sass` script to package.json in webpack enabled mode ([c667ba1](https://github.com/namics/frontend-defaults/commit/c667ba1))
* **cli:** add api and cwd option ([ef7eb38](https://github.com/namics/frontend-defaults/commit/ef7eb38))
* **cli:** add babel plugins for dynamic-import and decorators ([ec6847d](https://github.com/namics/frontend-defaults/commit/ec6847d))
* **cli:** add babelrc and nvmrc ([66cb536](https://github.com/namics/frontend-defaults/commit/66cb536))
* **cli:** add build option and add preset option ([5c2cd62](https://github.com/namics/frontend-defaults/commit/5c2cd62))
* **cli:** add cli package ([acef848](https://github.com/namics/frontend-defaults/commit/acef848))
* **cli:** add dryRun and write files in separate process ([0120b0c](https://github.com/namics/frontend-defaults/commit/0120b0c))
* **cli:** add dynamic-import example ([6219dd9](https://github.com/namics/frontend-defaults/commit/6219dd9))
* **cli:** add exclude directories to tsconfig template ([4271085](https://github.com/namics/frontend-defaults/commit/4271085))
* **cli:** add license option ([753cefc](https://github.com/namics/frontend-defaults/commit/753cefc))
* **cli:** add open-source specific readme template ([1aad069](https://github.com/namics/frontend-defaults/commit/1aad069))
* **cli:** add polyfill for ts and update dependencies ([8783d8a](https://github.com/namics/frontend-defaults/commit/8783d8a))
* **cli:** add readme option ([333843e](https://github.com/namics/frontend-defaults/commit/333843e))
* **cli:** add release script and update dependencies ([90d9c03](https://github.com/namics/frontend-defaults/commit/90d9c03))
* **cli:** add update script and update dependencies ([9d09b24](https://github.com/namics/frontend-defaults/commit/9d09b24))
* **cli:** allow to enter a project-name which will create a new directory ([a10290d](https://github.com/namics/frontend-defaults/commit/a10290d))
* **cli:** define show diff prompt default value as false ([5249df1](https://github.com/namics/frontend-defaults/commit/5249df1))
* **cli:** execute git init in case of git don't exist yet ([52ce595](https://github.com/namics/frontend-defaults/commit/52ce595))
* **cli:** prefill package.json enquirer snippet ([3f61d8c](https://github.com/namics/frontend-defaults/commit/3f61d8c))
* **cli:** prompt and options for open or closed source license ([ae62c8c](https://github.com/namics/frontend-defaults/commit/ae62c8c))
* **cli:** update dependencies ([0877380](https://github.com/namics/frontend-defaults/commit/0877380))
* **cli:** update dependencies ([f59b182](https://github.com/namics/frontend-defaults/commit/f59b182))
* **cli:** use node LTS version in node-version file ([9cc6897](https://github.com/namics/frontend-defaults/commit/9cc6897))
* **ts-config:** add skipLibCheck option ([0bef644](https://github.com/namics/frontend-defaults/commit/0bef644))
