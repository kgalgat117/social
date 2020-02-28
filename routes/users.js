var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

var CONSTANTS = require('./../config/contants')

var Miidlewares = require('./../controller/middleware')

router.post('/auth', function (req, res) {
  if (req.body.client_id && (req.body.client_id === CONSTANTS.CLIENT_ID)) {
    if (req.body.client_secret && (req.body.client_secret === CONSTANTS.CLIENT_SECRET)) {
      const payload = {
        client_key: req.body.client_id,
        client_secret: req.body.client_secret
      };
      const token = jwt.sign(payload, CONSTANTS.SECRETKEY, {
        expiresIn: '2h',
      })
      res.status(200).json({ token: token })
    } else {
      res.status(403).json({ error: 'Invalid client secret' })
    }
  } else {
    res.status(403).json({ error: 'Invalid client id' })
  }
})

router.get('/home', Miidlewares.verifyToken, function (req, res) {
  res.send('authorised route')
})

module.exports = router;
