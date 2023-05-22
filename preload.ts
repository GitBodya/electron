const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
