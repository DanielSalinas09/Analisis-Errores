const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

if (process.env.NODE_ENV !== 'prodution')
    require('electron-reload')(__dirname, {

    })
let mainWindow
app.on('ready', () => {

    mainWindow = new BrowserWindow({
            height: 550,
            width: 850
        }),
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'views/principalPage.html'),
            protocol: 'file',

        }))
});