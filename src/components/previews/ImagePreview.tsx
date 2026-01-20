import { useState, useEffect } from 'react';
import './ImagePreview.css';

interface ImagePreviewProps {
  filePath: string;
}

const ImagePreview = ({ filePath }: ImagePreviewProps) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadImage();
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [filePath]);

  const loadImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const buffer = await window.electronAPI.readFileBuffer(filePath);
      const blob = new Blob([buffer]);
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
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
    <div className="image-preview">
      <img src={imageUrl} alt={filePath} />
    </div>
  );
};

export default ImagePreview;
