const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if (canceled) {

    } else {
        return filePaths[0]
    }
}


function handleSetTitle(event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
    })

    mainWindow.loadFile('index.html')
}


app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    ipcMain.on('set-title', handleSetTitle)
    createWindow()
    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})