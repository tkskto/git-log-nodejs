export const makeErrorMessage = (functionName: string, error: string): string => {
  return `
    Something went wrong in git-log-nodejs. follow error message.
    at ${functionName}:
    ${error}
  `;
};
