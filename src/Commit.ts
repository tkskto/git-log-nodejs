import {LogOption, Commit} from 'git-log-nodejs';
import {DEFAULT_LOG_OPTION, END_OF_LINE, REGEXP_END_OF_LINE} from './Defaults';
import {getCommitOfFile, getCommits, getCommitOfHash} from './Execs';
import {parseFileData} from './Files';
import {makeErrorMessage} from './ErrorLogFactory';

const parseCommitLog = (log: string, withFile: boolean): Commit => {
  if (withFile) {
    // parse string of file data to object
    const files = log.trim().split(REGEXP_END_OF_LINE);
    const commitData: Commit = JSON.parse(files.shift() || '');

    commitData.files = parseFileData(files);
    commitData.parent = String(commitData.parent).split(' ');

    return commitData;
  }

  const commitData: Commit = JSON.parse(log);

  commitData.parent = String(commitData.parent).split(' ');

  return commitData;
}

export const commits = async (params: LogOption = {...DEFAULT_LOG_OPTION}): Promise<Commit[]> => {
  try {
    const logs: string = await getCommits(params);

    // when --name-status is on, the result include two of new line.
    const regExp = params.withFile ? new RegExp(`(${END_OF_LINE}){2}`, 'ug') : REGEXP_END_OF_LINE;

    return logs.split(regExp).filter(log => log.trim()).map((log) => {
      try {
        return parseCommitLog(log, params.withFile);
      } catch (err) {
        throw new Error(makeErrorMessage('JSON.parse error at commits in Commit.ts', `${err.message} ${log}`));
      }
    });
  } catch (err) {
    throw new Error(makeErrorMessage('commits in Commit.ts', err.message));
  }
};

export const currentCommit = async (params: LogOption = {...DEFAULT_LOG_OPTION}): Promise<Commit> => {
  try {
    params.count = 1;
    params.branch = 'HEAD';

    const commit: Commit[] = await commits(params);

    return commit[0];
  } catch (err) {
    throw new Error(makeErrorMessage('currentCommit in Commit.ts', err.message));
  }
};

export const commitOfHash = async (hash: string, params: LogOption = {...DEFAULT_LOG_OPTION}): Promise<Commit> => {
  try {
    params.count = 1;
    params.withFile = true;

    const log: string = await getCommitOfHash(hash, params);

    return parseCommitLog(log, params.withFile);
  } catch (err) {
    throw new Error(makeErrorMessage('commitOfHash in Commit.ts', err.message));
  }
};

export const commitsOfFile = async (filename: string, params: LogOption = {...DEFAULT_LOG_OPTION}): Promise<Commit[]> => {
  try {
    params.withFile = false;

    const logs: string = await getCommitOfFile(filename, params);

    return logs.split(REGEXP_END_OF_LINE).filter(log => log.trim()).map((log) => {
      try {
        return parseCommitLog(log, false);
      } catch (err) {
        throw new Error(makeErrorMessage('JSON.parse error at commitsOfFile in Commit.ts', `${err.message} ${log}`));
      }
    });
  } catch (err) {
    throw new Error(makeErrorMessage('commitsOfFile in Commit.ts', err.message));
  }
};
