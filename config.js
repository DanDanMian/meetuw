const config = {
  DB_CONNECTION_STRING: 'mongodb://admin:0000@meetuw-shard-00-00-5sqfz.mongodb.net:27017,'
                          + 'meetuw-shard-00-01-5sqfz.mongodb.net:27017,'
                          + 'meetuw-shard-00-02-5sqfz.mongodb.net:27017/user?ssl=true&replicaSet=meetuw-shard-0&authSource=admin',
  UW_API_KEY: 'bfcc76ae6b797d377b120c6e4887294b',
  LOGGER_LEVEL: 'debug',
};

module.exports = config;
