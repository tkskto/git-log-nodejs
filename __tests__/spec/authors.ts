import {authors} from '../../src';
import {DEFAULT_AUTHOR_OPTION} from '../../src/Defaults';

const isCI = process.argv[2] === '--ci';

describe('authors test', () => {
  test('default', async () => {
    const authorData = await authors(DEFAULT_AUTHOR_OPTION);

    if (isCI) {
      expect(authorData[0].commitCount).toBe(1);
      expect(authorData[0].hasOwnProperty('name')).toBeTruthy();
      expect(authorData[0].hasOwnProperty('email')).toBeTruthy();
    } else {
      expect(authorData).toStrictEqual([
        {name: 'Renovate Bot', email: 'bot@renovateapp.com', commitCount: authorData[0].commitCount},
        {name: 'kato takeshi', email: 'tkskto@gmail.com', commitCount: authorData[1].commitCount},
        {name: 'tkskto', email: 'tkskto@gmail.com', commitCount: authorData[2].commitCount},
      ]);
    }
  });
});
