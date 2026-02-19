const ClothingItem = require("../models/clothingItems");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getItems = async (req, res, next) => {
  try {
    const items = await ClothingItem.find({});
    return res.send(items);
  } catch (err) {
    return next(err);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError(err.message));
    }
    return next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findById(req.params.itemId).orFail();
    if (item.owner.toString() !== req.user._id) {
      return next(
        new ForbiddenError("You are not authorized to delete this item")
      );
    }
    await item.deleteOne();
    return res.send({ message: "Item deleted successfully" });
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Item not found"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};

const likeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Item not found"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};

const dislikeItem = async (req, res, next) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    if (err.name === "DocumentNotFoundError") {
      return next(new NotFoundError("Item not found"));
    }
    if (err.name === "CastError") {
      return next(new BadRequestError("Invalid item ID"));
    }
    return next(err);
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
