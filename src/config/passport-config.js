const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Stylist = require('../db/models').Stylist;
const secret = process.env.secretOrKey;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secret;

module.exports = passport => {
  passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const stylist = await Stylist.findByPk(jwt_payload.id);
      if(stylist) {
        return done(null, stylist);
      }

      return done(null, false);
    } catch(error) {
      console.log(error);
    }
  }))
};