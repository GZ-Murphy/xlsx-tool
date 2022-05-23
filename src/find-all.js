const path = require('path');
const fs = require('fs-extra');
const XLSX = require('xlsx');
const { logger } = require('./report');


const dealScri = function (dir) {
 
    try {
        let results = []
        const list = fs.readdirSync(dir);
        list.forEach(function (file) {
            try {
                file = dir + '/' + file
                const stat = fs.statSync(file)
                if (stat && stat.isDirectory()) {
                    results = results.concat(dealScri(file))
                } else {
                    results.push(path.resolve(dir, file));
               
                }
            } catch (error) {
                logger.error(`try ${file}  fail:`,error);
            }

        })
        return results;
    } catch (error) {
        logger.error(`dealScri ${dir} fail:` + error);
        return []
    }
}


module.exports = {
    dealScri
}