var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
	accessToken: String,
	accessTokenExpiresAt: Date,
	refreshToken: String,
	refreshTokenExpiresAt: Date,
	client: Object,
	user: Object
}, { timestamps: true })

module.exports = DB.model('tokens', schema)