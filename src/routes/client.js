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
})

module.exports = router;