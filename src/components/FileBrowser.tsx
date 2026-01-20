import { useState, useEffect } from 'react';
import { FileItem } from '../types';
import FileToolbar from './FileToolbar';
import './FileBrowser.css';

interface FileBrowserProps {
  currentPath: string;
  onPathChange: (path: string) => void;
  onFileSelect: (path: string | null) => void;
  selectedFile: string | null;
}

const FileBrowser = ({ currentPath, onPathChange, onFileSelect, selectedFile }: FileBrowserProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);

  useEffect(() => {
    if (currentPath) {
      loadDirectory(currentPath);
    }
  }, [currentPath, showHidden]);

  const loadDirectory = async (path: string) => {
    setLoading(true);
    setError(null);
    try {
      const items = await window.electronAPI.readDirectory(path);

      // Filter hidden files unless showHidden is true
      const filtered = showHidden
        ? items
        : items.filter(item => !item.name.startsWith('.'));

      const sorted = filtered.sort((a, b) => {
        if (a.isDirectory && !b.isDirectory) return -1;
        if (!a.isDirectory && b.isDirectory) return 1;
        return a.name.localeCompare(b.name);
      });
      setFiles(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load directory');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item: FileItem) => {
    if (item.isDirectory) {
      onPathChange(item.path);
      onFileSelect(null);
    } else {
      onFileSelect(item.path);
    }
  };

  const handleParentClick = () => {
    const parent = currentPath.split('/').slice(0, -1).join('/') || '/';
    onPathChange(parent);
    onFileSelect(null);
  };

  const handleBrowseClick = async () => {
    const dir = await window.electronAPI.selectDirectory();
    if (dir) {
      onPathChange(dir);
      onFileSelect(null);
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (item: FileItem): string => {
    if (item.isDirectory) return '📁';
    const ext = item.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md': return '📝';
      case 'txt':
      case 'log': return '📄';
      case 'pdf': return '📕';
      case 'docx':
      case 'doc': return '📘';
      case 'xlsx':
      case 'xls':
      case 'csv': return '📗';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'webp':
      case 'svg': return '🖼️';
      case 'js':
      case 'jsx': return '🟨';
      case 'ts':
      case 'tsx': return '🔷';
      case 'py': return '🐍';
      case 'java': return '☕';
      case 'c':
      case 'cpp':
      case 'h': return '⚙️';
      case 'cs': return '🔵';
      case 'go': return '🐹';
      case 'rs': return '🦀';
      case 'rb': return '💎';
      case 'php': return '🐘';
      case 'swift': return '🦅';
      case 'kt': return '🟣';
      case 'json': return '📋';
      case 'html':
      case 'xml': return '🌐';
      case 'css':
      case 'scss': return '🎨';
      case 'yaml':
      case 'yml': return '⚙️';
      case 'sql': return '🗄️';
      case 'sh':
      case 'bash': return '💻';
      default: return '📄';
    }
  };

  const handleRefresh = () => {
    if (currentPath) {
      loadDirectory(currentPath);
    }
  };

  return (
    <div className="file-browser">
      <FileToolbar
        selectedFile={selectedFile}
        currentPath={currentPath}
        onRefresh={handleRefresh}
      />
      <div className="browser-header">
        <div className="path-display">
          <input
            type="text"
            value={currentPath}
            onChange={(e) => onPathChange(e.target.value)}
            className="path-input"
          />
          <button onClick={handleBrowseClick} className="browse-button">
            Browse
          </button>
        </div>
        <div className="browser-options">
          <label className="hidden-files-toggle">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
            />
            <span>Show hidden files</span>
          </label>
        </div>
      </div>
      <div className="file-list">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && (
          <>
            {currentPath !== '/' && (
              <div className="file-item parent" onClick={handleParentClick}>
                <span className="file-icon">⬆️</span>
                <span className="file-name">..</span>
              </div>
            )}
            {files.map((item) => (
              <div
                key={item.path}
                className={`file-item ${selectedFile === item.path ? 'selected' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <span className="file-icon">{getFileIcon(item)}</span>
                <span className="file-name">{item.name}</span>
                {!item.isDirectory && (
                  <span className="file-size">{formatSize(item.size)}</span>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FileBrowser;
