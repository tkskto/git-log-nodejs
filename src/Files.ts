import {File, FileStatus} from 'git-log-nodejs';

/**
 * @param {string[]} files the string must be like a {[A|M|D]\t{filename}}
 * @returns File[]
 */
export const parseFileData = (files: string[]): File[] => {
  return files.map((file: string) => {
    const [status, fileName]: string[] = file.trim().split(/\t|\s+/);
    let type: FileStatus = 'unmodified';

    if (status.includes('A')) {
      type = 'added';
    } else if (status.includes('D')) {
      type = 'deleted';
    } else if (status.includes('!')) {
      type = 'ignored';
    } else if (status.includes('M')) {
      type = 'modified';
    } else if (status.includes('R')) {
      type = 'renamed';
    } else if (status.includes('?')) {
      type = 'untracked';
    }

    return {
      type,
      fileName,
    };
  });
};
