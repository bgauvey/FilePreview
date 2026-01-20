# Changelog

## Version 1.3.0 - Large File Handling & UX Improvements

### Added
- **Large File Protection**: Automatic size check before loading files
  - Warns user before loading files larger than 10 MB
  - Displays file size in megabytes in confirmation dialog
  - User can choose to proceed or cancel preview
  - Prevents application slowdown from large files
- **Wait Cursors**: Visual feedback for all operations
  - File operations (copy, cut, paste, delete, rename) show wait cursor
  - File size checking shows loading spinner
  - Improved user experience during long operations

### Technical Changes
- File size check using getFileInfo before rendering preview
- Wait cursor applied to document.body during async operations
- Loading state with animated spinner
- Cancelled preview state with file size display

---

## Version 1.2.0 - File Operations Toolbar

### Added
- **File Operations Toolbar**: Comprehensive file management interface
  - Copy/Cut/Paste operations with visual clipboard feedback
  - Rename files with inline prompts
  - Delete files with confirmation dialogs
  - Open files in system's default editor
  - Refresh directory button
  - Status messages for all operations
  - Wait cursors for all file operations
- **SVG Rendering**: SVG files now render as images instead of code
- **IPC Handlers**: New electron main process handlers for file operations
  - copyFile, cutFile, pasteFile
  - deleteFile, renameFile
  - openInEditor (uses system default application)

### Fixed
- **TypeScript Build Errors**: Fixed 22 compilation errors in CodePreview
  - Added type assertions (`as any`) to Prism.js component imports (21 files)
  - Added type assertion to CSS theme import
  - Resolved "Could not find declaration file" errors
  - Build now completes successfully without errors

### Technical Changes
- New FileToolbar component with clipboard state management
- Extended electronAPI with file operation methods
- Added FileOperationResult interface for type safety
- Integrated toolbar into FileBrowser component
- Type assertions for dynamic Prism.js imports

---

## Version 1.1.0 - Bug Fixes and Improvements

### Fixed
- **Source Code Preview**: Fixed syntax highlighting functionality
  - Changed from static imports to dynamic imports for Prism.js
  - Improved error handling and fallback to plain text
  - Fixed compatibility issues with Electron bundling
  - Language grammars are now loaded on-demand

### Added
- **Hidden Files Filter**: Files starting with "." are now hidden by default
  - Added "Show hidden files" checkbox toggle in file browser
  - User can easily reveal/hide hidden files with one click
  - Improves clarity when browsing directories

### Technical Changes
- CodePreview component refactored to use dynamic imports
- Prism.js loads asynchronously with proper error handling
- FileBrowser filters hidden files by default
- State management for hidden files visibility toggle

---

## Version 1.0.0 - Initial Release

### Features
- File browser with directory navigation
- Multi-format preview support:
  - PDF documents with page navigation and zoom
  - Markdown rendering
  - Word documents (.docx, .doc)
  - Excel spreadsheets (.xlsx, .xls, .csv)
  - Images (PNG, JPG, GIF, SVG, BMP, WebP)
  - Source code with syntax highlighting (25+ languages)
  - Plain text files
- Command panel for executing shell commands
- Dark theme UI
- Smart file type icons
- Show file in system folder feature

### Technology Stack
- Electron 28
- React 18
- TypeScript 5
- Vite 5
- PDF.js for PDF rendering
- Prism.js for syntax highlighting
- Mammoth for Word documents
- XLSX for Excel files
- Marked for Markdown
