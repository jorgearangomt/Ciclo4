const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const verifyToken = async (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = cookie.parse(req.headers.cookie || '').session_token;
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req._id = decoded.id;
    next();
  }catch(error){
    return res.status(401).send({ message: "Unauthorized!" });
  }
};  

module.exports = verifyToken;