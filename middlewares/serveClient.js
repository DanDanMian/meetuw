const serveClient = (req, res, next) => {
    if (!req.is('json')) {
        res.sendFile('../client/build/index.html');
        return;
    }
    next();
};

module.exports = serveClient;
