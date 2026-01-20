export interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: Date;
}

export interface FileInfo {
  size: number;
  created: Date;
  modified: Date;
  isDirectory: boolean;
  isFile: boolean;
}

export interface CommandResult {
  stdout: string;
  stderr: string;
  error: string | null;
}

export interface FileOperationResult {
  success: boolean;
  path?: string;
  content?: string;
  isCut?: boolean;
}

declare global {
  interface Window {
    electronAPI: {
      readDirectory: (dirPath: string) => Promise<FileItem[]>;
      readFile: (filePath: string) => Promise<string>;
      readFileBuffer: (filePath: string) => Promise<ArrayBuffer>;
      getFileInfo: (filePath: string) => Promise<FileInfo>;
      selectDirectory: () => Promise<string | null>;
      executeCommand: (command: string, cwd?: string) => Promise<CommandResult>;
      openExternal: (url: string) => Promise<void>;
      showItemInFolder: (fullPath: string) => Promise<void>;
      getHomeDirectory: () => Promise<string>;
      copyFile: (sourcePath: string) => Promise<FileOperationResult>;
      cutFile: (sourcePath: string) => Promise<FileOperationResult>;
      pasteFile: (
        destinationDir: string,
        fileName: string,
        content: string,
        isCut: boolean,
        sourcePath?: string
      ) => Promise<FileOperationResult>;
      deleteFile: (filePath: string) => Promise<FileOperationResult>;
      renameFile: (oldPath: string, newPath: string) => Promise<FileOperationResult>;
      openInEditor: (filePath: string) => Promise<FileOperationResult>;
    };
  }
}

export {};
