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

  try {
    const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = jwtDecoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token";
    return res.status(401).json({ status: "error", message });
  }
};

module.exports = verifyToken;
