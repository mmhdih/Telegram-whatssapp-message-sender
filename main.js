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
    // در حالت بیلد شده (تولید فایل exe)
    // مسیر دقیق پوشه build ریکت را مشخص می‌کنیم
    const buildPath = path.join(__dirname, 'build', 'index.html');
    
    // بررسی می‌کنیم که آیا فایل واقعا وجود دارد یا خیر (برای دیباگ در صورت لزوم)
    if (fs.existsSync(buildPath)) {
        mainWindow.loadFile(buildPath);
    } else {
        console.error('Build file not found at:', buildPath);
        // به عنوان راهکار پشتیبان، اگر فایل بالا پیدا نشد، مسیر دیگری را تست می‌کنیم
        mainWindow.loadFile(path.join(process.resourcesPath, 'app.asar', 'build', 'index.html'));
    }
  } else {
    // در حالت توسعه (اجرای لوکال با npm start)
    mainWindow.loadURL('http://localhost:3000');
  }
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
