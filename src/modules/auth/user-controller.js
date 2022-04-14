/* eslint-disable no-undef */
const express = require("express");
const { tryCreateUser, searchOne, getQuery, ModelName } = require("./service");
const {
  getByIdHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { validateUserCreate } = require("./request");
const { handleValidation } = require("../../common/middlewares");

const router = express.Router();

// add user
const saveHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const id = await tryCreateUser(user);
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by username or email or phone number.",
      });
    }
    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

const searchHandler = async (req, res, next) => {
  const query = {
    ...req.body,
    // userId: req.user.id // todo - uncomment if needed
  };
  req.searchQuery = getQuery(query);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  const query = { ...req.body, userId: req.user.id };
  req.searchQuery = getQuery(query);
  return baseCountHandler(req, res, next);
};

const checkUserHandler = async (req, res) => {
  if (req.body) {
    const user = await searchOne(req.body, ModelName);
    if (user) {
      return res.status(200).send({ status: "success", message: "User found" });
    }
  }
  return res.status(200).send({ status: "error", message: "User not found" });
};

const processRequestForAccount = async (req, res, next) => {
  // todo - remove if unnecessary
  req.query.id = req.user.id;
  return next();
};

router.get("/account", processRequestForAccount, getByIdHandler); // todo - remove if unnecessary
router.get("/detail", getByIdHandler);
router.post("/create", handleValidation(validateUserCreate), saveHandler);
router.put(
  "/update",
  // handleValidation(validateUserUpdate),  // todo - uncommit when ready
  updateHandler
);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);
router.post("/check", checkUserHandler);

module.exports = router;
