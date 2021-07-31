declare module 'git-log-nodejs' {
  export type Remote = {
    url: string;
    fetch: string;
  }

  export type Commit = {
    author: Author;
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
    commit: Commit;
  }

  export type Tag = {
    name: string;
    commit: Commit;
  }

  export interface Config {[key: string]: string | {[key: string]: string}}

  export interface GitLogConfig {
    dir: string;
  }

  export interface File {
    type: 'add' | 'modify' | 'delete';
    fileName: string;
  }

  export function remotes(): {[key: string]: Remote}[];

  export function commits(params: LogOption): Promise<Commit[]>;

  export function authors(params: LogOption): Promise<Author[]>;

  export function branches(): Branch[];

  export function tags(): Tag[];

  export function config(): Promise<Config>;

  export function setGitLogConfig(config: GitLogConfig): void;
}
