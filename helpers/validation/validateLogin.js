module.exports = req => {
  const errors = {};
  if(!req.body.email) {
    errors.email = 'Email field is required.';
  }

  if(!req.body.password) {
    errors.password = 'Password field is required.';
  }

  return errors;
}