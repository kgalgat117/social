var express = require('express');
var router = express.Router();
var oauth = require('./../config/oauthserver')


router.use('/account', oauth.authenticate(), (req, res) => {
  return res.json(res.locals.oauth.token.user);
});
router.use('/profile', oauth.authenticate(), (req, res) => {
  return res.json({ token: res.locals })
});

module.exports = router;
