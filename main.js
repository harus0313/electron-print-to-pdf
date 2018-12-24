const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const log = require('electron-log');
const fs = require('fs');
const PDFWindow = require('electron-pdf-window');

let mainWindow = null;

const {ipcMain} = require('electron');

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024, 
        height: 768,
        'node-integration': false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

//    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    })


})

ipcMain.on('printPreview', (event, args) => {
    log.info("print preview called");

    const win = BrowserWindow.fromWebContents(event.sender);    
    let cssdata = fs.readFileSync('frontstyle.css', 'utf8');
    win.webContents.insertCSS(cssdata);

    win.webContents.printToPDF({
        printBackground: true,
        pageSize: 'Letter',
        landscape: false
    }, (err, data) => {
        if(err) throw err;
        fs.writeFile('print.pdf', data, (error) => {
            if (error) throw error;
            log.info('print to pdf is finished');
        })
    })

    subWindow = new PDFWindow({
        width: 1024,
        height: 768
    });
    subWindow.loadURL('file://' + __dirname + '/print.pdf');

    event.returnValue = "0";
})