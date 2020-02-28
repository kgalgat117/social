var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUris: { type: Array }
}, { timestamps: true })

module.exports = DB.model('clients', schema)