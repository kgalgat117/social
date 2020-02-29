require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')

require('./config/db')

var tokenModel = require('./models/tokens')
var clientModel = require('./models/clients')
var userModel = require('./models/users')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', require('./routes/auth'))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({ error: 'something went wrong !!!' });
});

// loadExampleData()
// dump()

function loadExampleData() {
    var client1 = new clientModel({
        id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
        clientId: 'application',
        clientSecret: 'secret',
        grants: [
            'password',
            'refresh_token'
        ],
        redirectUris: []
    });
    var client2 = new clientModel({
        clientId: 'confidentialApplication',
        clientSecret: 'topSecret',
        grants: [
            'password',
            'client_credentials'
        ],
        redirectUris: []
    });
    var user = new userModel({
        username: 'pedroetb',
        password: 'password'
    });
    client1.save(function (err, client) {
        if (err) {
            return console.error(err);
        }
        console.log('Created client', client);
    });
    user.save(function (err, user) {
        if (err) {
            return console.error(err);
        }
        console.log('Created user', user);
    });
    client2.save(function (err, client) {
        if (err) {
            return console.error(err);
        }
        console.log('Created client', client);
    });
};

function dump() {
    clientModel.find(function (err, clients) {
        if (err) {
            return console.error(err);
        }
        console.log('clients', clients);
    });
    tokenModel.find(function (err, tokens) {
        if (err) {
            return console.error(err);
        }
        console.log('tokens', tokens);
    });
    userModel.find(function (err, users) {
        if (err) {
            return console.error(err);
        }
        console.log('users', users);
    });
};

module.exports = app;
