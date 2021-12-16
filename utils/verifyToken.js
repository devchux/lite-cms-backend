const jwt = require("jsonwebtoken");
const { jwtToken } = require("../config/constants");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res
      .status(403)
      .json({
        status: "error",
        message: "User is not logged in",
      });
  }
  try {
    const decoded = jwt.verify(token, jwtToken);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Invalid Token" });
  }
};

module.exports = verifyToken;
