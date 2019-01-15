const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = process.env.secretOrKey;
const jwt = require('jsonwebtoken');
const path = require('path');

router.get('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', '..', 'client', 'build', 'index.html'));
});

module.exports = router;