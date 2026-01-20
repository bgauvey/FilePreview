import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readDirectory: (dirPath: string) => ipcRenderer.invoke('read-directory', dirPath),
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  readFileBuffer: (filePath: string) => ipcRenderer.invoke('read-file-buffer', filePath),
  getFileInfo: (filePath: string) => ipcRenderer.invoke('get-file-info', filePath),
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  executeCommand: (command: string, cwd?: string) => ipcRenderer.invoke('execute-command', command, cwd),
  openExternal: (url: string) => ipcRenderer.invoke('open-external', url),
  showItemInFolder: (fullPath: string) => ipcRenderer.invoke('show-item-in-folder', fullPath),
  getHomeDirectory: () => ipcRenderer.invoke('get-home-directory'),
  copyFile: (sourcePath: string) => ipcRenderer.invoke('copy-file', sourcePath),
  cutFile: (sourcePath: string) => ipcRenderer.invoke('cut-file', sourcePath),
  pasteFile: (destinationDir: string, fileName: string, content: string, isCut: boolean, sourcePath?: string) =>
    ipcRenderer.invoke('paste-file', destinationDir, fileName, content, isCut, sourcePath),
  deleteFile: (filePath: string) => ipcRenderer.invoke('delete-file', filePath),
  renameFile: (oldPath: string, newPath: string) => ipcRenderer.invoke('rename-file', oldPath, newPath),
  openInEditor: (filePath: string) => ipcRenderer.invoke('open-in-editor', filePath),
});
