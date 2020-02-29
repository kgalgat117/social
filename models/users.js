var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    username: String,
	password: String
}, { timestamps: true })

module.exports = DB.model('users', schema)