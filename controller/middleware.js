var CONSTANTS = require('./../config/contants')
const jwt = require('jsonwebtoken');

let middleware = {
    verifyToken: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        let payload = false;
        try {
            payload = jwt.verify(token, CONSTANTS.SECRETKEY, {
                ignoreExpiration: true,
            });
        } catch (err) {
            payload = false;
        }
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        if (payload.client_id && (payload.client_id === CONSTANTS.CLIENT_ID)) {
            if (payload.client_secret && (payload.client_secret === CONSTANTS.CLIENT_SECRET)) {
                next()
            } else {
                res.status(400).json({ error: 'Invalid client secret' })
            }
        } else {
            res.status(400).json({ error: 'Invalid client id' })
        }
    }
}

module.exports = middleware