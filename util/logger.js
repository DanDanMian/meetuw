const log4js = require('log4js');

const config = require('../config');
const logger = log4js.getLogger();

logger.level = config.LOGGER_LEVEL;

module.exports = logger;
