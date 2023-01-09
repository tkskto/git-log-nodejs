import {getDiffBetweenCommits, getDiffFromCommits} from './Execs';
import {REGEXP_END_OF_LINE} from './Defaults';

export const diffBetween = async (hash1: string, hash2: string): Promise<string[]> => {
  const files = await getDiffBetweenCommits(hash1, hash2, {nameOnly: true});

  return files.trim().split(REGEXP_END_OF_LINE);
};

export const diffFrom = async (hashOrHead: string | 'HEAD', count: number): Promise<string[]> => {
  const files = await getDiffFromCommits(hashOrHead, count, {nameOnly: true});

  return files.trim().split(REGEXP_END_OF_LINE);
}
