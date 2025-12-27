const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {
  ERROR_400,
  ERROR_404,
  ERROR_409,
  ERROR_500,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

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
    const { name, avatar, email, password } = req.body;

    // Validate that email and password are present
    if (!email || !password) {
      return res.status(ERROR_400).send({
        message: "Email and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      avatar,
      email,
      password: hashedPassword,
    });

    // Generate token for the new user
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Hide password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).send({ token, data: userResponse });
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(ERROR_409).send({ message: "Email already exists" });
    }

    if (err.name === "ValidationError") {
      return res.status(ERROR_400).send({ message: err.message });
    }

    return res
      .status(ERROR_500)
      .send({ message: "An error occurred on the server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are present
    if (!email || !password) {
      return res.status(ERROR_400).send({
        message: "Email and password are required",
      });
    }

    const user = await User.findUserByCredentials(email, password);

    // we're creating a token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // we return the token
    return res.send({ token });
  } catch (err) {
    console.error(err);

    // Authentication failure (invalid credentials)
    if (err.message === "Incorrect email or password") {
      return res.status(401).send({ message: "Incorrect email or password" });
    }

    // Unexpected server errors
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).orFail();
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

const updateUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    ).orFail();
    return res.send(user);
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_404).send({ message: "User not found" });
    }
    if (err.name === "ValidationError") {
      return res.status(ERROR_400).send({ message: err.message });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
