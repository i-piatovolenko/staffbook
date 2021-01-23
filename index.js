const ipcRenderer = require('electron').ipcRenderer;

let config = ipcRenderer.sendSync('read-store', '')
console.log(config);
