import {status} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('status test', () => {
  test('default', async () => {
    const state = await status();

    if (isCI) {
      expect(state).toStrictEqual([]);
    } else {
      expect(state).toStrictEqual([]);
    }
  });
});
