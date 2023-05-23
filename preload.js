const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI1', {
    doAThing: () => {}
})

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})