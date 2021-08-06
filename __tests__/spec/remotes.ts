import {remotes} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('remotes test', () => {
  test('default', async () => {
    const remote = await remotes();

    if (isCI) {
      expect(remote).toStrictEqual({
        origin: {
          fetch: 'https://github.com/tkskto/git-log-nodejs',
          push: 'https://github.com/tkskto/git-log-nodejs',
        },
      });
    } else {
      expect(remote).toStrictEqual({
        origin: {
          fetch: 'https://github.com/tkskto/git-log-nodejs.git',
          push: 'https://github.com/tkskto/git-log-nodejs.git',
        },
      });
    }
  });
});
