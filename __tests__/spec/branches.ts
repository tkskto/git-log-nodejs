import {branches} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('branch test', () => {
  test('local', async () => {
    const branch = await branches(false);

    if (isCI) {
      expect(branch).toStrictEqual({
        local: [ 'main' ],
      });
    } else {
      expect(branch).toStrictEqual({
        local: [
          'feature/add-branches',
          'feature/add-remote-details',
          'main'
        ],
      });
    }
  });

  test('remote', async () => {
    const branch = await branches(true);

    if (isCI) {
      expect(branch).toStrictEqual({
        local: [ 'main' ],
        remote: {
          origin: [ 'main' ],
        },
      });
    } else {
      expect(branch).toStrictEqual({
        local: [
          'feature/add-branches',
          'feature/add-remote-details',
          'main'
        ],
        remote: {
          origin: [ 'main' ],
        },
      });
    }
  });
});
