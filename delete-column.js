
const { copyFiles } = require('./src/copy');
const { dealScri } = require('./src/find-all');
const { logger, configureLoger } = require('./src/report');
const { readWorksheetFromFile, spliceColumns } = require('./src/del-col');
const { ipcRenderer } = require('electron');


const popUp= ({action,data})=>{
    const infoBarEl = document.querySelector('#info-bar');
    switch(action){
        case 'onCount':
            infoBarEl.innerHTML = `开始无聊又漫长的等待, 一共要预处理${data.fileLen}个文件。`
            const deleteButton = document.querySelector('#delete-Column-button');
            deleteButton.disabled = true;
            deleteButton.innerHTML = '处理中。。。';
            break;
        case 'onStartOne':
            infoBarEl.innerHTML = `开始处理${data.filepath}，继续无聊又漫长的等待`
            break;
        case 'onDoneOne':
            infoBarEl.innerHTML = `处理完${data.filepath}，继续无聊又漫长的等待`
            break;
        case 'onDoneAll':
            setTimeout(() => {
                //alert('Done!, please check result in ' + folderName);
                infoBarEl.innerHTML = `一共处理左${data.fileLen}个文件，去${data.folderName}拿货。`
                logger.info(`All Done, total ${data.fileLen} files processed`);
                const deleteButton =  document.querySelector('#delete-Column-button');
                if(deleteButton){
                    deleteButton.disabled = false;
                    deleteButton. innerHTML = '批量删除列';
                }
            }, 1000);
            
            break;
    }
};

const deleteColumn = async ({ pws, delCol }) => {
    const folderName = await copyFiles();
    configureLoger({ folder: folderName });
    try {
        const files = dealScri(folderName);
        const fileLen = files.length;
        popUp({action:'onCount', data:{ fileLen }});
        files.forEach(async (filepath, idx) => {
            const worksheet = await readWorksheetFromFile(filepath, pws);
            popUp({action:'onStartOne', data:{ filepath }});
            if (worksheet) {
                let _filepath = filepath.slice(-1) === 'x' ? filepath : filepath + 'x';
                await spliceColumns(delCol, worksheet, _filepath);
                popUp({action:'onDoneOne', data:{ filepath: _filepath }});
                if (fileLen - 1 === idx) {
                    popUp({action:'onDoneAll', data:{ folderName, fileLen }});
                }
            } else {
                if (fileLen - 1 === idx) {
                    popUp({action:'onDoneAll', data:{ folderName, fileLen }});
                }
            }
        });
    } catch (error) {
        console.log(error)
        logger.error('Something wrong in [deleteColumn]: ' + error);
    }
}







module.exports = {
    deleteColumn
}