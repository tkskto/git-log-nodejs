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

See the [types](./types/index.d.ts) for details.

### Author

#### `Author.name`: string

#### `Author.email`: string

#### `Author.commitCount`: number

### Branches

#### branches.local: string[]

Get the list of local.

#### branches.remote: Record<string, string[]>

Get the list of branches along with the remote name.

### Commit

#### `Commit.author`: [Pick<Author, 'email' | 'name'>](#Author)

#### `Commit.hash`: string

#### `Commit.date`: number

#### `Commit.parent`: string[]

Hash of the parent commit. The merge commit has two parents.

#### `Commit.files`: [File](#File)[]

The list of files included in this commit.

### File

#### `File.type`: 'added' | 'deleted' | 'ignored' | 'modified' | 'renamed' | 'unmodified' | 'untracked'

#### `File.fileName`: string

### Remote

Type of `Remote` is `Record<string, { fetch: string, push: string }>`. `Record` is one of the [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)

#### `Remote.origin.fetch`: string

`origin` is remoteName. It depends on your settings.

#### `Remote.origin.push`: string

`origin` is remoteName. It depends on your settings.

### Tag

#### `Tag.name`: string

#### `Tag.hash`: string

## Functions

See the [types](./types/index.d.ts) for details.

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

### branches()

Get branch info with `git branch` command.

#### Since

0.3.0

#### Arguments

* withRemote

##### withRemote: boolean

To get remote info, set it `true`. default is `true`.

#### Returns

*   [Branches](#Branches)

### commits()

Get commit info with `git log` command.

#### Since

0.1.0

#### Arguments

* `logOption`

##### `logOption.count`: number

How many log to get. default is `1000`. `0` is no limit.

##### `logOption.withFile`: boolean

Whether to get file name. default is `false`.

##### `logOption.branch`: string

Filtering logs with branch name. default is `''`.

#### Returns

*   [Commit](#Commit)

### config()

Get config info with `git config --list`.

#### Since

0.1.0

#### Arguments

*   nothing

#### Returns

*   Config: object

Depends on your settings. See [git-config Documentation](https://git-scm.com/docs/git-config).

### remotes()

Get remote info with `git remote -v` command.

#### Since

0.2.0

#### Arguments

*   nothing

#### Returns

*   [Remote](#Remote)

### status()

Get the list of changed file with `git status -s` command.

#### Since

0.5.0

#### Arguments

*   nothing

#### Returns

*   [File](#File)

### tags()

Get tag info with `git show-ref --tags` command.

#### Since

0.4.0

#### Arguments

*   nothing

#### Returns

*   [Tag](#Tag)
