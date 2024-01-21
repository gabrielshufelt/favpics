const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'FavPics',
        width: isDev ? 1000 : 500,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // Open devtools if in dev env
    if (isDev) {
        // mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));

    // Handle the 'request-picture-files' event from the renderer process
    ipcMain.on('request-picture-files', (event, directoryPath) => {
        try {
            const pictureFiles = getPictureFiles(directoryPath);
            console.log(pictureFiles);
            event.reply('picture-files', pictureFiles);
        } catch (error) {
            console.error('Error reading directory:', error);
            event.reply('picture-files', []);
        }
    });
}

function getPictureFiles(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    return files.filter(file => file.endsWith('.JPG') || file.endsWith('.PNG'));
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});
