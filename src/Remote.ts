import {Remote} from 'git-log-nodejs';
import {getRemote} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {REGEXP_END_OF_LINE} from './Defaults';

export const remotes = async (): Promise<Remote> => {
  try {
    const logs: string = await getRemote();
    const lines: string[] = logs.trim().split(REGEXP_END_OF_LINE);
    const results: Remote = {};

    for (let i = 0, len = lines.length; i < len; i++) {
      const [name, url] = lines[i].split(/\t/g);

      if (!Object.prototype.hasOwnProperty.call(results, name)) {
        results[name] = {
          fetch: '',
          push: '',
        };
      }

      if (url.includes('(fetch)')) {
        results[name] = {
          fetch: url.replace('(fetch)', '').trim(),
          push: results[name].push,
        };
      } else if (url.includes('(push)')) {
        results[name] = {
          fetch: results[name].fetch,
          push: url.replace('(push)', '').trim(),
        };
      }
    }

    return results;
  } catch (err) {
    throw new Error(makeErrorMessage('remotes in Remote.ts', err.message));
  }
};
