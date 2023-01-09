import {File} from 'git-log-nodejs';
import {getFileStatus} from './Execs';
import {parseFileData} from './Files';
import {makeErrorMessage} from './ErrorLogFactory';
import {END_OF_LINE} from './Defaults';

export const status = async (): Promise<File[]> => {
  try {
    const result = await getFileStatus();

    if (!result) {
      return [];
    }

    const files = result.trim().split(END_OF_LINE);

    return parseFileData(files);
  } catch (err) {
    throw new Error(makeErrorMessage('stages in Stages.ts', err.message));
  }
};
