'use strict';

const winston = require('winston');
winston.emitErrs = true;
const fs = require('fs');
const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toISOString();

var logger = new winston.Logger({
    transports: [
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/ls-mobile.log`,
            datePattern: '.yyyyMMdd',
            level: 'info',//env === 'development' ? 'verbose' : 'info'
            timestamp: tsFormat,
            prepend: false,
            json: false,
            colorize: false,
            maxsize:5000000//5MB
        }),
        new winston.transports.Console({
            level: 'debug',
            timestamp: tsFormat,
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
