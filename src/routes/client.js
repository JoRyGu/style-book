const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Stylist, Client } = require('../db/queries');

router.get('/api/v1/:stylistId/clients', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const stylist = await Stylist.getById(req.params.stylistId);
  const clients = await stylist.getClients();
  
  if(!stylist) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if(req.user.id != req.params.stylistId) {
    return res.status(401).send('Unauthorized');
  }

  res.status(200).json({ clients })
});

router.post('/api/v1/:stylistId/clients', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const validate = require('../../helpers/validation/validateClient');
  const errors = await validate(req);

  if(Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  
  try {
    const newClient = await Client.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      stylistId: req.body.stylistId
    });

    return res.status(200).json(newClient);
  } catch(e) {
    errors['dbError'] = e.errors[0].message;
    console.log(e);
    res.status(400).json({
      errors
    });
  }
});

module.exports = router;