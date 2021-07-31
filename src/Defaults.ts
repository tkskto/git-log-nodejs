import LogOption = gitLog.LogOption;
export const DEFAULT_MAX_LOG_COUNT = 1000;
export const DEFAULT_BRANCH_NAME = '';

export const DEFAULT_LOG_OPTION: LogOption = {
  branch: DEFAULT_BRANCH_NAME,
  count: DEFAULT_MAX_LOG_COUNT,
  withFile: false,
}
