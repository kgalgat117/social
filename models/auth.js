var tokenModel = require('./tokens')
var clientModel = require('./clients')
var userModel = require('./users')
var authCodeModel = require('./authcode')

module.exports.getAccessToken = async (accessToken) => {
    let _accessToken = await tokenModel.findOne({ accessToken: accessToken })
        .populate('user')
        .populate('client');
    if (!_accessToken) {
        return false;
    }
    _accessToken = _accessToken.toObject();
    if (!_accessToken.user) {
        _accessToken.user = {};
    }
    return _accessToken;
};

module.exports.getRefreshToken = (refreshToken) => {
    return tokenModel.findOne({ refreshToken: refreshToken })
        .populate('user')
        .populate('client');
};

module.exports.getAuthorizationCode = (code) => {
    return authCodeModel.findOne({ authorizationCode: code })
        .populate('user')
        .populate('client');
};

module.exports.getClient = (clientId, clientSecret) => {
    let params = { clientId: clientId };
    if (clientSecret) {
        params.clientSecret = clientSecret;
    }
    return clientModel.findOne(params);
};

module.exports.getUser = async (username, password) => {
    let user = await userModel.findOne({ username: username });
    if (user.validatePassword(password)) {
        return user;
    }
    return false;
};

module.exports.getUserFromClient = (client) => {
    // return userModel.findById(client.user);
    return {};
};

module.exports.saveToken = async (token, client, user) => {
    let accessToken = (await tokenModel.create({
        user: user.id || null,
        client: client.id,
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        scope: token.scope,
    })).toObject();

    if (!accessToken.user) {
        accessToken.user = {};
    }

    return accessToken;
};

module.exports.saveAuthorizationCode = (code, client, user) => {
    let authCode = new authCodeModel({
        user: user.id,
        client: client.id,
        authorizationCode: code.authorizationCode,
        expiresAt: code.expiresAt,
        scope: code.scope
    });
    return authCode.save();
};

module.exports.revokeToken = async (accessToken) => {
    let result = await tokenModel.deleteOne({
        refreshToken: accessToken.refreshToken
    });
    return result.deletedCount > 0;
};

module.exports.revokeAuthorizationCode = async (code) => {
    let result = await authCodeModel.deleteOne({
        authorizationCode: code.authorizationCode
    });
    return result.deletedCount > 0;
};