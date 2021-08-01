import {Branches} from 'git-log-nodejs';
import {getBranch} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';

export const branches = async (withRemote = true): Promise<Branches> => {
  try {
    const local: string = await getBranch(false);
    const lines: string[] = local.split(/\n|\r\n/g).map((name) => name.replace('* ', '').trim());
    const result: Branches = {
      local: lines,
    };

    if (withRemote) {
      const remote: string = await getBranch(true);
      const lines: string[] = remote.replace(local,'').split(/\n|\r\n/g);
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
