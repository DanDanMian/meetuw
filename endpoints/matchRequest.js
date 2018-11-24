const logger = require('./utils/logger');

const post = (req, res) => {
    logger.debug(`/match_request => ${req.body.term} ${req.body.subject} ${req.body.number}`);
    const Users = db.db('user');
    const query = {
        course: {
            term: `${req.body.term}`,
            subject: `${req.body.subject}`,
            catelog_number: `${req.body.number}`,
        },
    };
    logger.debug(`query: ${query.course.term} ${query.course.subject} ${query.course.catelog_number}`);

    Users.collection('matching').find(query).toArray((err, dbres) => {
        if (err) {
            logger.error(err);
            return;
        }
        logger.debug(`db return arry: ${dbres}`);
        if (dbres.length < 1) {
            res.send('no match');
        } else {
            logger.debug('Matched!');
            const randMatched = dbres[Math.floor(Math.random() * dbres.length)];
            logger.debug(`Matched data: ${randMatched.name} ${randMatched.email}`);
            res.send({
                name: `${randMatched.name}`,
                email: `${randMatched.email}`,
            });
        }
    });
};

module.exports = {
    post: post,
};
