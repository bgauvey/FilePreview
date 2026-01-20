# Performance & User Experience Enhancements

## Overview

Version 1.3.0 introduces intelligent file size management and visual feedback improvements to ensure smooth operation even with large files.

## Large File Protection

### Feature Description
Before loading any file for preview, the application now checks its size and warns the user if the file exceeds 10 MB.

### How It Works

1. **File Selection**: User clicks on a file in the browser
2. **Size Check**: Application reads file metadata using `getFileInfo()`
3. **Evaluation**: File size is compared against 10 MB threshold
4. **User Prompt**: If file is large, confirmation dialog appears
5. **User Decision**: User chooses to proceed or cancel

### Configuration

The threshold is defined in `FilePreview.tsx`:
```typescript
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024; // 10 MB
```

To change the threshold, modify this constant.

### User Interface

#### Small Files (< 10 MB)
- Files load immediately
- No prompts or warnings
- Normal preview behavior

#### Large Files (>= 10 MB)
**Confirmation Dialog:**
```
This file is 45.23 MB. Loading large files may slow down the application.

Do you want to proceed?
[Cancel] [OK]
```

**If User Clicks OK:**
- File loads normally
- Preview renders as usual
- May experience temporary slowdown

**If User Clicks Cancel:**
- Preview shows cancelled state
- Displays file size information
- No performance impact

### Benefits

1. **Prevents Application Freezing**: Large files can cause UI lag
2. **Informed Decision**: User knows file size before loading
3. **Resource Management**: Avoids unnecessary memory consumption
4. **Better UX**: No unexpected slowdowns

### Examples by File Type

| File Type | 10 MB Contains Approximately |
|-----------|------------------------------|
| Plain Text | 10 million characters |
| Source Code | ~300,000 lines of code |
| PDF | 500-1000 pages |
| Excel | 100,000+ rows of data |
| Images | 10-20 high-res photos |
| Word Docs | 5,000-10,000 pages |

## Wait Cursors

### Overview
All asynchronous file operations now display a wait cursor to indicate the application is processing.

### Implementation

#### Global Cursor Change
```typescript
document.body.style.cursor = 'wait';
try {
  // Async operation
} finally {
  document.body.style.cursor = 'default';
}
```

This ensures:
- User knows operation is in progress
- Prevents confusion about application responsiveness
- Standard system wait cursor (typically hourglass or spinning wheel)

### Operations with Wait Cursors

#### File Operations
- **Copy**: Reading file content
- **Cut**: Reading file content
- **Paste**: Writing file to disk
- **Delete**: Removing file/directory
- **Rename**: File system rename operation

#### File Preview
- **Size Check**: Reading file metadata
- **Large File Prompt**: Waiting for user decision

### Visual States

#### During Operation
```
Cursor: ⏳ (wait/busy cursor)
Status: "Operation in progress..."
```

#### After Completion
```
Cursor: ➡️ (default cursor)
Status: Success/error message displayed
```

## Loading States

### File Size Check Loading

When checking if a file is too large:

**Visual Display:**
```
┌─────────────────────────┐
│                         │
│       ⟳ Spinner         │
│                         │
│  Checking file size...  │
│                         │
└─────────────────────────┘
```

