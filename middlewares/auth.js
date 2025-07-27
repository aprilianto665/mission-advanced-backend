const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      status: "error",
      message: "Invalid Token",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecoded = jwt.verify(token, secret);
    req.userData = jwtDecoded;
  } catch (error) {
    res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
  next();
};

module.exports = verifyToken;
