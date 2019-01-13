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
    return res.status(404).json(errors);
  }

  const stylist = await Stylist.getByEmail(req.body.email);

  if(!stylist) {
    return res.status(404).json({
      stylist: 'Stylist not found with that email.'
    });
  } else {
    const passwordMatches = await bcrypt.compare(req.body.password, stylist.password);
    if(passwordMatches) {
      const payload = {
        id: stylist.id,
        firstName: stylist.firstName,
        lastName: stylist.lastName
      };

      jwt.sign(payload, secret, { expiresIn: '168h' }, (err, token) => {
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`
        });
      })
    } else {
      res.status(400).json({
        stylist: 'Incorrect email or password.'
      });
    }
  }
});

router.post('/api/v1/signup', async (req, res) => {
  const validate = require('../../helpers/validation/validateSignup');
  const errors = await validate(req);

  if(Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const newStylist = await Stylist.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    const payload = {
      id: newStylist.id,
      firstName: newStylist.firstName,
      lastName: newStylist.lastName
    };

    jwt.sign(payload, secret, { expiresIn: '168h' }, (err, token) => {
      res.status(200).json({
        success: true,
        token: `Bearer ${token}`
      });
    })

  } catch(error) {
    errors['dbError'] = error.errors[0].message;
    res.status(400).json({
      errors
    })
  }
});

module.exports = router;