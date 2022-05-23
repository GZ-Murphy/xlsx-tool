const ExcelJS = require('exceljs');
const { logger } = require('./report');
const XLSX = require('xlsx');
const XlsxPopulate = require('xlsx-populate');

const path = require('path');
const fs = require('fs-extra');

const cp = require("child_process");



const readWorksheetFromFile = async (filename, pws) => {
    let workbook = new ExcelJS.Workbook();
    try {
        if (path.extname(filename) === '.xls') {
            let oldFile = XLSX.readFile(filename);
            const _filename = filename
            XLSX.writeFileXLSX(oldFile, _filename);
            fs.unlinkSync(filename)
            await workbook.xlsx.readFile(_filename);
            return workbook;

        } else {
            await workbook.xlsx.readFile(filename);
            return workbook;
        }
    } catch (error) {
        if (path.extname(filename) === '.xls') {
            try {
                workbook = await openXlsWithPWithEXE(workbook, filename, pws);
                return workbook;
            } catch (error) {
                console.log(error)
                logger.info(`------ Can not open xls ${filename} with PW. ------`);
            }
            return null
        } else {
            workbook = await openXlsxWithPW(workbook, filename, pws);
            return workbook;
        }
    }

}
const openXlsxWithPW = async (workbook, filename, pws) => {
    let _workbook = null;
    for (let password of pws) {
        try {
            if (!_workbook) {
                _workbook = await XlsxPopulate.fromFileAsync(filename, { password });
                const buffer = await _workbook.outputAsync('buffer');

                await workbook.xlsx.load(buffer);
                return workbook;
            }
        } catch (error) {
            logger.error(`try unlock ${filename} with all pw ${password} fail.`);
        }
    }
}
const openXlsWithPWithEXE = async (workbook, filename, pws) => {
    return new Promise((resovle, reject)=>{
        try {
            const _pws = pws.join(',')
            let tempFileNameArray = filename.split('\\');
            let tempFileName =`pre_${Date.now()}.xls`;
            tempFileNameArray[tempFileNameArray.length -1] = tempFileName;
            tempFileName = tempFileNameArray.join('\\');
            fs.rename(filename, tempFileName);
            const unLockPromise = async () => new Promise((fResovle, fReject) => {
                let i = 0;
                const find = setInterval(() => {
                    const unlockFile = `${tempFileName}x`.replace(/pre/,'temp_pre');
                    fs.exists(unlockFile, (exists) => {
                        if (exists) {
                            clearInterval(find);
                            fs.unlink(tempFileName);
                            fs.rename(unlockFile, filename+'x', ()=> fResovle());
                        } else {
                            i++;
                            if (i > 5) {
                                clearInterval(find);
                                fReject()
                            }
                        }
                    });
                }, 1000);
            });
            const exe = `${__dirname}\\core\\dist\\mystery_tool.exe -i ${tempFileName} -p ${_pws}`;
            cp.exec(exe, async (err, stdout, stderr) => {
                if (err) {
                    console.log(err)
                    return  reject()
                }
                try{
                    await unLockPromise();
                    await workbook.xlsx.readFile(filename + 'x');
                    resovle(workbook);
                }catch{
                    logger.error(`try unlock ${filename} with all pw ${pws} fail.`);
                    fs.unlink(tempFileName);
                    reject()
                }
               
            });
        } catch (error) {
            console.log(error)
            logger.error(`on error: ${error}` );
            reject()
        }
    });

   


}

const spliceColumns = (colnumNames, workbook, filepath) => {
    console.log(workbook)
    const worksheet = workbook.worksheets ? workbook.worksheets[0] : null;

    worksheet && colnumNames.forEach(colmun => {
        let delList = []
        const headerRow = worksheet.getRow(1);
        headerRow.font = { "size": 10, "color": { "indexed": 9 }, "name": "Arial", "family": 2 };
        headerRow.border = { "left": { "style": "thin", "color": { "indexed": 8 } }, "right": { "style": "thin", "color": { "indexed": 8 } }, "top": { "style": "thin", "color": { "indexed": 8 } }, "bottom": { "style": "thin", "color": { "indexed": 8 } } };
        headerRow.fill = { "type": "pattern", "pattern": "solid", "fgColor": { "indexed": 56 }, "bgColor": { "indexed": 64 } };
        headerRow.alignment = { "horizontal": "center" };

        const headers = headerRow.values || null;
        Array.isArray(headers) && headers.forEach((header, _i) => {
            let _header = header;
            if (typeof header === 'object') {
                _header = header?.richText?.map(rt => rt.text);
                _header = _header.join('');
            }
            if (colmun === _header) {
                delList.push(_i)
            }
        });
        delList.forEach(i => {
            worksheet.spliceColumns(i, 1);
        })

    });
    workbook.xlsx
        .writeFile(filepath)
        .then(() => {
            console.log(filepath + ' created');
        })
        .catch(err => {
            console.log(err.message);
        });
}




module.exports = {
    readWorksheetFromFile,
    spliceColumns
}

