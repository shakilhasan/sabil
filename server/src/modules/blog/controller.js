/* eslint-disable no-undef */
const express = require("express");
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
const mongoose = require("mongoose");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  console.log("blog searchHandler body---------- ", req.body);
  const user = await mongoose.models.User.findOne(
      { _id: req.user.id  },
  );
  req.searchQuery = getQuery(req.body,user.followings);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
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

router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
