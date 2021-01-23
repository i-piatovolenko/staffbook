const webContent = require('electron');
const ipcRenderer = require('electron').ipcRenderer;


ipcRenderer.on('store-data', function (event, store) {
  console.log(store);
  document.querySelector('#root').append(store.name)
});

let config = ipcRenderer.sendSync('read-store', '')
console.log(config);

// ipcRenderer.sendSync('write-store', '')
