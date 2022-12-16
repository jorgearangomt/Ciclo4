const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  }
  const options = {
    expiresIn: "1d",
    algorithm: "HS256",
  }
  const secret = process.env.JWT_SECRET;

  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (error) {
    throw error;
  }
};

const revokeToken = () => {
  const options = {
    expiresIn: "1ms",
    algorithm: "none",
  }

  try {
    const revokedToken = jwt.sign({}, "", options);
    return revokedToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  revokeToken,
};