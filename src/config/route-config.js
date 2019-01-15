module.exports = {
  init(app) {
    const stylistRoutes = require('../routes/stylist');
    const accountRoutes = require('../routes/accounts');
    const clientRoutes = require('../routes/client');

    app.use(accountRoutes);
    app.use(stylistRoutes);
    app.use(clientRoutes);
  }
}