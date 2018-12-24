
const log = require('electron-log');
const {ipcRenderer} = require('electron');
const $ = require('jquery');
const QRCode = require('qrcode');
const domtoimage = require('dom-to-image');


const printPreviewButton = document.querySelector(".printPreviewButton");
printPreviewButton.addEventListener('click', (clickEvent) => {

    var response = ipcRenderer.sendSync('printPreview', null);

    console.log("printPrviewButton is clicked");
})
