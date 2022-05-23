const { ipcRenderer,contextBridge } = require('electron');
const {deleteColumn} = require('./delete-column');
// const windowLoaded = new Promise(resolve => {
//   window.onload = resolve
// })



window.addEventListener('DOMContentLoaded', () => {
    // const replaceText = (selector, text) => {
    //   const element = document.getElementById(selector)
    //   if (element) element.innerText = text
    // }
  
    // for (const type of ['chrome', 'node', 'electron']) {
    //   replaceText(`${type}-version`, process.versions[type])
    // }
    // port1.onmessage = (event) => {
    //   console.log(event)
    // }
    // ipcRenderer.on('main-world-port', async (event) => {
    //     await windowLoaded
    //     // We use regular window.postMessage to transfer the port from the isolated
    //     // world to the main world.
    //     window.postMessage('main-world-port', '*', event.ports)
    //   })
    // ipcRenderer.on('onDoneAll', (event, json) => {
    //   const data = JSON.parse(json);
    //   console.log(data)
    // });
    // ipcRenderer.on('onCount', (event, json) => {
    //   const data = JSON.parse(json);
    //   console.log(data)
    // });
    
    // ipcRenderer.on('onStartOne', (event, json) => {
    //   const data = JSON.parse(json);
    //   console.log(data)
    // });
    
  })
  


  // const onDone =(folderName,fileLen)=>{
  //   setTimeout(() => {
  //       //alert('Done!, please check result in ' + folderName);
  //       logger.info(`All Done, total ${fileLen} files processed`);
  //       const deleteButton =  document.querySelector('#delete-Column-button');
  //       if(deleteButton){
  //           deleteButton.disabled = false;
  //           deleteButton. innerHTML = '批量删除列';
  //       }
      
  //   }, 1000);
  // }
  

  


  contextBridge.exposeInMainWorld('myAPI', {
    deleteColumn
  })