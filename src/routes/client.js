const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Stylist } = require('../db/queries');

router.get('/api/v1/:stylistId/clients', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const stylist = await Stylist.getById(req.params.stylistId);
  const clients = await stylist.getClients();
  
  res.json({ clients });
})

module.exports = router;