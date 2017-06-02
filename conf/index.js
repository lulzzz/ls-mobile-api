'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

switch ('local') {
    case 'local':
        module.exports = require('./local');
        break;
    case 'development':
        module.exports = require('./dev');
        break;
    case 'staging':
        module.exports = require('./staging');
        break;
    case 'production':
        module.exports = require('./production');
        break;
    default:
        console.error("Unrecognized NODE_ENV: " + process.env.NODE_ENV);
        process.exit(1);
}
