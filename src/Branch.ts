import {Branches} from 'git-log-nodejs';
import {getBranch} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {REGEXP_END_OF_LINE} from './Defaults';

export const branches = async (withRemote = true): Promise<Branches> => {
  try {
    const local: string = await getBranch(false);
    const lines: string[] = local.split(REGEXP_END_OF_LINE).map((name) => name.replace('* ', '').trim());
    const result: Branches = {
      local: lines,
    };

    if (withRemote) {
      const remote: string = await getBranch(true);
      const lines: string[] = remote.replace(local,'').split(REGEXP_END_OF_LINE);
      const remotes: Record<string, string[]> = {};

      lines.forEach((branch: string) => {
        if (branch.includes('HEAD -> ')) {
          return;
        }

        const [remote, ...name] = branch.replace('remotes/', '').trim().split(/\//);

        if (!Object.prototype.hasOwnProperty.call(remotes, remote)) {
          remotes[remote] = [];
        }

        remotes[remote].push(name.join('/'));
      });

      result.remote = remotes;
    }

    return result;
  } catch (err) {
    throw new Error(makeErrorMessage('authors in Author.ts', err.message));
  }
};
