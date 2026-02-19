const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const mongoose = require("mongoose");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateId = (value, helpers) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message("Invalid ID");
};

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .message(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'The "avatar" field must be a valid url',
    }),
  }),
});

module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .message(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateId),
  }),
});

module.exports.validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").messages({
      "any.only": 'The "weather" field must be one of "hot", "warm", or "cold"',
    }),
  }),
});
