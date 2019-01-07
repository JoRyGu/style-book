const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = process.env.secretOrKey;
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.json({
    success: true
  })
})

module.exports = router;