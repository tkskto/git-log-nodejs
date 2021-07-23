import {spawn} from 'child_process';

const commonFunction = (command: string, option = ['']): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result = '';
    const childProcess = spawn('git', [command, ...option]);

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
        reject(`something went wrong with command: git ${[command, ...option].join(' ')}`);
      }
    });
  });
};

export const getLog = (count: number): Promise<string> => {
  return commonFunction('log', [
    `--max-count=${count}`,
    /**
     * do not include body.
     * format:
     * {
     *   committer: {
     *     name: string,
     *     email: string,
     *   },
     *   hash: string,
     *   date: string,
     * }
     */
    `--pretty=format:{"author":{"name":"%an","email":"%ae"},"hash":"%H","date":"%at","parent":"%P"}`, // do not include space in format
  ]);
};

export const getConfig = (): Promise<string> => {
  return commonFunction('config', ['--list']);
};
