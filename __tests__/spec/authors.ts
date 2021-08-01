import {authors} from '../../src';
import {DEFAULT_AUTHOR_OPTION} from '../../src/Defaults';

const isCI = process.argv[2] === '--ci';

describe('authors test', () => {
  test('default', async () => {
    const authorData = await authors(DEFAULT_AUTHOR_OPTION);

    if (isCI) {
      expect(authorData).toStrictEqual([
        {name: 'kato takeshi', email: 'tkskto@gmail.com', commitCount: 1},
      ]);
    } else {
      expect(authorData).toStrictEqual([
        {name: 'kato takeshi', email: 'tkskto@gmail.com', commitCount: 1},
        {name: 'tkskto', email: 'tkskto@gmail.com', commitCount: authorData[1].commitCount}, // TODO
      ]);
    }
  });
});
