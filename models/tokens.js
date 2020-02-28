var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    accessToken: { type: String },
    accessTokenExpiresOn: { type: Date },
    client: { type: Object },
    clientId: { type: String },
    refreshToken: { type: String },
    refreshTokenExpiresOn: { type: Date },
    user: { type: Object },
    userId: { type: String }
}, { timestamps: true })

module.exports = DB.model('tokens', schema)