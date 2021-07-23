import Commit = gitLog.Commit;
import {DEFAULT_MAX_LOG_COUNT} from './AppConfig';
import {getLog} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';

export const commits = async (count = DEFAULT_MAX_LOG_COUNT): Promise<Commit[]> => {
  try {
    const logs: string = await getLog(count);
    return logs.split(/\n|\r\n/).map((log) => {
      try {
        return JSON.parse(log);
      } catch (err) {
        throw new Error(makeErrorMessage('JSON.parse error at commits in Commit.ts', `${err.message} ${log}`));
      }
    });
  } catch (err) {
    throw new Error(makeErrorMessage('commits in Commit.ts', err.message));
  }
};
