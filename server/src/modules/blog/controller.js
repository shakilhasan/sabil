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
const { NotFound } = require("../../common/errors");
const {
  getFakeBlog,
} = require("../../../test/mock-routes/blog-controller-mock");

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
const updateLikeHandler = async (req) => {
  const { body } = req;
  const favorite = parseInt(body.favorite, 10) + 1;
  console.log(body.id, "-------------", body.favorite);
  try {
    const doc = await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: body.id },
      { $set: { favorite } }
    );
    eventEmitter.emit(`${req.modelName}Updated follow`);
    return doc.favorite;
  } catch (e) {
    // return next(e, req, res);
    throw new NotFound(`${req.modelName} not found by the id: ${body.id}`);
  }
};
const processRequestCreate = async (req, res, next) => {
  // const fakeBlog = await getFakeBlog();
  req.body.authorId = req.user.id;
  req.body.author.name = req.user.username;
  req.body.favorite = 0;
  // res.body = { ...req.body, ...fakeBlog };
  return next();
};
router.get("/detail", getByIdHandler);
router.post(
  "/create",
  processRequestCreate,
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
