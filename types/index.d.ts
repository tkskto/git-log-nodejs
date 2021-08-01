// # type definitions of git-log-nodejs
declare module 'git-log-nodejs' {

  // ## Types

  export type Remote = Record<string, { fetch: string, push: string }>

  export type Commit = {
    author: Pick<Author, 'email' | 'name'>;
    hash: string;
    date: number;
    parent: string[];
    files?: File[];
  }

  export type LogOption = {
    count: number;
    withFile: boolean;
    branch: string | 'HEAD';
  }

  export type Author = {
    name: string;
    email: string;
    commitCount: number;
  }

  export type Branch = {
    name: string;
    remote: string;
    hash: string;
  }

  export type Tag = {
    name: string;
    hash: string;
  }

  export interface Config {[key: string]: string | {[key: string]: string}}

  export interface GitLogConfig {
    dir: string;
  }

  export interface File {
    type: 'add' | 'modify' | 'delete';
    fileName: string;
  }

  // # Functions

  export function remotes(): Promise<Remote>;

  export function commits(params?: LogOption): Promise<Commit[]>;

  export function authors(params?: LogOption): Promise<Author[]>;

  export function branches(): Branch[];

  export function tags(): Tag[];

  export function config(): Promise<Config>;

  export function setGitLogConfig(config: GitLogConfig): void;
}
