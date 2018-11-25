const path = require('path');

const serveClient = (req, res, next) => {
    if (!req.is('json')) {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
        return;
    }
    next();
};

module.exports = serveClient;
