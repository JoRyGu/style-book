const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = process.env.secretOrKey;
const jwt = require('jsonwebtoken');

router.get('/api/v1/getStylist', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    success: true
  })
})

module.exports = router;