**CSS Animation:**
- Rotating spinner (48px diameter)
- Blue accent color (#0e639c)
- Smooth 1-second rotation
- Centered in preview area

### Cancelled Preview State

When user cancels loading a large file:

**Visual Display:**
```
┌─────────────────────────┐
│                         │
│          ⚠️            │
│                         │
│   Preview cancelled     │
│                         │
│   File size: 45.23 MB   │
│                         │
└─────────────────────────┘
```

## Performance Considerations

### File Size Threshold Rationale

**Why 10 MB?**

1. **Text Files**: 10 MB of text is ~10 million characters
   - Syntax highlighting can be slow on this much text
   - DOM rendering may lag
   - Reasonable warning point

2. **Binary Files**: 10 MB is moderate size
   - PDFs: Usually renders fine
   - Images: Can cause memory pressure
   - Office docs: May take time to parse

3. **User Experience**: Balance between safety and convenience
   - Most files under 10 MB load quickly
   - Files over 10 MB often legitimately slow
   - Threshold is adjustable

### Memory Management

**Before Large File Protection:**
- User could accidentally open 500 MB file
- Application would freeze or crash
- No warning or escape route

**After Large File Protection:**
- User is warned about large files
- Can make informed decision
- Application remains responsive

### Alternative Threshold Sizes

```typescript
// Conservative (5 MB)
const LARGE_FILE_THRESHOLD = 5 * 1024 * 1024;

// Moderate (10 MB) - DEFAULT
const LARGE_FILE_THRESHOLD = 10 * 1024 * 1024;

// Permissive (25 MB)
const LARGE_FILE_THRESHOLD = 25 * 1024 * 1024;

// Very Permissive (50 MB)
const LARGE_FILE_THRESHOLD = 50 * 1024 * 1024;
```

Choose based on your use case and target hardware.

## Technical Details

### File Size Check Flow

```
1. User clicks file
   ↓
2. FilePreview.useEffect triggered
   ↓
3. checkFileSize() called
   ↓
4. Show loading state with spinner
   ↓
5. Call electronAPI.getFileInfo()
   ↓
6. Receive file metadata
   ↓
7. Compare size to threshold
   ↓
8. If > 10 MB: Show confirmation dialog
   ↓
9. User decision:
   - OK: setCanPreview(true)
   - Cancel: setCanPreview(false)
   ↓
10. Render appropriate view
```

### State Management

**FilePreview Component States:**
```typescript
const [fileType, setFileType] = useState<string | null>(null);
const [fileSize, setFileSize] = useState<number>(0);
const [canPreview, setCanPreview] = useState<boolean>(true);
const [loading, setLoading] = useState<boolean>(false);
```

**State Combinations:**
| loading | canPreview | fileSize | Result |
|---------|-----------|----------|---------|
| true | - | - | Show loading spinner |
| false | false | > 10MB | Show cancelled message |
| false | true | any | Show file preview |

### Error Handling

If file size check fails:
```typescript
catch (error) {
  console.error('Failed to get file info:', error);
  setCanPreview(true); // Allow preview attempt
}
```

This ensures the application remains usable even if metadata reading fails.

## User Feedback

### Visual Indicators

1. **Wait Cursor**: System-native busy indicator
2. **Loading Spinner**: Animated rotation, consistent branding
3. **Status Messages**: Toolbar feedback for operations
4. **Confirmation Dialogs**: Standard system dialogs

### Message Examples

**Copy Operation:**
```
Cursor: wait
Message: "Copied: document.pdf"
Duration: 3 seconds
```

**Large File:**
```
Dialog: "This file is 25.67 MB. Loading large files may slow down the application.\n\nDo you want to proceed?"
Buttons: [Cancel] [OK]
```

## Future Enhancements

### Potential Improvements

1. **Configurable Threshold**: User setting for file size limit
2. **Progressive Loading**: Load files in chunks
3. **Lazy Rendering**: Only render visible portion
4. **Virtual Scrolling**: For very long files
5. **Background Loading**: Load in web worker
6. **Memory Monitoring**: Check available RAM before loading
7. **File Type Specific Limits**: Different thresholds per type

### Advanced Features

```typescript
// Potential settings interface
interface PreviewSettings {
  maxFileSize: number;           // 10 MB default
  enableWarnings: boolean;       // true default
  autoRejectSize: number;        // Never load files larger than this
  preloadNextFile: boolean;      // Preload next file in directory
  cacheRecentFiles: boolean;     // Keep recent files in memory
}
```

## Best Practices

### For Users

1. **Close Other Apps**: When opening very large files
2. **Use External Editor**: For files you need to edit
3. **Check File Size First**: Right-click → Properties before opening
4. **Be Patient**: Large files take time to render

### For Developers

1. **Test with Large Files**: Verify warning system works
2. **Monitor Performance**: Check CPU/memory during large loads
3. **Adjust Threshold**: Based on user feedback and hardware
4. **Profile Renders**: Identify bottlenecks in preview components

## Troubleshooting

### Warning Doesn't Appear
- Check if file is actually > 10 MB
- Verify `getFileInfo()` is working
- Check browser console for errors

### Application Still Freezes
- File may be much larger than 10 MB
- Consider lowering threshold
- Some file types may have parsing issues

### False Positives
- Threshold may be too low
- Increase `LARGE_FILE_THRESHOLD`
- Consider file-type-specific thresholds

## Conclusion

The large file protection and wait cursor features significantly improve the user experience by:

1. **Preventing Crashes**: No more accidental huge file loads
2. **Setting Expectations**: Users know when operations take time
3. **Maintaining Responsiveness**: Application feels faster and more professional
4. **Empowering Users**: Users make informed decisions about file previews

These features make the File Preview app more robust and production-ready.
