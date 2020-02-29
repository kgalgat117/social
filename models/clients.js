var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    id: String,
    clientId: String,
    clientSecret: String,
    grants: [String],
    redirectUris: [String]
}, { timestamps: true })

module.exports = DB.model('clients', schema)