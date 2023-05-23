const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI1', {
    doAThing: () => {}
})

contextBridge.exposeInMainWorld('myAPI', {
    desktop: true,
})

contextBridge.exposeInMainWorld('electronAPI', {
    setTitle: (title) => ipcRenderer.send('set-title', title)
})

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // we can also expose variables, not just functions
})