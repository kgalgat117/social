var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    clientId: { type: String },
    clientSecret: { type: String },
    redirectUris: { type: Array },
    grants: { type: Array },
}, { timestamps: true })

module.exports = DB.model('clients', schema)