import {convertConfigToJSON} from '../../src/Config';
import assert from 'assert';

describe('Config', () => {
  it('git config --list', async () => {
    const configList = `credential.helper=osxkeychain
user.name=tkskto
user.email=tkskto@gmail.com
core.excludesfile=/Users/tkskto/.gitignore_grobal
core.repositoryformatversion=0
core.filemode=true
core.bare=false
core.logallrefupdates=true
core.ignorecase=true
core.precomposeunicode=true
remote.origin.url=https://github.com/tkskto/git-log-nodejs.git
remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
branch.main.remote=origin
branch.main.merge=refs/heads/main`.split('\n');
    const config = await convertConfigToJSON(configList);

    assert.deepStrictEqual(config, {
      credential: { helper: 'osxkeychain' },
      user: { name: 'tkskto', email: 'tkskto@gmail.com' },
      core: {
        excludesfile: '/Users/tkskto/.gitignore_grobal',
        repositoryformatversion: '0',
        filemode: 'true',
        bare: 'false',
        logallrefupdates: 'true',
        ignorecase: 'true',
        precomposeunicode: 'true'
      },
      remote: { origin: { url: 'https://github.com/tkskto/git-log-nodejs.git', fetch: '+refs/heads/*:refs/remotes/origin/*' } },
      branch: { main: { remote: 'origin', merge: 'refs/heads/main'} }
    });
  });
});
