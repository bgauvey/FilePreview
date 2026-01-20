# File Operations Guide

## Overview

The File Preview App now includes a comprehensive file operations toolbar that provides common file management functionality directly within the application.

## Features

### 1. Copy File
**Button**: 📋 Copy
**Shortcut**: Ctrl+C (visual hint)

- Copies the selected file to an internal clipboard
- File content is stored in memory
- Visual confirmation message shows the copied filename
- Does not affect system clipboard
- Can copy any file type

**How it works:**
1. Select a file in the file browser
2. Click the "Copy" button
3. See confirmation: "Copied: [filename]"
4. The file is now ready to paste

### 2. Cut File
**Button**: ✂️ Cut
**Shortcut**: Ctrl+X (visual hint)

- Cuts the selected file for moving
- File content is stored in memory
- Original file will be deleted after pasting
- Visual confirmation message shows the cut filename
- Cannot cut directories (safety feature)

**How it works:**
1. Select a file in the file browser
2. Click the "Cut" button
3. See confirmation: "Cut: [filename]"
4. After pasting, the original file is removed

### 3. Paste File
**Button**: 📌 Paste
**Shortcut**: Ctrl+V (visual hint)

- Pastes the file from clipboard to current directory
- Works with both copied and cut files
- Automatically refreshes directory view
- Handles name conflicts by overwriting
- Clears clipboard after cut operation

**How it works:**
1. After copying or cutting a file
2. Navigate to destination directory
3. Click the "Paste" button
4. See confirmation: "Pasted: [filename]"
5. Directory refreshes automatically

### 4. Rename File
**Button**: ✏️ Rename
**Shortcut**: F2 (visual hint)

- Renames the selected file or directory
- Shows native prompt dialog with current name
- Validates new name before renaming
- Automatically refreshes directory view
- Preserves file extension by default

**How it works:**
1. Select a file in the file browser
2. Click the "Rename" button
3. Enter new name in the prompt dialog
4. Click OK to confirm
5. See confirmation: "Renamed to: [newname]"

### 5. Delete File
**Button**: 🗑️ Delete (Red)
**Shortcut**: Delete (visual hint)

- Deletes the selected file or directory
- Shows confirmation dialog before deletion
- Recursively deletes directories
- Automatically refreshes directory view
- Permanent deletion (no recycle bin)

**Safety Features:**
- Confirmation dialog with filename
- Red button color indicates danger
- Cancel option in dialog
- Cannot delete if no file selected

**How it works:**
1. Select a file in the file browser
2. Click the "Delete" button
3. Confirm deletion in dialog
4. See confirmation: "Deleted: [filename]"
5. Directory refreshes automatically

### 6. Open in Editor
**Button**: 📝 Edit

- Opens the selected file in the system's default editor
- Uses the operating system's file associations
- Works with any file type
- Non-blocking operation (app remains open)

**Examples:**
- `.txt` files → Notepad/TextEdit/gedit
- `.js` files → VS Code/Sublime/Atom
- `.docx` files → Microsoft Word
- `.png` files → Default image editor

**How it works:**
1. Select a file in the file browser
2. Click the "Edit" button
3. See confirmation: "Opening in default editor..."
4. File opens in associated application

### 7. Refresh Directory
**Button**: 🔄 Refresh

- Reloads the current directory contents
- Updates file list with latest changes
- Useful after external modifications
- Always enabled (no file selection needed)

**When to use:**
- After copying/pasting/deleting files
- After external file modifications
- To check for new files
- To update file metadata

## Visual Feedback

### Status Messages
All operations show temporary status messages:
- **Success**: Blue message bar, 3-second duration
- **Error**: Red message bar with error details
- **Action**: Shows operation and filename

### Button States
- **Enabled**: Normal colors, clickable
- **Disabled**: Grayed out, 40% opacity
- **Hover**: Highlighted with blue border
- **Active**: Blue background on click

### Button Requirements
| Button | Requires File Selection | Always Enabled |
|--------|------------------------|----------------|
| Copy | ✓ | |
| Cut | ✓ | |
| Paste | | ✓ (if clipboard has data) |
| Rename | ✓ | |
| Delete | ✓ | |
| Edit | ✓ | |
| Refresh | | ✓ |

## Technical Details

### Clipboard Management
- Internal clipboard state (not system clipboard)
- Stores file content as base64-encoded string
- Tracks source path and operation type (copy/cut)
- Automatically cleared after cut operation
- Persists during app session

### File Operations
All file operations use Node.js `fs` module through Electron IPC:
- **Read**: `fs.promises.readFile()`
- **Write**: `fs.promises.writeFile()`
- **Delete**: `fs.promises.unlink()` or `rmdir()`
- **Rename**: `fs.promises.rename()`
- **Open**: `shell.openPath()`

### Error Handling
- Try-catch blocks for all operations
- User-friendly error messages
- Operations fail gracefully
- No data loss on errors

### Security
- Operations limited to file system access
- No network operations
- Sandboxed renderer process
- Validation of file paths
- Confirmation dialogs for destructive actions

## Keyboard Shortcuts (Future)

Currently, shortcuts are shown as visual hints in tooltips. Future versions may implement actual keyboard shortcuts:

- `Ctrl+C` - Copy
- `Ctrl+X` - Cut
- `Ctrl+V` - Paste
- `F2` - Rename
- `Delete` - Delete
- `F5` - Refresh

## Limitations

1. **No Undo**: Deleted files cannot be recovered
2. **No Multi-Select**: Can only operate on one file at a time
3. **No Drag and Drop**: Must use toolbar buttons
4. **No System Clipboard**: Internal clipboard only
5. **No Progress Indicators**: For large file operations
6. **Overwrites**: Pasting overwrites existing files with same name

## Best Practices

1. **Before Deleting**: Double-check the filename in the confirmation dialog
2. **After Pasting**: Check that the file appears in the destination
3. **Large Files**: Be patient with copy/paste operations
4. **Cut Operations**: Ensure paste succeeds before assuming file moved
5. **Refresh**: Use refresh button if directory seems out of sync

## Troubleshooting

### Copy/Cut Not Working
- Ensure a file is selected (highlighted)
- Check file permissions
- Try refreshing the directory

### Paste Not Working
- Ensure you've copied or cut a file first
- Check write permissions in destination directory
- Ensure sufficient disk space

### Delete Fails
- Check file is not open in another application
- Verify file permissions
- For directories, check they're empty or confirm recursive delete

### Edit Opens Wrong Application
- Check file associations in your operating system
- Right-click file → Properties → Change default program
- On macOS: Get Info → Open with

## Future Enhancements

Planned features for future versions:
- Keyboard shortcut implementation
- Multi-file selection
- Drag and drop support
- Progress bars for large operations
- Undo/redo functionality
- Integration with system clipboard
- Duplicate file detection
- Batch operations
