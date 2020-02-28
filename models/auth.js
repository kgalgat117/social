var tokenModel = require('./tokens')
var clientModel = require('./clients')
var userModel = require('./users')

const getAccessToken = function (bearerToken) {
    return tokenModel.findOne({ accessToken: bearerToken }).lean();
}

const getClient = function (clientId, clientSecret) {
    return clientModel.findOne({ clientId: clientId, clientSecret: clientSecret }).lean();
}

const getRefreshToken = function (refreshToken) {
    return tokenModel.findOne({ refreshToken: refreshToken }).lean();
}

const getUser = function (username, password) {
    return userModel.findOne({ username: username, password: password }).lean();
}

const saveToken = function (token, client, user) {
    var accessToken = new tokenModel({
        accessToken: token.accessToken,
        accessTokenExpiresOn: token.accessTokenExpiresOn,
        client: client,
        clientId: client.clientId,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        user: user,
        userId: user._id,
    });
    return new Promise(function (resolve, reject) {
        accessToken.save(function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    }).then(function (saveResult) {
        saveResult = saveResult && typeof saveResult == 'object' ? saveResult.toJSON() : saveResult;
        var data = new Object();
        for (var prop in saveResult) data[prop] = saveResult[prop];
        data.client = data.clientId;
        data.user = data.userId;
        return data;
    })
}

module.exports = {
    getAccessToken: getAccessToken,
    saveToken: saveToken,
    getUser: getUser,
    getRefreshToken: getRefreshToken,
    getClient: getClient
}