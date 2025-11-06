const User = require("../models/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.create({ name, avatar });
    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

module.exports = { getUsers, getUser, createUser };
