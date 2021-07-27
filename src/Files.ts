import File = gitLog.File;
/**
 * @param {string[]} files the string must be like a {[A|M|D]\t{filename}}
 * @returns File[]
 */
export const parseFileData = (files: string[]): File[] => {
  return files.map((file: string) => {
    const [type, fileName]: string[] = file.split('\t');

    return {
      type: type === 'A' ? 'add' : type === 'M' ? 'modify' : 'delete',
      fileName,
    };
  });
};
