import LogOption = gitLog.LogOption;
import {commits} from '../../src';
import {DEFAULT_LOG_OPTION} from '../../src/Defaults';

describe('commits test', () => {
  test('default', async () => {
    const logs = await commits(DEFAULT_LOG_OPTION);
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
    const option: LogOption = {...DEFAULT_LOG_OPTION};

    option.withFile = true;

    const logs = await commits(option);
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

  test('HEAD branch', async () => {
    const option: LogOption = {...DEFAULT_LOG_OPTION};

    option.branch = 'HEAD';

    const logs = await commits(option);
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
});
