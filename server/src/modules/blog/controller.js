/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const eventEmitter = require("nodemon");
const { getQuery } = require("./service");
const {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { validate } = require("./request");
const { handleValidation } = require("../../common/middlewares");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  console.log("blog searchHandler body---------- ", req.body);
  const user = await mongoose.models.User.findOne({ _id: req.user.id });
  req.searchQuery = getQuery(req.body, user.followings);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};
const updateLikeHandler = async (req,next) => {
  const { body } = req;
  const favorite = parseInt(body.favorite, 10) + 1;
  try {
    const doc = await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: body.id },
      { $set: { favorite } }
    );
    console.log(req.user.id, "-------------", doc.favorite);
    eventEmitter.emit(`${req.modelName}Updated follow`);
    return doc.favorite;
  } catch (e) {
    return next(error, req, res);

  }
};
router.get("/detail", getByIdHandler);
router.post(
  "/create",
  // handleValidation(validate),
  saveHandler
);
router.put(
  "/update",
  // handleValidation(validate),
  updateHandler
);
router.put("/updateLike", updateLikeHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
