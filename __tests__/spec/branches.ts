import {branches} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('branch test', () => {
  test('local', async () => {
    const branch = await branches(false);

    if (isCI) {
      expect(branch.local.length).toStrictEqual(1);
      expect(branch.remote).toBeUndefined();
    } else {
      expect(branch).toStrictEqual({
        local: [
          'feature/add-branches',
          'feature/add-remote-details',
          'main'
        ],
      });
      expect(branch.remote).toBeUndefined();
    }
  });

  test('remote', async () => {
    const branch = await branches(true);

    if (isCI) {
      expect(branch.local.length).toStrictEqual(1);
      if (branch.remote && branch.remote.pull) {
        expect(branch.remote.pull.length).toStrictEqual(1);
      }
    } else {
      expect(branch).toStrictEqual({
        local: [
          'feature/add-branches',
          'feature/add-remote-details',
          'main'
        ],
        remote: {
          origin: [ 'feature/add-branches', 'main' ],
        },
      });
    }
  });
});
