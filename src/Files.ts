import {File, FileStat, FileStatus} from 'git-log-nodejs';
import {getFileStat} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {REGEXP_END_OF_LINE} from './Defaults';

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

export const statOfFiles = async (version1: string, version2: string): Promise<FileStat[]> => {
  try {
    const logs: string = await getFileStat(version1, version2);

    return logs.split(REGEXP_END_OF_LINE).filter(log => log.trim()).map((log) => {
      const [numberOfAddedLine, numberOfDeletedLine, fileName] = log.split(/\s+/);

      return {
        fileName,
        numberOfAddedLine: Number(numberOfAddedLine),
        numberOfDeletedLine: Number(numberOfDeletedLine),
      };
    });
  } catch (err) {
    throw new Error(makeErrorMessage('statOfFiles in Files.ts', err.message));
  }
};
