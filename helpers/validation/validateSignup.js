const Stylist = require('../../src/db/queries').Stylist;
module.exports = async req => {
  const errors = {};

  if(!req.body.email) {
    errors.email = 'Email field is required.';
  }

  if(req.body.password.length < 8) {
    errors.password = 'Password must be greater than 8 characters.';
  }

  if(req.body.password.length > 80) {
    errors.password = 'Password must be less than 80 characters.';
  }

  if(!req.body.password) {
    errors.password = 'Password field is required.';
  }

  if(!req.body.confirmPassword) {
    errors.confirmPassword = 'Confirm Password field is required.';
  }

  if(!req.body.firstName) {
    errors.firstName = 'First Name field is required.';
  }

  if(!req.body.lastName) {
    errors.lastName = 'Last Name field is required.';
  }

  if(req.body.password !== req.body.confirmPassword) {
    errors.password = 'Passwords must match.';
  }

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  if(!emailRegex.test(req.body.email)) {
    errors.email = 'Must enter a valid email address.';
  }

  const stylist = await Stylist.getByEmail(req.body.email);

  if(stylist) {
    errors.email = 'Stylist has already been created for that email.';
  }

  return errors;
}