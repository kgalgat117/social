var express = require('express');
var router = express.Router();
var middleWares = require('./../controller/middleware')

router.all('/token', middleWares.obtainToken)

router.get('/secure', middleWares.authenticateRequest, function (req, res) {
    res.send('complete...')
})

module.exports = router;
