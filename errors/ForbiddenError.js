const { ERROR_403 } = require("../utils/errors");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = ERROR_403;
  }
}

module.exports = ForbiddenError;
