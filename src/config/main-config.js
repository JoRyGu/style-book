require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');

module.exports = {
  init(app, express) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    require('./passport-config')(passport);
    app.use(express.static(path.join(__dirname, '..', 'assets')));
    app.use(expressValidator());
  }
}