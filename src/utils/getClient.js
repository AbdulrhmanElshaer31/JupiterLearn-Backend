const jwt = require("./jwt");
const getClient = (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id, role } = jwt.verifyToken(token);
    if (!id || !role) return null;
    return { id, role };
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = getClient;
