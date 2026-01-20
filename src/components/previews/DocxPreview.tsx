import { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import './DocxPreview.css';

interface DocxPreviewProps {
  filePath: string;
}

const DocxPreview = ({ filePath }: DocxPreviewProps) => {
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
      const buffer = await window.electronAPI.readFileBuffer(filePath);
      const arrayBuffer = new Uint8Array(buffer).buffer;
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setContent(result.value);
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
    <div className="docx-preview" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default DocxPreview;
