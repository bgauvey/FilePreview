# Quick Start Guide

## Installation

### Prerequisites
Ensure you have Node.js installed (v18 or later recommended).

Check your Node.js version:
```bash
node --version
```

If Node.js is not installed, see [SETUP.md](SETUP.md) for installation instructions.

### Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Electron (desktop framework)
- React & TypeScript (UI)
- PDF.js (PDF rendering)
- Prism.js (syntax highlighting)
- Mammoth (Word documents)
- XLSX (Excel files)
- Marked (Markdown)

## Running the Application

### Development Mode
```bash
npm run dev
```

This command:
1. Starts Vite dev server on http://localhost:5173
2. Launches Electron application
3. Enables hot reload for development

The app window should open automatically within a few seconds.

### Production Build
```bash
npm run build
npm run build:electron
```

Distributable packages will be created in the `release/` directory.

## Using the Application

### Basic Navigation
1. **Open the app** - Run `npm run dev`
2. **Browse files** - Use the left sidebar to navigate your file system
3. **Select a file** - Click any file to preview it
4. **Navigate folders** - Click folders to enter, click ".." to go back

### Preview Files

#### PDF Documents
- **Navigate**: Use Previous/Next buttons
- **Zoom**: Click Zoom In/Out or use the zoom percentage
- **Pages**: See current page and total pages

#### Source Code
- **Languages**: Automatically detected based on file extension
- **Highlighting**: Syntax highlighting for 25+ languages
- **Info**: View line count and language type

#### Excel Files
- **Sheets**: Click tabs at the top to switch between sheets
- **Scroll**: Use mouse or scrollbar to view large tables

#### Images
- **View**: Images are automatically scaled to fit
- **Quality**: High-resolution rendering

#### Word Documents
- **Formatting**: Basic formatting is preserved
- **Layout**: Converted to web-friendly format

#### Markdown
- **Rendered**: See the formatted output
- **Styles**: Headers, lists, code blocks, tables all supported

### Execute Commands

1. **Show Panel**: Click "Show Command Panel" button
2. **Type Command**: Enter any shell command
3. **Execute**: Press Enter or click Execute
4. **View Output**: See results in the terminal display
5. **Clear**: Click Clear to remove output history

**Example Commands:**
```bash
ls -la
pwd
git status
npm --version
python --version
cat myfile.txt
```

### File Browser Features

**Path Input**: Type or paste any directory path and press Enter
**Browse Button**: Opens system folder picker
**File Sizes**: Displayed next to files (not folders)
**Icons**: Color-coded icons for different file types

### Keyboard Shortcuts

- **Enter** (in command panel): Execute command
- **Enter** (in path field): Navigate to path

### Tips

1. **Large Files**: The app handles large files efficiently, but very large PDFs or spreadsheets may take a moment to load
2. **Unsupported Files**: If a file type isn't supported, you'll see a helpful message
3. **Working Directory**: Commands execute in the currently browsed directory
4. **Show in Folder**: Click the 📁 icon in preview header to reveal file in your system file manager

## Supported File Types

### Documents
- PDF (.pdf)
- Word (.docx, .doc)
- Excel (.xlsx, .xls, .csv)
- Markdown (.md, .markdown)
- Plain Text (.txt, .log, .conf, .ini, .cfg)

### Images
- PNG, JPG, JPEG, GIF, BMP, WebP, SVG

### Code Files
- JavaScript/TypeScript: .js, .jsx, .ts, .tsx
- Web: .html, .css, .scss, .xml
- Python: .py
- Java: .java
- C/C++: .c, .cpp, .h
- C#: .cs
- Go: .go
- Rust: .rs
- Ruby: .rb
- PHP: .php
- Swift: .swift
- Kotlin: .kt
- SQL: .sql
- Shell: .sh, .bash
- Config: .json, .yaml, .yml

## Troubleshooting

### App doesn't start
- Make sure `npm install` completed successfully
- Check that port 5173 is not in use
- Try running `npm run dev:vite` and `npm run dev:electron` separately

### Preview not working
- Check the file isn't corrupted
- Ensure the file extension is correct
- Try refreshing by selecting another file and coming back

### Command panel errors
- Ensure the command is valid for your operating system
- Check you have permissions for the operation
- Verify you're in the correct directory

## Next Steps

- Explore the full [FEATURES.md](FEATURES.md) documentation
- Read about [Installation](SETUP.md) for production deployment
- Check the main [README.md](README.md) for overview

## Getting Help

If you encounter issues:
1. Check that all dependencies are installed
2. Verify Node.js version compatibility
3. Review console output for error messages
4. Check file permissions for the files you're trying to preview

Enjoy using File Preview App!
