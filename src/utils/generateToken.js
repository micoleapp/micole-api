const jwt = require("jsonwebtoken");
//JWT Token Generate
const generateToken = (uid) => {
  const expTime = process.env.JWT_EXPTIME;
  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn: expTime });
    return {token: token, expiresIn: expTime};
  }
  catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  generateToken
}