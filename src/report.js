let log4js = require("log4js");
let logger = log4js.getLogger();

const configureLoger = ({ folder }) => {
    log4js.configure({
        appenders: {
            done: { type: "file", filename: folder + "/done.log" },
        },
        categories: {
            default: { appenders: ["done"], level: "info" },
            trace: { appenders: ["done"], level: "trace" },
            fail: { appenders: ["done"], level: "error" }
        }
    });

}

module.exports = {
    logger, configureLoger
}
