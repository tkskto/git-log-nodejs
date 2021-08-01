import {branches} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('branch test', () => {
  test('local', async () => {
    const branch = await branches(false);

    if (isCI) {
      expect(branch.local.length).toStrictEqual(1);
      expect(branch.remote).toBeUndefined();
    } else {
      // TODO: it must be failed.
      expect(branch).toStrictEqual({
        local: [
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
      // TODO: it must be failed.
      expect(branch).toStrictEqual({
        local: [
          'main'
        ],
        remote: {
          origin: [ 'main' ],
        },
      });
    }
  });
});
