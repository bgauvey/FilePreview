import { useState, useEffect } from 'react';
import './TextPreview.css';

interface TextPreviewProps {
  filePath: string;
  fileType: string;
}

const TextPreview = ({ filePath, fileType }: TextPreviewProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFile();
  }, [filePath]);

  const loadFile = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await window.electronAPI.readFile(filePath);
      setContent(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="preview-loading">Loading...</div>;
  }

  if (error) {
    return <div className="preview-error">Error: {error}</div>;
  }

  return (
    <div className="text-preview">
      <div className="text-header">
        <span className="text-type">.{fileType}</span>
        <span className="text-lines">{content.split('\n').length} lines</span>
      </div>
      <pre className="text-content">
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default TextPreview;
