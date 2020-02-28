var mongoose = require('mongoose')
var DB = require('../config/db')

var schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true })

module.exports = DB.model('users', schema)