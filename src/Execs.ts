import {LogOption} from 'git-log-nodejs';
import {spawn} from 'child_process';
import {DEFAULT_TIMEOUT_MILLISECONDS} from './Defaults';

const commonFunction = (command: string, option = ['']): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result = '';
    const options = [command, ...option];

    // console.log(`\u001b[32m command:\u001b[37m git ${options.join(' ')}`);

    const childProcess = spawn('git', options, {timeout: DEFAULT_TIMEOUT_MILLISECONDS});

    childProcess.stdout.on('data', (chunk) => {
      result += chunk;
    });

    childProcess.stderr.on('data', (data) => {
      reject(data);
    });

    childProcess.on('close', (code) => {
      if (0 === code) {
        resolve(result.trim());
      } else {
        reject(`something went wrong with command: git ${options.join(' ')}`);
      }
    });
  });
};

const makeOption = (...params: string[]): string[] => {
  return params.filter((item) => item); // filtering false
};

export const getCommits = ({count, withFile, branch}: LogOption): Promise<string> => {
  const option = makeOption(
    branch ? branch : '',
    count > 0 ? `--max-count=${count}` : '',
    withFile ? '--name-status' : '',
    /**
     * do not include body.
     * format:
     * {
     *   author: {
     *     name: string,
     *     email: string,
     *   },
     *   hash: string,
     *   date: string,
     *   parent: string,
     * }
     */
    '--pretty=format:{"author":{"name":"%an","email":"%ae"},"hash":"%H","date":"%at","parent":"%P"}', // do not include space in format
  );
  return commonFunction('log', option);
};

export const getAuthor = ({branch}: LogOption): Promise<string> => {
  const option = makeOption(
    // branch name is required. See <https://git-scm.com/docs/git-shortlog> description.
    branch ? branch : 'HEAD',
    // this is include summary and emails
    '-se'
  );
  return commonFunction('shortlog', option);
};

export const getBranch = (withRemote: boolean): Promise<string> => {
  const option = makeOption(
    '--list',
    withRemote ? '-r' : '',
  );
  return commonFunction('branch', option);
};

export const getConfig = (): Promise<string> => {
  return commonFunction('config', ['--list']);
};

export const getRemote = (): Promise<string> => {
  return commonFunction('remote', ['-v']);
};

export const getTag = (): Promise<string> => {
  return commonFunction('show-ref', ['--tags']);
};
