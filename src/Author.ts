import {LogOption, Author} from 'git-log-nodejs';
import {getAuthor} from './Execs';
import {makeErrorMessage} from './ErrorLogFactory';
import {DEFAULT_AUTHOR_OPTION, REGEXP_END_OF_LINE} from './Defaults';

export const authors = async (params: LogOption = DEFAULT_AUTHOR_OPTION): Promise<Author[]> => {
  try {
    const logs: string = await getAuthor(params);

    return logs.trim().split(REGEXP_END_OF_LINE).map((log) => {
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
