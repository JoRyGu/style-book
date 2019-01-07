const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const secret = process.env.secretOrKey;
const jwt = require('jsonwebtoken');
const { Stylist } = require('../db/queries');

router.post('/api/v1/login', async (req, res) => {
  const validate = require('../../helpers/validation/validateLogin');
  const errors = validate(req);

  if(Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  const stylist = await Stylist.getByEmail(req.body.email);

  if(!stylist) {
    return res.status(400).json({
      error: 'Stylist not found with that email.'
    });
  } else {
    const passwordMatches = await bcrypt.compare(req.body.password, stylist.password);
    if(passwordMatches) {
      const payload = {
        id: stylist.id,
        firstName: stylist.firstName
      };

      jwt.sign(payload, secret, { expiresIn: '8h' }, (err, token) => {
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`
        });
      })
    } else {
      res.status(400).json({
        error: 'Incorrect email or password.'
      });
    }
  }
})

module.exports = router;