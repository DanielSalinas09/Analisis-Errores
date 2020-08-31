const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'prodution')
    require('electron-reload')(__dirname, {

    })
let mainWindow;
let processWindows;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
            height: 550,
            width: 850,
            webPreferences: {
                nodeIntegration: true
            }
        }),
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views/principalPage.html'),
            protocol: 'file',

        }));


    ipcMain.on('process:DecimalAFlotante', (e, objectProcess) => {
        processWindows = new BrowserWindow({
            height: 350,
            width: 550,
            webPreferences: {
                nodeIntegration: true
            }
        });
        processWindows.loadURL(url.format({
            pathname: path.join(__dirname, 'views/processPage.html'),
            protocol: 'file',

        }));

        processWindows.webContents.on('did-finish-load', () => {
            processWindows.webContents.send('process:viewDecimal', objectProcess);
        })
    });
    ipcMain.on('process:flotanteADecimal', (e, objectProcess) => {
        processWindows = new BrowserWindow({
            height: 350,
            width: 550,
            webPreferences: {
                nodeIntegration: true
            }
        });
        processWindows.loadURL(url.format({
            pathname: path.join(__dirname, 'views/processPage.html'),
            protocol: 'file',

        }));

        processWindows.webContents.on('did-finish-load', () => {
            processWindows.webContents.send('process:viewFlotante', objectProcess);
        })
    });
});