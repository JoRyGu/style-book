module.exports = req => {
  const errors = {};

  if(!req.body.email) {
    errors.email = 'Email field is required.';
  }

  if(!req.body.password) {
    errors.password = 'Password field is required.';
  }

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

  if(!emailRegex.test(req.body.email)) {
    errors.email = 'Must enter a valid email address.';
  }

  return errors;
}