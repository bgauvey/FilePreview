import { useState, useEffect } from 'react';
import './CodePreview.css';

interface CodePreviewProps {
  filePath: string;
  fileType: string;
}

const CodePreview = ({ filePath, fileType }: CodePreviewProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>('');

  const getLanguage = (ext: string): string => {
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      cs: 'csharp',
      go: 'go',
      rs: 'rust',
      rb: 'ruby',
      php: 'php',
      swift: 'swift',
      kt: 'kotlin',
      sh: 'bash',
      bash: 'bash',
      json: 'json',
      yaml: 'yaml',
      yml: 'yaml',
      sql: 'sql',
      css: 'css',
      scss: 'scss',
      html: 'html',
      xml: 'xml',
      txt: 'none',
    };

    return languageMap[ext] || 'none';
  };

  useEffect(() => {
    loadFile();
  }, [filePath]);

  useEffect(() => {
    if (content) {
      loadPrismAndHighlight();
    }
  }, [content, fileType]);

  const loadPrismAndHighlight = async () => {
    try {
      const Prism = (await import('prismjs')).default;

      // Load theme
      await import('prismjs/themes/prism-tomorrow.css' as any);

      const language = getLanguage(fileType);

      if (language !== 'none') {
        // Load language grammar dynamically
        try {
          switch (language) {
            case 'javascript':
              await import('prismjs/components/prism-javascript' as any);
              break;
            case 'typescript':
              await import('prismjs/components/prism-typescript' as any);
              break;
            case 'python':
              await import('prismjs/components/prism-python' as any);
              break;
            case 'java':
              await import('prismjs/components/prism-java' as any);
              break;
            case 'c':
              await import('prismjs/components/prism-c' as any);
              break;
            case 'cpp':
              await import('prismjs/components/prism-cpp' as any);
              break;
            case 'csharp':
              await import('prismjs/components/prism-csharp' as any);
              break;
            case 'go':
              await import('prismjs/components/prism-go' as any);
              break;
            case 'rust':
              await import('prismjs/components/prism-rust' as any);
              break;
            case 'ruby':
              await import('prismjs/components/prism-ruby' as any);
              break;
            case 'php':
              await import('prismjs/components/prism-php' as any);
              break;
            case 'swift':
              await import('prismjs/components/prism-swift' as any);
              break;
            case 'kotlin':
              await import('prismjs/components/prism-kotlin' as any);
              break;
            case 'bash':
              await import('prismjs/components/prism-bash' as any);
              break;
            case 'json':
              await import('prismjs/components/prism-json' as any);
              break;
            case 'yaml':
              await import('prismjs/components/prism-yaml' as any);
              break;
            case 'sql':
              await import('prismjs/components/prism-sql' as any);
              break;
            case 'css':
              await import('prismjs/components/prism-css' as any);
              break;
            case 'scss':
              await import('prismjs/components/prism-scss' as any);
              break;
            case 'html':
            case 'xml':
              await import('prismjs/components/prism-markup' as any);
              break;
          }

          const grammar = Prism.languages[language];
          if (grammar) {
            const highlighted = Prism.highlight(content, grammar, language);
            setHighlightedCode(highlighted);
          } else {
            setHighlightedCode('');
          }
        } catch (err) {
          console.warn(`Failed to load Prism grammar for ${language}:`, err);
          setHighlightedCode('');
        }
      } else {
        setHighlightedCode('');
      }
    } catch (err) {
      console.warn('Failed to load Prism:', err);
      setHighlightedCode('');
    }
  };

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

  const language = getLanguage(fileType);
  const lineCount = content.split('\n').length;

  return (
    <div className="code-preview">
      <div className="code-header">
        <div className="code-info">
          <span className="code-type">.{fileType}</span>
          <span className="code-language">{language !== 'none' ? language : 'plain text'}</span>
        </div>
        <span className="code-lines">{lineCount} lines</span>
      </div>
      <div className="code-content">
        {highlightedCode ? (
          <pre className={`language-${language}`}>
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        ) : (
          <pre>
            <code>{content}</code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
