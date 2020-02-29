var OAuth2Server = require('oauth2-server'),
    Request = OAuth2Server.Request,
    Response = OAuth2Server.Response,
    oauth = require('./../config/oauthserver')

let middleware = {
    authenticateRequest: function (req, res, next) {
        var request = new Request(req);
        var response = new Response(res);
        return oauth.authenticate(request, response)
            .then(function (token) {
                next();
            }).catch(function (err) {
                res.status(err.code || 500).json(err);
            });
    },
    obtainToken: function (req, res) {
        var request = new Request(req);
        var response = new Response(res);
        return oauth.token(request, response)
            .then(function (token) {
                res.json(token);
            }).catch(function (err) {
                res.status(err.code || 500).json(err);
            });
    }
}

module.exports = middleware