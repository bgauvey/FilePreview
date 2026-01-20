# File Preview App - Feature Documentation

## Overview

The File Preview App is a comprehensive desktop application that supports previewing a wide variety of file formats with specialized rendering for each type.

## Supported File Types

### 1. PDF Documents (.pdf)
**Features:**
- High-quality rendering using PDF.js
- Page-by-page navigation
- Zoom controls (50% - 300%)
- Page counter display
- Optimized for large documents

**Controls:**
- Previous/Next buttons for page navigation
- Zoom In/Out buttons
- Current zoom percentage display

### 2. Markdown Files (.md, .markdown)
**Features:**
- Full Markdown syntax support
- Rendered HTML output
- Syntax highlighting for code blocks
- Table support
- Link preservation
- Image embedding

**Supported Elements:**
- Headers (H1-H6)
- Lists (ordered/unordered)
- Code blocks and inline code
- Blockquotes
- Tables
- Links and images

### 3. Word Documents (.docx, .doc)
**Features:**
- Text formatting preservation
- Paragraph structure
- Lists and tables
- Basic styling support
- Powered by Mammoth.js

### 4. Excel Spreadsheets (.xlsx, .xls, .csv)
**Features:**
- Multi-sheet support with tab navigation
- Cell data display
- Table formatting
- Automatic data type detection
- First row highlighting (headers)

**Navigation:**
- Sheet tabs for multi-sheet workbooks
- Scrollable table view
- Responsive column sizing

### 5. Images
**Supported Formats:**
- PNG
- JPG/JPEG
- GIF
- BMP
- WebP
- SVG

**Features:**
- High-quality rendering
- Automatic scaling
- Centered display
- Dark background for better visibility

### 6. Source Code Files

**Supported Languages:**

#### JavaScript Ecosystem
- JavaScript (.js)
- JSX (.jsx)
- TypeScript (.ts)
- TSX (.tsx)
- JSON (.json)

#### Web Technologies
- HTML (.html)
- CSS (.css)
- SCSS (.scss)
- XML (.xml)
- SVG (.svg)

#### Backend Languages
- Python (.py)
- Java (.java)
- C (.c)
- C++ (.cpp)
- C# (.cs)
- Go (.go)
- Rust (.rs)
- Ruby (.rb)
- PHP (.php)
- Swift (.swift)
- Kotlin (.kt)

#### Database & Config
- SQL (.sql)
- YAML (.yaml, .yml)
- Shell Scripts (.sh, .bash)

**Code Preview Features:**
- Syntax highlighting with Prism.js
- Line count display
- Language detection
- File extension badge
- Monospace font rendering
- Dark theme optimized

### 7. Plain Text Files
**Supported Formats:**
- .txt
- .log
- .conf
- .ini
- .cfg

**Features:**
- Simple text rendering
- Line count
- Monospace font
- No formatting overhead

## File Browser

**Features:**
- Directory navigation
- File/folder icons
- File size display (for files)
- Sorting (directories first, then alphabetical)
- Parent directory navigation (..)
- Path input field for direct navigation
- Browse button for system folder picker

**File Icons:**
- 📁 Folders
- 📕 PDF files
- 📝 Markdown files
- 📘 Word documents
- 📗 Excel spreadsheets
- 🖼️ Images
- 🟨 JavaScript files
- 🔷 TypeScript files
- 🐍 Python files
- ☕ Java files
- 🐹 Go files
- 🦀 Rust files
- 💎 Ruby files
- 🐘 PHP files
- 🎨 CSS/SCSS files
- 🌐 HTML/XML files
- 🗄️ SQL files
- 💻 Shell scripts
- And more...

## Command Panel

**Features:**
- Execute shell commands
- Working directory awareness
- Command history display
- Output capture (stdout/stderr)
- Error handling
- Clear output function

**Usage:**
- Type commands in the input field
- Press Enter to execute
- View output in the terminal-style display
- Commands execute in the current browsed directory

## User Interface

**Layout:**
- Left panel: File browser (350px width)
- Center panel: File preview (expandable)
- Bottom panel: Command panel (toggleable, 250px height)

**Theme:**
- Dark theme throughout
- VS Code inspired color scheme
- High contrast for readability
- Custom scrollbars

**Preview Header:**
- Filename display
- Action buttons
- "Show in folder" button to reveal file in system

## Keyboard & Mouse Interactions

**File Browser:**
- Click file: Preview file
- Click folder: Navigate into folder
- Click "..": Go to parent directory
- Type in path field: Navigate to custom path

**Command Panel:**
- Enter: Execute command
- Type freely in input field

**PDF Viewer:**
- Click Previous/Next: Navigate pages
- Click Zoom buttons: Adjust zoom level

**Excel Viewer:**
- Click sheet tabs: Switch between sheets

## Technical Implementation

**Architecture:**
- Electron main process for file system access
- React renderer process for UI
- IPC communication for security
- Context isolation enabled
- Preload script for API exposure

**Performance:**
- Lazy loading of preview components
- Buffer-based file reading
- Efficient rendering for large files
- Minimal re-renders

**Security:**
- Sandboxed renderer process
- No direct Node.js access from UI
- Validated IPC messages
- Safe file path handling

## Future Enhancement Ideas

- Search functionality within files
- File editing capabilities
- Diff viewer for code files
- Video and audio preview
- Archive file browsing (.zip, .tar, etc.)
- Bookmarks/favorites
- Recent files list
- Multiple file tabs
- Print functionality
- Export/convert features
