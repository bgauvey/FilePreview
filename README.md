# File Preview App

A modern desktop application for previewing various file types including Markdown, PDF, Word documents, Excel spreadsheets, images, and source code files with syntax highlighting. Built with Electron, React, and TypeScript.

## Features

- **File Browser**: Navigate through your file system with an intuitive interface
- **Multi-Format Support**:
  - **PDF Documents** (.pdf) with page navigation and zoom controls
  - **Markdown** (.md) with full rendering and syntax highlighting
  - **Word Documents** (.docx, .doc) with formatting preservation
  - **Excel Spreadsheets** (.xlsx, .xls, .csv) with multi-sheet support
  - **Images** (PNG, JPG, GIF, SVG, BMP, WebP) with optimized viewing
  - **Source Code** with syntax highlighting for:
    - JavaScript/TypeScript (JS, JSX, TS, TSX)
    - Python (.py)
    - Java (.java)
    - C/C++ (.c, .cpp, .h)
    - C# (.cs)
    - Go (.go)
    - Rust (.rs)
    - Ruby (.rb)
    - PHP (.php)
    - Swift (.swift)
    - Kotlin (.kt)
    - SQL (.sql)
    - Shell Scripts (.sh, .bash)
    - Web Files (HTML, CSS, SCSS, XML)
    - Config Files (JSON, YAML, YML)
  - **Plain Text** (.txt, .log, .conf, .ini, .cfg)
- **File Operations Toolbar**: Common file management operations
  - Copy, Cut, and Paste files
  - Rename and Delete files
  - Open files in default system editor
  - Refresh directory view
  - Visual wait cursors for all operations
- **Large File Protection**: Warns before loading files larger than 10 MB
  - User confirmation dialog for large files
  - File size display in megabytes
  - Option to cancel preview
- **Command Panel**: Execute file system commands directly from the app
- **Dark Theme**: Modern dark UI for comfortable viewing
- **Smart File Icons**: Visual file type indicators in the browser

## Installation

See [SETUP.md](SETUP.md) for detailed installation instructions.

Quick start:
```bash
npm install
npm run dev
```

This will start both the Vite dev server and Electron in development mode with hot reload.

## Building

Build the application for production:
```bash
npm run build
```

Create distributable packages:
```bash
npm run build:electron
```

This will create platform-specific installers in the `release` directory.

## Usage

1. **Browse Files**: Use the file browser on the left to navigate directories
2. **Preview Files**: Click on a file to preview it in the main panel
3. **File Operations**: Use toolbar buttons to copy, cut, paste, rename, delete files
4. **Open in Editor**: Click the "Edit" button to open files in your default editor
5. **PDF Navigation**: Use Previous/Next buttons to navigate pages, Zoom In/Out to adjust view
6. **Execute Commands**: Click "Show Command Panel" to open the terminal
7. **Navigate**: Use the path input or Browse button to jump to any directory
8. **Show in Folder**: Click the folder icon in the preview header to reveal the file in your system file manager

## Features by File Type

### PDF Preview
- Page-by-page navigation
- Zoom controls (50% to 300%)
- High-quality rendering

### Source Code Preview
- Automatic language detection
- Syntax highlighting with Prism.js (dynamic loading)
- Line count display
- Support for 25+ programming languages
- Fallback to plain text if highlighting fails

### Excel Preview
- Multi-sheet tab navigation
- Table formatting preserved
- Cell data visualization

### File Browser
- Hidden files are hidden by default
- Toggle "Show hidden files" checkbox to reveal files starting with "."
- Smart file icons for different file types
- Integrated toolbar for file operations

### File Operations Toolbar
- **Copy**: Copy selected file to clipboard
- **Cut**: Cut selected file for moving
- **Paste**: Paste file from clipboard to current directory
- **Rename**: Rename the selected file
- **Delete**: Delete selected file (with confirmation)
- **Edit**: Open file in system's default editor
- **Refresh**: Reload the current directory
- Visual feedback messages for all operations

## Keyboard Shortcuts

- Enter in command panel: Execute command
- Click on folders: Navigate into directory
- Click on ".." entry: Go to parent directory

## Technology Stack

- **Electron**: Desktop application framework
- **React**: UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **PDF.js**: PDF rendering engine
- **Prism.js**: Syntax highlighting for code
- **mammoth**: Word document conversion
- **xlsx**: Excel file parsing
- **marked**: Markdown parsing

## License

MIT
