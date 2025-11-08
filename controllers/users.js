const User = require("../models/users");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    console.error(err);
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    return res.send(user);
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_404).send({ message: "User not found" });
    }
    if (err.name === "CastError") {
      return res.status(ERROR_400).send({ message: "Invalid user ID" });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.create({ name, avatar });
    return res.status(201).send(user);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(ERROR_400).send({ message: err.message });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error occurred on the server" });
  }
};

module.exports = { getUsers, getUser, createUser };
