const OAuthServer = require('express-oauth-server')
const oAuthModel = require('./../models/auth')

module.exports = new OAuthServer({
    model: oAuthModel,
    // grants: ['authorization_code', 'refresh_token'],
    // allowEmptyState: true,
    // allowExtendedTokenAttributes: true,
    useErrorHandler: true,
    debug: true
})