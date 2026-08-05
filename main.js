const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 800,
    resizable: false, // برای حفظ ظاهر موبایلی
    titleBarStyle: 'hidden', // هدر پیش‌فرض ویندوز را مخفی می‌کند تا ظاهر مدرن‌تر شود
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // در حالت توسعه، آدرس لوکال‌هاست ریکت را باز می‌کند
  // در حالت بیلد شده، فایل index.html ساخته شده را باز می‌کند
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'build/index.html'));
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// این بخش در پروژه واقعی برای اتصال به وب‌سرویس واتس‌اپ یا تلگرام تکمیل می‌شود
ipcMain.handle('send-messages', async (event, data) => {
  const { platform, numbers, message } = data;
  console.log(`Starting to send via ${platform}...`);
  // منطق اتصال به puppeteer یا API در اینجا قرار می‌گیرد
  return { success: true };
});