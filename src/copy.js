const fs = require('fs-extra');
const path = require('path');
async function copyFiles() {
    const dirname = __dirname.replace(/src/,'');
    try {
        const now = new Date().toISOString().split('.')[0].replace(/:/g,'-');
        const folderName = path.join(dirname, '/output/'+ now +'_' + Math.ceil(Math.random() * 10)); 
        await fs.mkdir(folderName);
        await fs.copy(path.join(dirname,'./input/'), folderName);
       // logger.trace(`copy ${dirname} to ${folderName}`);
       console.log(`copy ${dirname} to ${folderName}`);
       
        return folderName;

    } catch (err) {
        alert(`copy ${dirname} fail`)
        console.error(`copy ${dirname} fail`);
    }
}
module.exports =  {
    copyFiles
}