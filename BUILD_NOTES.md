# Build Notes

## TypeScript Compilation Issues

### Issue: Prism.js Component Import Errors

When running `npm run build`, TypeScript reported 21 errors related to dynamic imports of Prism.js language components.

#### Error Message:
```
error TS7016: Could not find a declaration file for module 'prismjs/components/prism-*'.
'/Users/.../node_modules/prismjs/components/prism-*.js' implicitly has an 'any' type.
```

#### Root Cause:
The Prism.js language component modules (e.g., `prism-javascript.js`, `prism-python.js`) are JavaScript files without corresponding TypeScript declaration files (`.d.ts`). When using dynamic `import()` statements in TypeScript, the compiler requires type information for the imported modules.

#### Solution:
Added type assertions (`as any`) to all dynamic Prism.js component imports to bypass TypeScript's type checking for these modules.

**Before:**
```typescript
await import('prismjs/components/prism-javascript');
await import('prismjs/components/prism-typescript');
// ... etc
```

**After:**
```typescript
await import('prismjs/components/prism-javascript' as any);
await import('prismjs/components/prism-typescript' as any);
// ... etc
```

#### Files Modified:
- `src/components/previews/CodePreview.tsx`

#### Why This Works:
1. The `as any` type assertion tells TypeScript to treat the import as type `any`
2. This bypasses type checking for the import statement
3. The actual runtime behavior is unchanged
4. Prism.js still works correctly because the grammars are loaded dynamically
5. The code remains safe because we have error handling in place

#### Alternative Solutions Considered:

1. **Create custom type declarations**: Could create `.d.ts` files for each Prism component
   - **Rejected**: Too much maintenance overhead, declarations would need updates with Prism.js

2. **Use `@ts-ignore` comments**: Could suppress errors with comments
   - **Rejected**: Less explicit than `as any`, harder to maintain

3. **Disable strict mode**: Could relax TypeScript compiler options
   - **Rejected**: Would reduce type safety across entire project

4. **Use require() instead of import()**: Could use CommonJS require
   - **Rejected**: Wouldn't work well with Vite's bundling system

#### Build Process:

The build now completes successfully:
```bash
npm run build
```

This command runs:
1. `tsc` - Compiles TypeScript for the renderer process
2. `vite build` - Bundles the React application
3. `tsc -p tsconfig.electron.json` - Compiles TypeScript for the Electron main process

All three steps should now complete without errors.

#### Runtime Safety:

Even though we're using `as any` for type assertions:
1. Error handling catches any import failures
2. Fallback to plain text if Prism.js fails to load
3. Grammar existence is checked before highlighting
4. Console warnings notify developers of any issues

#### Future Improvements:

If Prism.js adds official TypeScript support or community-maintained type definitions become available:
1. Install `@types/prismjs` with component types
2. Remove `as any` type assertions
3. Enjoy full type safety for Prism.js imports

## Other Build Considerations

### CSS Imports:
The CSS theme import also requires type assertion:
```typescript
await import('prismjs/themes/prism-tomorrow.css' as any);
```

This is necessary because CSS files don't have TypeScript declarations. Vite handles CSS imports automatically at runtime.

### Performance:
Dynamic imports are loaded on-demand, which:
- Reduces initial bundle size
- Improves app startup time
- Only loads grammars for files being viewed

### Browser Compatibility:
Dynamic import() is supported in:
- Chrome/Edge: 63+
- Firefox: 67+
- Safari: 11.1+
- Electron: All recent versions

Since this is an Electron app, browser compatibility is guaranteed.

## Build Commands Reference

```bash
# Development build
npm run dev

# Production build (TypeScript + Vite)
npm run build

# Create electron distributables
npm run build:electron

# Preview production build
npm run preview
```

## Troubleshooting

### If build still fails:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check TypeScript version**:
   ```bash
   npx tsc --version
   # Should be 5.3.3 or higher
   ```

3. **Verify all dependencies installed**:
   ```bash
   npm ls prismjs
   npm ls @types/prismjs
   ```

4. **Check tsconfig.json settings**:
   - `strict: true` should be enabled
   - `skipLibCheck: true` should be enabled

### Common Errors:

**Error: Cannot find module 'prismjs'**
- Solution: Run `npm install`

**Error: Prism is not defined**
- Solution: Check that dynamic import is awaited
- Verify error handling catches import failures

**Error: languages[language] is undefined**
- Solution: Add more specific error handling
- Check that language grammar loaded successfully

## Success Indicators:

When build succeeds, you should see:
```
✓ built in XXXms
```

And the output directories should contain:
- `dist/renderer/` - React app bundle
- `dist/electron/` - Electron main process files
