import { useState } from 'react';
import './CommandPanel.css';

interface CommandPanelProps {
  currentPath: string;
}

const CommandPanel = ({ currentPath }: CommandPanelProps) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const executeCommand = async () => {
    if (!command.trim()) return;

    setLoading(true);
    const commandText = command.trim();
    setOutput((prev) => [...prev, `$ ${commandText}`]);
    setCommand('');

    try {
      const result = await window.electronAPI.executeCommand(commandText, currentPath);

      if (result.error) {
        setOutput((prev) => [...prev, `Error: ${result.error}`]);
      } else {
        if (result.stdout) {
          setOutput((prev) => [...prev, result.stdout]);
        }
        if (result.stderr) {
          setOutput((prev) => [...prev, `stderr: ${result.stderr}`]);
        }
        if (!result.stdout && !result.stderr) {
          setOutput((prev) => [...prev, '(command completed with no output)']);
        }
      }
    } catch (err) {
      setOutput((prev) => [
        ...prev,
        `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      executeCommand();
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  return (
    <div className="command-panel">
      <div className="command-header">
        <div className="command-title">
          <span>Command Panel</span>
          <span className="command-cwd">Working Directory: {currentPath}</span>
        </div>
        <div className="command-actions">
          <button onClick={clearOutput} className="clear-button">
            Clear
          </button>
        </div>
      </div>
      <div className="command-output">
        {output.map((line, index) => (
          <div
            key={index}
            className={line.startsWith('$') ? 'output-command' : 'output-text'}
          >
            {line}
          </div>
        ))}
        {output.length === 0 && (
          <div className="output-empty">
            Enter commands to execute in the current directory. Examples: ls, pwd, git
            status, npm install
          </div>
        )}
      </div>
      <div className="command-input-container">
        <span className="command-prompt">$</span>
        <input
          type="text"
          className="command-input"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter command..."
          disabled={loading}
        />
        <button onClick={executeCommand} disabled={loading || !command.trim()}>
          {loading ? 'Running...' : 'Execute'}
        </button>
      </div>
    </div>
  );
};

export default CommandPanel;
