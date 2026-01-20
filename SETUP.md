# Setup Instructions

## Prerequisites

Before running this application, you need to have Node.js installed on your system.

### Installing Node.js

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### Windows
Download and install from https://nodejs.org/

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

## Installation Steps

1. **Verify Node.js installation**:
```bash
node --version
npm --version
```

2. **Install project dependencies**:
```bash
npm install
```

This will install all required dependencies including:
- Electron
- React
- TypeScript
- Vite
- File parsing libraries (mammoth, xlsx, marked)

## Running the Application

After installation, you can run the app in development mode:

```bash
npm run dev
```

This will:
1. Start the Vite development server on http://localhost:5173
2. Launch the Electron application
3. Enable hot reload for development

## Building for Production

To create a production build:

```bash
# Build the application
npm run build

# Create distributable packages
npm run build:electron
```

The built application will be in the `release` directory.

## Troubleshooting

### Port 5173 already in use
If you get an error about port 5173 being in use, you can either:
- Stop the process using that port
- Change the port in `vite.config.ts`

### Electron window doesn't open
- Make sure the Vite dev server has started first
- Check the console for any errors
- Try running `npm run dev:vite` and `npm run dev:electron` separately

### Module not found errors
Run `npm install` again to ensure all dependencies are installed
