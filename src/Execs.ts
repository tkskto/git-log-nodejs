import {DiffOption, LogOption} from 'git-log-nodejs';
import {spawn} from 'child_process';
import {DEFAULT_TIMEOUT_MILLISECONDS} from './Defaults';

const commonFunction = (command: string, option = ['']): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result = '';
    const options = [command, ...option];

    options.push('--date=iso-local');
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
        resolve(result.trim().replaceAll('\\', ' '));
      } else if (result === '') {
        // if result is void
        resolve('');
      } else {
        reject(`something went wrong with command: git ${options.join(' ')}`);
      }
    });
  });
};

const makeOption = (...params: string[]): string[] => {
  return params.filter((item) => item); // filtering false
};

const makeCommitOption = (count: number, withFile: boolean, branch: string): string[] => {
  return makeOption(
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
    '--pretty=format:{"author":{"name":"%an","email":"%ae"},"hash":"%H","date":"%aI","parent":"%P"}', // do not include space in format
  );
};

export const getCommits = ({count, withFile, branch}: LogOption): Promise<string> => {
  const option = makeCommitOption(count, withFile, branch);

  return commonFunction('log', option);
};

export const getCommitOfFile = (filename: string, {count, withFile, branch}: LogOption): Promise<string> => {
  const option = makeCommitOption(count, withFile, branch);

  return commonFunction('log', [...option, '--', filename]);
};

export const getCommitOfHash = (hash: string, {count, withFile, branch}: LogOption): Promise<string> => {
  const option = makeCommitOption(count, withFile, branch);

  return commonFunction('show', [...option, hash]);
};

export const getAuthor = ({branch}: LogOption): Promise<string> => {
  const option = makeOption(
    // branch name is required. See <https://git-scm.com/docs/git-shortlog> description.
    branch ? branch : 'HEAD',
    // this includes summary and emails
    '-se',
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

export const getFileStatus = (): Promise<string> => {
  return commonFunction('status', ['-s']);
};

export const getFileStat = (version1: string, version2: string): Promise<string> => {
  return commonFunction('log', ['--numstat', '--no-merges', '--pretty=', `${version1}..${version2}`]);
};

export const getTag = (): Promise<string> => {
  return commonFunction('show-ref', ['--tags']);
};

export const getDiffBetweenCommits = (hash1: string, hash2: string, config: DiffOption): Promise<string> => {
  const option = makeOption(
    config.nameOnly ? '--name-only' : '',
  );
  return commonFunction('diff', [`${hash1}..${hash2}`, ...option]);
};

export const getDiffFromCommits = (hash: string, count: number, config: DiffOption): Promise<string> => {
  const option = makeOption(
    config.nameOnly ? '--name-only' : '',
  );
  return commonFunction('diff', [`${hash}~${Math.abs(count)}`, ...option]);
};
