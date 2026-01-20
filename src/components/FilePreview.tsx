import { useState, useEffect } from 'react';
import MarkdownPreview from './previews/MarkdownPreview';
import DocxPreview from './previews/DocxPreview';
import XlsxPreview from './previews/XlsxPreview';
import ImagePreview from './previews/ImagePreview';
import PdfPreview from './previews/PdfPreview';
import CodePreview from './previews/CodePreview';
import TextPreview from './previews/TextPreview';
import './FilePreview.css';

interface FilePreviewProps {
  filePath: string | null;
}

const FilePreview = ({ filePath }: FilePreviewProps) => {
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number>(0);
  const [canPreview, setCanPreview] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // 10 MB threshold for large file warning
  const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;

  useEffect(() => {
    if (filePath) {
      checkFileSize(filePath);
    } else {
      setFileType(null);
      setFileSize(0);
      setCanPreview(true);
    }
  }, [filePath]);

  const checkFileSize = async (path: string) => {
    setLoading(true);
    document.body.style.cursor = 'wait';

    try {
      const ext = path.split('.').pop()?.toLowerCase() || '';
      setFileType(ext);

      const info = await window.electronAPI.getFileInfo(path);
      setFileSize(info.size);

      if (info.size > LARGE_FILE_THRESHOLD) {
        const fileSizeMB = (info.size / (1024 * 1024)).toFixed(2);
        const proceed = window.confirm(
          `This file is ${fileSizeMB} MB. Loading large files may slow down the application.\n\nDo you want to proceed?`
        );
        setCanPreview(proceed);
      } else {
        setCanPreview(true);
      }
    } catch (error) {
      console.error('Failed to get file info:', error);
      setCanPreview(true); // Allow preview attempt even if size check fails
    } finally {
      setLoading(false);
      document.body.style.cursor = 'default';
    }
  };

  if (!filePath) {
    return (
      <div className="preview-container">
        <div className="preview-empty">
          <div className="empty-icon">📄</div>
          <div className="empty-text">Select a file to preview</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="preview-container">
        <div className="preview-loading-state">
          <div className="loading-spinner"></div>
          <div className="loading-text">Checking file size...</div>
        </div>
      </div>
    );
  }

  if (!canPreview) {
    return (
      <div className="preview-container">
        <div className="preview-empty">
          <div className="empty-icon">⚠️</div>
          <div className="empty-text">Preview cancelled</div>
          <div className="empty-hint">
            File size: {(fileSize / (1024 * 1024)).toFixed(2)} MB
          </div>
        </div>
      </div>
    );
  }

  const renderPreview = () => {
    switch (fileType) {
      case 'md':
      case 'markdown':
        return <MarkdownPreview filePath={filePath} />;
      case 'docx':
      case 'doc':
        return <DocxPreview filePath={filePath} />;
      case 'xlsx':
      case 'xls':
      case 'csv':
        return <XlsxPreview filePath={filePath} />;
      case 'pdf':
        return <PdfPreview filePath={filePath} />;
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'webp':
      case 'svg':
        return <ImagePreview filePath={filePath} />;
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'json':
      case 'html':
      case 'css':
      case 'scss':
      case 'xml':
      case 'yaml':
      case 'yml':
      case 'py':
      case 'java':
      case 'c':
      case 'cpp':
      case 'cs':
      case 'go':
      case 'rs':
      case 'rb':
      case 'php':
      case 'swift':
      case 'kt':
      case 'h':
      case 'sh':
      case 'bash':
      case 'sql':
        return <CodePreview filePath={filePath} fileType={fileType} />;
      case 'txt':
      case 'log':
      case 'conf':
      case 'ini':
      case 'cfg':
        return <TextPreview filePath={filePath} fileType={fileType} />;
      default:
        return (
          <div className="preview-unsupported">
            <div className="unsupported-icon">❌</div>
            <div className="unsupported-text">
              Preview not available for .{fileType} files
            </div>
            <div className="unsupported-hint">
              Supported formats: Markdown, PDF, Word, Excel, Images, Code files, Text files
            </div>
          </div>
        );
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-header">
        <div className="preview-filename">{filePath.split('/').pop()}</div>
        <div className="preview-actions">
          <button
            className="action-button"
            onClick={() => window.electronAPI.showItemInFolder(filePath)}
            title="Show in folder"
          >
            📁
          </button>
        </div>
      </div>
      <div className="preview-content">
        {renderPreview()}
      </div>
    </div>
  );
};

export default FilePreview;
