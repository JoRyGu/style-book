module.exports = {
  init(app) {
    const stylistRoutes = require('../routes/stylist');
    const accountRoutes = require('../routes/accounts');

    app.use(accountRoutes);
    app.use(stylistRoutes);
  }
}