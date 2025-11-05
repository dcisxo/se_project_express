const router = require("express").Router();
const User = require("../models/user");
const { getUsers, getUser, createUser } = require("../controllers/users");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.create({ name, avatar });
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { getUsers, getUser, createUser };

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
