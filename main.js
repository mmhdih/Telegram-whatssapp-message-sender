const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    title: 'SmartSender Enterprise - Google Workspace Edition',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  if (app.isPackaged) {
    const possiblePaths = [
      path.join(process.resourcesPath, 'app.asar', 'build', 'index.html'),
      path.join(process.resourcesPath, 'app', 'build', 'index.html'),
      path.join(__dirname, 'build', 'index.html'),
      path.join(app.getAppPath(), 'build', 'index.html')
    ];

    let targetPath = null;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        targetPath = p;
        break;
      }
    }

    if (targetPath) {
      console.log('Loading production build from:', targetPath);
      mainWindow.loadFile(targetPath);
    } else {
      console.error('CRITICAL: build/index.html not found!');
      mainWindow.loadURL(`file://${path.join(__dirname, 'build', 'index.html')}`);
    }
  } else {
    // حالت توسعه (Development Mode)
    mainWindow.loadURL('http://localhost:3000');
  }

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Page load failed:', errorCode, errorDescription);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('send-messages', async (event, data) => {
  const { platform, numbers, message } = data;
  console.log(`Executing batch dispatch via ${platform} for ${numbers.length} targets...`);
  return { success: true };
});
