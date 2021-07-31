import {LogOption} from 'git-log-nodejs';

export const DEFAULT_TIMEOUT_MILLISECONDS = 5000;
export const DEFAULT_MAX_LOG_COUNT = 1000;
export const DEFAULT_BRANCH_NAME = '';

export const DEFAULT_LOG_OPTION: LogOption = {
  branch: DEFAULT_BRANCH_NAME,
  count: DEFAULT_MAX_LOG_COUNT,
  withFile: false,
};

export const DEFAULT_AUTHOR_OPTION: LogOption = {
  branch: 'HEAD',
  count: 0,
  withFile: false,
};
