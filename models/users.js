var mongoose = require('mongoose')
var DB = require('../config/db')
const crypto = require('crypto');
const CONSTANTS = require('./../config/contants')

var schema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    verificationCode: { type: String },
    verifiedAt: { type: Date },
}, { timestamps: true })

schema.methods.validatePassword = function (password) {
    let _password = crypto.pbkdf2Sync(password, CONSTANTS.SALT, 10000,
        32, 'sha512').toString('hex');
    return this.password === _password;
};
schema.methods.setPassword = function (password) {
    this.password = crypto.pbkdf2Sync(password, CONSTANTS.SALT, 10000,
        32, 'sha512').toString('hex');
};

module.exports = DB.model('users', schema)