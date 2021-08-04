import {Tag} from 'git-log-nodejs';
import {makeErrorMessage} from './ErrorLogFactory';
import {getTag} from './Execs';

export const tags = async (): Promise<Tag[]> => {
  try {
    const logs: string = await getTag();

    return logs.trim().split(/\n|\r\n/g).map((log) => {
      const [hash, tag] = log.split(' ');

      return {
        hash,
        name: tag.replace('refs/tags/', ''),
      };
    });
  } catch (err) {
    throw new Error(makeErrorMessage('tags in Tag.ts', err.message));
  }
};
