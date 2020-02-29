var express = require('express');
var router = express.Router();
var crypto = require('crypto')
var oauth = require('./../config/oauthserver')
var userModel = require('./../models/users')
var clientModel = require('./../models/clients')
var authModel = require('./../models/auth')


router.get('/callback', function (req, res) {
    console.log('call back url')
    res.send('call back url')
})

router.post('/register', async (req, res, next) => {
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Passwords does not match', 422);
    }
    let _user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        verificationCode: crypto.randomBytes(16).toString('hex'),
    });
    _user.setPassword(req.body.password);
    let user = null;
    try {
        user = await _user.save();
    } catch (error) {
        return res.send(error.errmsg, 422);
    }
    if (!user) {
        return res.send('Error creating user', 422);
    }
    let _client = await authModel.getClient(
        req.body.clientId,
        req.body.clientSecret
    );
    var temp
    if (!_client) {
        _client = new clientModel({
            user: user.id,
            clientId: req.body.clientId,
            clientSecret: req.body.clientSecret,
            redirectUris: req.body.redirectUris.split(','),
            grants: ['authorization_code', 'client_credentials',
                'refresh_token', 'password']
        });
        temp = await _client.save();
    }
    return res.json({ temp: temp, client: _client, user: user });
});


router.post('/access_token', oauth.token({
    requireClientAuthentication: {
        authorization_code: false,
        refresh_token: false
    }
}))

router.post('/authenticate', async (req, res, next) => {
    req.body.user = await userModel.findOne({ username: req.body.username });
    return next();
}, oauth.authorize({
    authenticateHandler: {
        handle: req => {
            return req.body.user;
        }
    }
}));

module.exports = router;
