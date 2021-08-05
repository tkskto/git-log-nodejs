import {branches} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('branches test', () => {
  test('local', async () => {
    const branch = await branches(false);

    if (isCI) {
      expect(branch.local.length).toBe(1);
      expect(branch.remote).toBeUndefined();
    } else {
      expect(branch.local.includes('main')).toBeTruthy();
      expect(branch.remote).toBeUndefined();
    }
  });

  test('remote', async () => {
    const branch = await branches(true);

    if (isCI) {
      expect(branch.local.length).toBe(1);
      if (branch.remote && branch.remote.pull) {
        expect(branch.remote.pull.length).toBe(1);
      }
    } else {
      expect(branch.local.includes('main')).toBeTruthy();

      if (branch.remote) {
        expect(branch.remote.hasOwnProperty('origin')).toBeTruthy();
        expect(branch.remote.origin.includes('main')).toBeTruthy();
      }
    }
  });
});
