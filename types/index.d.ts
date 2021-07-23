declare namespace gitLog {
  export interface Remote {
    url: string;
    fetch: string;
  }

  export interface Commit {
    author: Author;
    hash: string;
    date: number;
    parent: string[];
    file?: string[];
  }

  export interface Author {
    name: string;
    email: string;
  }

  export interface Branch {
    name: string;
    remote: string;
    commit: Commit;
  }

  export interface Tag {
    name: string;
    commit: Commit;
  }

  export interface Config {[key: string]: string | {[key: string]: string}}

  export interface GitLogConfig {
    dir: string;
  }

  export interface File {
    fileName?: string;
  }

  export interface GitLog {
    remotes(): {[key: string]: Remote}[];

    commits(depth: number): commit[];

    authors(): Author[];

    branches(): Branch[];

    tags(): Tag[];

    config(): Config;

    setGitLogConfig(config: GitLogConfig): void;
  }
}
