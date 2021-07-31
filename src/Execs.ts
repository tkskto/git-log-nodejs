import LogOption = gitLog.LogOption;
import {spawn} from 'child_process';

const commonFunction = (command: string, option = ['']): Promise<string> => {
  return new Promise((resolve, reject) => {
    let result = '';
    const options = [command, ...option];

    console.log(`\u001b[32m command:\u001b[37m git ${options.join(' ')}`);

    const childProcess = spawn('git', options);

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
}

export const getLog = ({count, withFile, branch}: LogOption): Promise<string> => {
  const option = makeOption(
    branch ? branch : '',
    `--max-count=${count}`,
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
    `--pretty=format:{"author":{"name":"%an","email":"%ae"},"hash":"%H","date":"%at","parent":"%P"}`, // do not include space in format
  );
  return commonFunction('log', option);
};

export const getConfig = (): Promise<string> => {
  return commonFunction('config', ['--list']);
};

export const getLogWithAuthor = (usernames: string[]): Promise<string> => {
  return commonFunction('log', [`--author="${usernames.join('|')}"`]);
}

export const getLogWithFunctionNameInFile = (functionsName: string, fileName: string): Promise<string> => {
  return commonFunction('log', [`-L:${functionsName}:${fileName}`]);
}
