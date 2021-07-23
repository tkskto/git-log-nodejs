declare namespace gitLog {
  export interface Remote {
    url: string;
    fetch: string;
  }

  export interface Commit {
    committer: Committer;
    hash: string;
    date: number;
    message: string;
    parent: string;
    file?: string[];
  }

  export interface Author {
    name: string;
    email: string;
  }

  export interface Committer {
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

  export interface Config {
    core: {
      repositoryformatversion?: number;
      filemode?: boolean;
      bare?: boolean;
      logallrefupdates?: boolean;
      ignorecase?: boolean;
      precomposeunicode?: boolean;
    }
  }

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

    committers(): Committer[];

    branches(): Branch[];

    tags(): Tag[];

    config(): Config;

    setGitLogConfig(config: GitLogConfig): void;
  }
}
