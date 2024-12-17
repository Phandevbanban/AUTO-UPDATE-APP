import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'

let mainWindow: BrowserWindow | null = null

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5173' // Adjust if using a different dev port
      : `file://${path.join(__dirname, '../renderer/index.html')}`
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Auto-update logic
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', () => {
    console.log('Update available')
    mainWindow?.webContents.send('update-available')
  })

  autoUpdater.on('update-downloaded', () => {
    console.log('Update downloaded')
    mainWindow?.webContents.send('update-downloaded')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    app.emit('ready')
  }
})
