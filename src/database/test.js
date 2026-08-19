const env = require('../config/env');
const { API_USERNAME, API_PASSWORD } = env;
console.log('api username befor decode: ', API_USERNAME);
console.log('api password befor decode: ', API_PASSWORD);
const credential = `${API_USERNAME}:${API_PASSWORD}`;

const token = btoa(credential);

console.log("Token:", token);

const decodedToken = Buffer.from(token, "base64").toString("utf-8");

console.log("Decoded Token: ", decodedToken);

const [username, password] = decodedToken.split(":");

console.log('api username after decode: ', username);
console.log('api password after decode: ', password);







