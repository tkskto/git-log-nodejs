declare namespace gitLog {
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

  export interface GitLog {
    remotes(): {[key: string]: Remote}[];

    commits(commitArguments: LogOption): commit[];

    authors(): Author[];

    branches(): Branch[];

    tags(): Tag[];

    config(): Config;

    setGitLogConfig(config: GitLogConfig): void;
  }
}
