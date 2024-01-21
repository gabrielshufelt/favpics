const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    requestPictureFiles: (directoryPath) => {
        return new Promise((resolve, reject) => {
            ipcRenderer.once('picture-files', (event, pictureFiles) => {
                resolve(pictureFiles);
            });

            ipcRenderer.send('request-picture-files', directoryPath);
        });
    },
});


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })