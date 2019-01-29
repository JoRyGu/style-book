const { Client } = require('../../src/db/queries');

module.exports = async req => {
 const errors = {};

 if (!req.body.firstName) {
   errors.firstName = 'First Name field is required.';
 }

 if (!req.body.lastName) {
   errors.lastName = 'Last Name field is required.';
 }

 if (!req.body.phoneNumber) {
   errors.phoneNumber = 'Phone Number field is required.';
 }

 if (req.body.phoneNumber && req.body.phoneNumber.length !== 10) {
   errors.phoneNumber = 'Please enter a valid phone number.';
 }

 const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

 if(req.body.email && !emailRegex.test(req.body.email)) {
   errors.email = 'Must be a valid email address.';
 }

 const client = await Client.getByPhoneNumber(req.body.phoneNumber);

 if (client) {
   errors.phoneNumber = 'Client has already been created with that phone number.';
 }

 return errors;
}