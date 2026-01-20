import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);
const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('read-directory', async (_, dirPath: string) => {
  try {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const result = await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(dirPath, item.name);
        const stats = await fs.promises.stat(fullPath);
        return {
          name: item.name,
          path: fullPath,
          isDirectory: item.isDirectory(),
          size: stats.size,
          modified: stats.mtime,
        };
      })
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to read directory: ${error}`);
  }
});

ipcMain.handle('read-file', async (_, filePath: string) => {
  try {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to read file: ${error}`);
  }
});

ipcMain.handle('read-file-buffer', async (_, filePath: string) => {
  try {
    const buffer = await fs.promises.readFile(filePath);
    return buffer;
  } catch (error) {
    throw new Error(`Failed to read file: ${error}`);
  }
});

ipcMain.handle('get-file-info', async (_, filePath: string) => {
  try {
    const stats = await fs.promises.stat(filePath);
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
    };
  } catch (error) {
    throw new Error(`Failed to get file info: ${error}`);
  }
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openDirectory'],
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('execute-command', async (_, command: string, cwd?: string) => {
  try {
    const { stdout, stderr } = await execAsync(command, { cwd: cwd || process.cwd() });
    return { stdout, stderr, error: null };
  } catch (error: any) {
    return {
      stdout: error.stdout || '',
      stderr: error.stderr || '',
      error: error.message
    };
  }
});

ipcMain.handle('open-external', async (_, url: string) => {
  await shell.openExternal(url);
});

ipcMain.handle('show-item-in-folder', async (_, fullPath: string) => {
  shell.showItemInFolder(fullPath);
});

ipcMain.handle('get-home-directory', () => {
  return app.getPath('home');
});

ipcMain.handle('copy-file', async (_, sourcePath: string) => {
  try {
    const content = await fs.promises.readFile(sourcePath);
    return { success: true, content: content.toString('base64'), path: sourcePath };
  } catch (error) {
    throw new Error(`Failed to copy file: ${error}`);
  }
});

ipcMain.handle('cut-file', async (_, sourcePath: string) => {
  try {
    const content = await fs.promises.readFile(sourcePath);
    return { success: true, content: content.toString('base64'), path: sourcePath, isCut: true };
  } catch (error) {
    throw new Error(`Failed to cut file: ${error}`);
  }
});

ipcMain.handle('paste-file', async (_, destinationDir: string, fileName: string, content: string, isCut: boolean, sourcePath?: string) => {
  try {
    const destinationPath = path.join(destinationDir, fileName);
    const buffer = Buffer.from(content, 'base64');
    await fs.promises.writeFile(destinationPath, buffer);

    if (isCut && sourcePath) {
      await fs.promises.unlink(sourcePath);
    }

    return { success: true, path: destinationPath };
  } catch (error) {
    throw new Error(`Failed to paste file: ${error}`);
  }
});

ipcMain.handle('delete-file', async (_, filePath: string) => {
  try {
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await fs.promises.rm(filePath, { recursive: true });
    } else {
      await fs.promises.unlink(filePath);
    }
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete file: ${error}`);
  }
});

ipcMain.handle('rename-file', async (_, oldPath: string, newPath: string) => {
  try {
    await fs.promises.rename(oldPath, newPath);
    return { success: true, path: newPath };
  } catch (error) {
    throw new Error(`Failed to rename file: ${error}`);
  }
});

ipcMain.handle('open-in-editor', async (_, filePath: string) => {
  try {
    await shell.openPath(filePath);
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to open file: ${error}`);
  }
});
