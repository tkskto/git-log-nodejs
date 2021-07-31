import Commit = gitLog.Commit;
import LogOption = gitLog.LogOption;
import {DEFAULT_LOG_OPTION} from './Defaults';
import {getLog} from './Execs';
import {parseFileData} from './Files';
import {makeErrorMessage} from './ErrorLogFactory';

export const commits = async (params: LogOption = DEFAULT_LOG_OPTION): Promise<Commit[]> => {
  try {
    const logs: string = await getLog(params);

    // when --name-status is on, the result include two of new line.
    const regExp = params.withFile ? /(\n|\r\n){2}/g : /\n|\r\n/g;

    return logs.split(regExp).filter(log => log.trim()).map((log) => {
      try {
        if (params.withFile) {
          // parse string of file data to object
          const files = log.trim().split(/\n|\r\n/g);
          const commitData: Commit = JSON.parse(files.shift() || '');

          commitData.files = parseFileData(files);

          return commitData;
        }
        return JSON.parse(log);
      } catch (err) {
        throw new Error(makeErrorMessage('JSON.parse error at commits in Commit.ts', `${err.message} ${log}`));
      }
    });
  } catch (err) {
    throw new Error(makeErrorMessage('commits in Commit.ts', err.message));
  }
};
