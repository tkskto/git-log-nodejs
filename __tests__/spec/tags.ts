import {tags} from '../../src';

const isCI = process.argv[2] === '--ci';

describe('tags test', () => {
  test('default', async () => {
    const tag = await tags();

    if (isCI) {
      expect(tag).toStrictEqual([]);
    } else {
      expect(tag).toContainEqual({ hash: '24c2a9e90836d3eb13693099568408dca476b5cc', name: 'v0.1.0' });
      expect(tag).toContainEqual({ hash: 'ca0c3b48f237d820b0cc9ef87bbed16de2a1cf5f', name: 'v0.1.1' });
      expect(tag).toContainEqual({ hash: '41348ee32aadb9405f1555cbdae2ac3fdb8595b8', name: 'v0.2.0' });
      expect(tag).toContainEqual({ hash: '81c1d84d22d4d0b3ace5c1652d8ba37b8bcb2844', name: 'v0.3.0' });
      expect(tag).toContainEqual({ hash: 'fa5acd4263a4a527557414764f4f823464a8f509', name: 'v0.3.1' });
    }
  });
});
