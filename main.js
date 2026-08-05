const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 800,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    // بررسی مسیرهای مختلف در حالت بیلد شده برای جلوگیری از خطای صفحه سفید
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
      console.log('Loading index from:', targetPath);
      mainWindow.loadFile(targetPath);
    } else {
      console.error('CRITICAL: Build index.html not found in any standard path!');
      mainWindow.loadURL(`file://${path.join(__dirname, 'build', 'index.html')}`);
    }
  } else {
    // در حالت توسعه
    mainWindow.loadURL('http://localhost:3000');
  }

  // ثبت خطاهای احتمالی لود صفحه
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
  console.log(`Starting to send via ${platform}...`);
  return { success: true };
});
