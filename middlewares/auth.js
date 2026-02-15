const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Authorization required");
    error.statusCode = ERROR_401;
    return next(error);
  }
  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error("Authorization required");
    error.statusCode = ERROR_401;
    return next(error);
  }

  req.user = payload;

  return next();
};
