import {remotes} from '../../src';

describe('authors test', () => {
  test('default', async () => {
    const remote = await remotes();

    expect(remote).toStrictEqual({
      origin: {
        fetch: 'https://github.com/tkskto/git-log-nodejs.git',
        push: 'https://github.com/tkskto/git-log-nodejs.git',
      },
    });
  });
});
