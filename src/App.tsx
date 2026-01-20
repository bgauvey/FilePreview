import { useState, useEffect } from 'react';
import FileBrowser from './components/FileBrowser';
import FilePreview from './components/FilePreview';
import CommandPanel from './components/CommandPanel';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [showCommandPanel, setShowCommandPanel] = useState(false);

  useEffect(() => {
    window.electronAPI.getHomeDirectory().then(setCurrentPath);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>File Preview</h1>
        <button
          className="command-button"
          onClick={() => setShowCommandPanel(!showCommandPanel)}
        >
          {showCommandPanel ? 'Hide' : 'Show'} Command Panel
        </button>
      </header>
      <div className="app-content">
        <div className="browser-section">
          <FileBrowser
            currentPath={currentPath}
            onPathChange={setCurrentPath}
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
          />
        </div>
        <div className="preview-section">
          <FilePreview filePath={selectedFile} />
        </div>
      </div>
      {showCommandPanel && (
        <div className="command-panel-section">
          <CommandPanel currentPath={currentPath} />
        </div>
      )}
    </div>
  );
}

export default App;
