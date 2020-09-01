const { app, BrowserWindow, ipcMain, Menu, ipcRenderer } = require('electron');
const url = require('url');
const path = require('path');
const main = require('electron-reload');

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
    const mainMenu = Menu.buildFromTemplate(templateMenu);

    Menu.setApplicationMenu(mainMenu);



    ipcMain.on('process:DecimalAFlotante', (e, objectProcess) => {
        processWindows = new BrowserWindow({
            height: 400,
            width: 350,
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
            width: 350,
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


const templateMenu = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Punto Decimal a Flotante',
                acelerator: 'CTRL+F',
                click() {
                    mainWindow.webContents.on('did-finish-load', () => {
                        mainWindow.webContents.send('Menu:flotanteDecimal');
                        
                    });
                }
            
            },
            {
                label: "Punto Flotante a Decimal",
                acelerator: "CTRL+F",
                click(){

                }
            },
            {
                label: "Epsilon",
                acelerator:"CTRL+E",
                click(){

                }
            },
            {
                label:"Salir",
                acelerator:"CTRL+Q",
                click(){}
            }
        ]

    },

]