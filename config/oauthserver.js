const OAuth2Server = require('oauth2-server')
const oAuthModel = require('./../models/auth')

module.exports = new OAuth2Server({
    model: oAuthModel,
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
})