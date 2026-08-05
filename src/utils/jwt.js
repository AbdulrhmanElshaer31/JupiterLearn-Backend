const jwt = require('jsonwebtoken');
const env = require('../config/env');
const {JWT_SECRET,EXPIRES_DATE} = env
module.exports = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_DATE });
};