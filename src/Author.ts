import Author = gitLog.Author;
import LogOption = gitLog.LogOption;
import {getAuthor} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {DEFAULT_AUTHOR_OPTION} from './Defaults';

export const authors = async (params: LogOption = DEFAULT_AUTHOR_OPTION): Promise<Author[]> => {
  try {
    const logs: string = await getAuthor(params);

    return logs.trim().split(/\n|\r\n/g).map((log) => {
      const [count, nameAndEmail] = log.split(/\t/ug);
      const [, email] = nameAndEmail.match(/<(.+)>/u) || '';
      const authorData: Author = {
        name: nameAndEmail.replace(`<${email}>`, '').trim(),
        email: email,
        commitCount: Number(count),
      }

      return authorData;
    });
  } catch (err) {
    throw new Error(makeErrorMessage('authors in Author.ts', err.message));
  }
};
