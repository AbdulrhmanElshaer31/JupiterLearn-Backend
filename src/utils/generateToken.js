// src/utils/generateToken.js

const jwt = require('jsonwebtoken');
const env = require('../config/env');

module.exports = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
};