const { use } = require("react");

const username = 'jupiterLearn(AAAO)';
const password = 'JUPITERlearn@admin@123';

const credential = `${username}:${password}`;

console.log("Original Data: ", credential);

const encode = btoa(credential);
