import {Tag} from 'git-log-nodejs';
import {makeErrorMessage} from './ErrorLogFactory';
import {getTag} from './Execs';
import {REGEXP_END_OF_LINE} from './Defaults';

export const tags = async (): Promise<Tag[]> => {
  try {
    const logs: string = await getTag();

    if (!logs.trim()) {
      return [];
    }

    return logs.trim().split(REGEXP_END_OF_LINE).map((log) => {
      const [hash, tag] = log.split(' ');

      return {
        hash,
        name: tag.replace('refs/tags/', ''),
      };
    });
  } catch (err) {
    throw new Error(makeErrorMessage('tags in Tag.ts', err));
  }
};
