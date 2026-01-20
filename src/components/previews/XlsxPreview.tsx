import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import './XlsxPreview.css';

interface XlsxPreviewProps {
  filePath: string;
}

const XlsxPreview = ({ filePath }: XlsxPreviewProps) => {
  const [sheets, setSheets] = useState<{ name: string; data: any[][] }[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
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
      const workbook = XLSX.read(buffer, { type: 'buffer' });

      const sheetsData = workbook.SheetNames.map((name) => {
        const worksheet = workbook.Sheets[name];
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        return { name, data };
      });

      setSheets(sheetsData);
      setActiveSheet(0);
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

  if (sheets.length === 0) {
    return <div className="preview-error">No sheets found in file</div>;
  }

  const currentSheet = sheets[activeSheet];

  return (
    <div className="xlsx-preview">
      {sheets.length > 1 && (
        <div className="sheet-tabs">
          {sheets.map((sheet, index) => (
            <button
              key={index}
              className={`sheet-tab ${index === activeSheet ? 'active' : ''}`}
              onClick={() => setActiveSheet(index)}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      )}
      <div className="sheet-container">
        <table className="excel-table">
          <tbody>
            {currentSheet.data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cell !== null && cell !== undefined ? String(cell) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default XlsxPreview;
