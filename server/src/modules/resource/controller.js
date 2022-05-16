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
const { Model: Resource } = require("./model");

const router = express.Router();

const searchHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};
const saveManyHandler = async (req, res, next) => {
  try {
    const resource = await Resource.insertMany(req.body);
    console.log("resource--", resource);
    return res.status(201).send(resource);
  } catch (error) {
    console.log("error--", error);
    return next(error, req, res);
  }
};
router.get("/detail", getByIdHandler);
router.post("/createMany", saveManyHandler);  // todo - remove later if unnecessary
router.post("/create", handleValidation(validate), saveHandler);
router.put("/update", handleValidation(validate), updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
