import { useState } from 'react';
import './FileToolbar.css';

interface ClipboardData {
  content: string;
  fileName: string;
  sourcePath: string;
  isCut: boolean;
}

interface FileToolbarProps {
  selectedFile: string | null;
  currentPath: string;
  onRefresh: () => void;
}

const FileToolbar = ({ selectedFile, currentPath, onRefresh }: FileToolbarProps) => {
  const [clipboard, setClipboard] = useState<ClipboardData | null>(null);
  const [message, setMessage] = useState<string>('');

  const showMessage = (msg: string, duration: number = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  };

  const handleCopy = async () => {
    if (!selectedFile) {
      showMessage('No file selected');
      return;
    }

    document.body.style.cursor = 'wait';
    try {
      const result = await window.electronAPI.copyFile(selectedFile);
      const fileName = selectedFile.split('/').pop() || '';
      setClipboard({
        content: result.content || '',
        fileName,
        sourcePath: selectedFile,
        isCut: false,
      });
      showMessage(`Copied: ${fileName}`);
    } catch (error) {
      showMessage(`Copy failed: ${error}`);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  const handleCut = async () => {
    if (!selectedFile) {
      showMessage('No file selected');
      return;
    }

    document.body.style.cursor = 'wait';
    try {
      const result = await window.electronAPI.cutFile(selectedFile);
      const fileName = selectedFile.split('/').pop() || '';
      setClipboard({
        content: result.content || '',
        fileName,
        sourcePath: selectedFile,
        isCut: true,
      });
      showMessage(`Cut: ${fileName}`);
    } catch (error) {
      showMessage(`Cut failed: ${error}`);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  const handlePaste = async () => {
    if (!clipboard) {
      showMessage('Clipboard is empty');
      return;
    }

    document.body.style.cursor = 'wait';
    try {
      await window.electronAPI.pasteFile(
        currentPath,
        clipboard.fileName,
        clipboard.content,
        clipboard.isCut,
        clipboard.sourcePath
      );
      showMessage(`Pasted: ${clipboard.fileName}`);
      if (clipboard.isCut) {
        setClipboard(null);
      }
      onRefresh();
    } catch (error) {
      showMessage(`Paste failed: ${error}`);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  const handleDelete = async () => {
    if (!selectedFile) {
      showMessage('No file selected');
      return;
    }

    const fileName = selectedFile.split('/').pop() || '';
    const confirmed = window.confirm(`Are you sure you want to delete "${fileName}"?`);

    if (!confirmed) return;

    document.body.style.cursor = 'wait';
    try {
      await window.electronAPI.deleteFile(selectedFile);
      showMessage(`Deleted: ${fileName}`);
      onRefresh();
    } catch (error) {
      showMessage(`Delete failed: ${error}`);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  const handleRename = async () => {
    if (!selectedFile) {
      showMessage('No file selected');
      return;
    }

    const oldName = selectedFile.split('/').pop() || '';
    const newName = window.prompt('Enter new name:', oldName);

    if (!newName || newName === oldName) return;

    const directory = selectedFile.substring(0, selectedFile.lastIndexOf('/'));
    const newPath = `${directory}/${newName}`;

    document.body.style.cursor = 'wait';
    try {
      await window.electronAPI.renameFile(selectedFile, newPath);
      showMessage(`Renamed to: ${newName}`);
      onRefresh();
    } catch (error) {
      showMessage(`Rename failed: ${error}`);
    } finally {
      document.body.style.cursor = 'default';
    }
  };

  const handleEdit = async () => {
    if (!selectedFile) {
      showMessage('No file selected');
      return;
    }

    try {
      await window.electronAPI.openInEditor(selectedFile);
      showMessage('Opening in default editor...');
    } catch (error) {
      showMessage(`Failed to open: ${error}`);
    }
  };

  return (
    <div className="file-toolbar">
      <div className="toolbar-buttons">
        <button
          onClick={handleCopy}
          disabled={!selectedFile}
          title="Copy file (Ctrl+C)"
          className="toolbar-btn"
        >
          📋 Copy
        </button>
        <button
          onClick={handleCut}
          disabled={!selectedFile}
          title="Cut file (Ctrl+X)"
          className="toolbar-btn"
        >
          ✂️ Cut
        </button>
        <button
          onClick={handlePaste}
          disabled={!clipboard}
          title="Paste file (Ctrl+V)"
          className="toolbar-btn"
        >
          📌 Paste
        </button>
        <div className="toolbar-divider"></div>
        <button
          onClick={handleRename}
          disabled={!selectedFile}
          title="Rename file (F2)"
          className="toolbar-btn"
        >
          ✏️ Rename
        </button>
        <button
          onClick={handleDelete}
          disabled={!selectedFile}
          title="Delete file (Delete)"
          className="toolbar-btn toolbar-btn-danger"
        >
          🗑️ Delete
        </button>
        <div className="toolbar-divider"></div>
        <button
          onClick={handleEdit}
          disabled={!selectedFile}
          title="Open in default editor"
          className="toolbar-btn"
        >
          📝 Edit
        </button>
        <button onClick={onRefresh} title="Refresh directory" className="toolbar-btn">
          🔄 Refresh
        </button>
      </div>
      {message && <div className="toolbar-message">{message}</div>}
    </div>
  );
};

export default FileToolbar;
