import { useState, useEffect } from 'react';
import { marked } from 'marked';
import './MarkdownPreview.css';

interface MarkdownPreviewProps {
  filePath: string;
}

const MarkdownPreview = ({ filePath }: MarkdownPreviewProps) => {
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
      const html = await marked(text);
      setContent(html as string);
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
    <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default MarkdownPreview;
