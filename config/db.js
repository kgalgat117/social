var mongoose = require('mongoose')
var CONSTANTS = require('./contants')

let DB = mongoose.createConnection(`mongodb+srv://${CONSTANTS.DB_USER}:${CONSTANTS.DB_PASSWORD}@${CONSTANTS.DB_CLUSTER}/${CONSTANTS.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true })

DB.on('connection', function () {
    console.log('connected to database')
})

module.exports = DB