const config = require('../config');
const logger = require('../utils/logger');

const MongoClient = require('mongodb').MongoClient;

const db = new Promise((resolve) => {
    MongoClient.connect(config.DB_CONNECTION_STRING, (err, db) => {
        if (err) {
            logger.error('An error occurred while trying to connect to DB:');
            logger.error(err);
        } else {
            logger.debug('Successfully connected to DB');
            resolve(db);
            firstTimeSetup(db);
        }
    });
});

const firstTimeSetup = (db) => {
    const Matching = db.db('user').collection('matching');
    Matching.findOne({}, (err, res) => {
        if (err) {
            logger.error(err);
        } else {
            logger.debug(`First username: ${res.name}`);
        }
    });
};

module.exports = db;
