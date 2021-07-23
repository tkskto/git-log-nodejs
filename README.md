# git-log-nodejs

git-log-nodejs is a tool to get git logs.

This call [Git](https://git-scm.com/) commands inside and parse the result to be easy to control with JavaScript.

## Usage

you must install Git and add it to environment PATH.

```
npm i git-log-nodejs
```

```javascript
import {commits} from 'git-log-nodejs';

const commitList = await commits(); // to get commit
```

## API

See the [types](./types/index.d.ts) for details.

### remotes()

Get remote info.

### commits()

Get commit info.

### authors()

Get author info.

### committers()

get committer info.

### branches()

Get branch info.

### tags()

Get tag info.

### configs()

Get config info.
