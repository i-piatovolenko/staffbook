const { app, BrowserWindow } = require('electron');
const { readFileSync, writeFileSync } = require('fs');
const { ipcMain } = require('electron');

const { PrismaClient } = require ('@prisma/client');

const prisma = new PrismaClient()

// A `main` function so that you can use async/await



function readConfig() {
  const data = readFileSync('./store.txt', 'utf8')
  return data
}

function writeStore() {
  writeFileSync('./store.txt', "New store!")
}

let users = [{id: 0, email: "120894v@gmail.com", name: "John"}];
async function main() {
  const allUsers = await prisma.user.findMany()
  users = allUsers;
  console.log(allUsers)
}
main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });

ipcMain.on('read-store', (event, arg) => {
  console.log(arg)
  event.returnValue = users;
})

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('index.html');
  win.webContents.openDevTools();
  // win.webContents.addListener('dom-ready', (e)=>{
  //   let store = {
  //     id: 1,
  //     name: "Ivan",
  //     age: 26,
  //     male: true
  //   }
  //   win.webContents.send('store-data', store);
  // });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})