const config = require('../config');
const logger = require('../util/logger');

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.DB_CONNECTION_STRING, (err, db) => {
    if (err) {
        logger.debug('Successfully connected to DB');
    } else {
        logger.error('An error occurred while trying to connect to DB:');
        logger.error(err);
    }
});

module.exports = MongoClient;
