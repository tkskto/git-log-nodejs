import {commits} from '../../src';

describe('commits __tests__', () => {
  test('default', async () => {
    const logs = await commits({count: 1000, withFile: false});
    const first = logs[logs.length - 1];

    expect(first).toStrictEqual({
      hash: 'f366fdf4e095ee08d733b54a1dc3eff81f3f075f',
      author: {
        "email": "tkskto@gmail.com",
        "name": "kato takeshi",
      },
      date: '1627013540',
      parent: "",
    });
  });

  test('withFile', async () => {
    const logs = await commits({count: 1000, withFile: true});
    const first = logs[logs.length - 1];

    expect(first).toStrictEqual({
      hash: 'f366fdf4e095ee08d733b54a1dc3eff81f3f075f',
      author: {
        "email": "tkskto@gmail.com",
        "name": "kato takeshi",
      },
      date: '1627013540',
      parent: "",
      files: [
        {
          fileName: "LICENSE",
          type: "add",
        },
        {
          fileName: "README.md",
          type: "add",
        },
      ]
    });
  });
});
