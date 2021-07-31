# git-log-nodejs

git-log-nodejs is a tool to get git logs.

This call [Git™](https://git-scm.com/) commands inside and parse the result to be easy to control with JavaScript.

We are guessing use this to check git log info like a linting with JavaScript.

git-log-nodejs is published under GPL 2.0 license because also Git is published under GPL 2.0.

## Installation

You must install Git and add it to environment PATH.

Please install git-log-nodejs with `npm install`.

```
npm i git-log-nodejs
```

## Usage

```javascript
import {commits} from 'git-log-nodejs';

const commitList = await commits();
```

## Types

### Commit

#### `Commit.author`: [Author](#Author)

#### `Commit.hash`: string

#### `Commit.date`: number

#### `Commit.parent`: string[]

#### `Commit.files`: [File](#File)[]

### Author

#### `Author.name`: string

#### `Author.email`: string

#### `Author.commitCount`: number

### File

#### `File.type`: 'add' | 'modify' | 'delete'

#### `File.fileName`: string

## Functions

See the [types](./types/index.d.ts) for details.

### [WIP] remotes()

Get remote info.

### commits()

Get commit info with `git log` command.

#### Since

0.1.0

#### Arguments

* `logOption`

##### `logOption.count`: number

how many log to get. default is `1000`. `0` is no limit.

##### `logOption.withFile`: boolean

whether to get file name. default is `false`.

##### `logOption.branch`: string

filtering logs with branch name. default is `''`.

#### Returns

*   [Commit](#Commit)

### authors()

Get author info with `git shortlog` command.

#### Since

0.1.0

#### Arguments

* `logOption`

##### `logOption.branch`: string

filtering logs with branchName. default is `'HEAD'`.

#### Returns

*   [Author](#Author)

### [WIP] branches()

Get branch info.

### [WIP] tags()

Get tag info.

### config()

Get config info with `git config --list`.

#### Since

0.1.0

#### Arguments

*   nothing

#### Returns

*   Config: object

Depends on your settings. See [git-config Documentation](https://git-scm.com/docs/git-config).
