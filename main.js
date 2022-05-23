const { app, BrowserWindow ,MessageChannelMain } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');
  //win.webContents.openDevTools();
  // const { port1, port2 } = new MessageChannelMain();

  // // It's OK to send a message on the channel before the other end has
  // // registered a listener. Messages will be queued until a listener is
  // // registered.
  // port2.postMessage({ test: 21 })

  // // We can also receive messages from the main world of the renderer.
  // port2.on('message', (event) => {
  //   console.log('from renderer main world:', event.data)
  // })
  // port2.start()

  // // The preload script will receive this IPC message and transfer the port
  // // over to the main world.
  // win.webContents.postMessage('main-world-port', null, [port1])
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

