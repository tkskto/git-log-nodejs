// Minimum TypeScript Version: 3.8

// ## Types

export interface Author {
  name: string;
  email: string;
  commitCount: number;
}

export interface Branches {
  local: string[];
  remote?: Record<string, string[]>;
}

export interface Commit {
  author: Pick<Author, 'email' | 'name'>;
  hash: string;
  date: number;
  parent: string[];
  files?: File[];
}

export interface Config {
  [key: string]: (string | Config);
}

export type FileStatus = 'added' | 'deleted' | 'ignored' | 'modified' | 'renamed' | 'unmodified' | 'untracked';

export interface File {
  type: FileStatus;
  fileName: string;
}

export interface FileStat {
  fileName: string;
  numberOfAddedLine: number;
  numberOfDeletedLine: number;
}

export interface GitLogConfig {
  dir: string;
}

export interface LogOption {
  count: number;
  withFile: boolean;
  withMessage: boolean;
  branch: string | 'HEAD';
}

export interface DiffOption {
  nameOnly: boolean;
}

export type Remote = Record<string, { fetch: string, push: string }>;

export interface Tag {
  name: string;
  hash: string;
}

// # Functions

export function authors(params?: LogOption): Promise<Author[]>;

export function branches(withRemote: boolean): Promise<Branches>;

export function commits(params?: LogOption): Promise<Commit[]>;

export function config(): Promise<Config>;

export function remotes(): Promise<Remote>;

export function tags(): Tag[];

export function setGitLogConfig(config: GitLogConfig): void;

export function status(): File[];

export function diffBetween(hash1: string, hash2: string): string[];

export function diffFrom(hashOrHead: string | 'HEAD', count: number): string[];
